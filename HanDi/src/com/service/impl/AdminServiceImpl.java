package com.service.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.common.TransactionException;
import com.entity.Admin;
import com.entity.AdminRole;
import com.entity.Authority;
import com.entity.Role;
import com.entity.Vip;
import com.mapper.AdminMapper;
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.service.IAdminService;
import com.shiro.Principal;
import com.utils.UUIDs;

/**
 *平台管理账户service实现类
 * @author caoxu
 *
 */
@Service
public class AdminServiceImpl extends BaseServiceImpl<Admin> implements IAdminService {

	@Autowired
	private AdminMapper adminMapper;

	@Override
	@Transactional
	public JqGridPage<Admin> adminPage(JqGridPageable pageable) {
		Set<String> searchKeys = new HashSet<String>();
		searchKeys.add("nickname");
		searchKeys.add("username");
		pageable.setSearchKeys(searchKeys);
		return findPage(pageable);
	}



	@Override
	@Transactional
	public List<Admin> adminList(Map<String, Object> parms) {
		return this.adminMapper.adminList(parms);
	}

	@Override
	@Transactional
	public Admin usernameExist(String username) {
		return this.adminMapper.usernameExist(username);
	}
	
	@Override
	@Transactional
	public List<Authority> listAuthoritysByAdmin(Long id) {
		return this.adminMapper.listAuthoritysByAdmin(id);
	}

	@Override
	@Transactional
	public List<Role> listRolesByAdmin(Long id) {
		return this.adminMapper.listRolesByAdmin(id);
	}

	@Override
	@Transactional
	public List<String> listAuthorityCodesByAdmin(Long id) {
		return this.adminMapper.listAuthorityCodesByAdmin(id);
	}
	
	@Override
	@Transactional
	public Integer addUserOfRole(AdminRole adminRole) {
		return this.adminMapper.addUserOfRole(adminRole);
	}

	@Override
	@Transactional
	public List<Role> getUserOfRole(Long userId) {
		return this.adminMapper.getUserOfRole(userId);
	}

	@Override
	@Transactional
	public Integer delUserOfAuth(Long userId) {
		return this.adminMapper.delUserOfAuth(userId);
	}

	@Override
	public Integer update(Admin t) {
		return super.update(t);
	}

	@Override
	public Integer delete(Admin t) {
		return super.delete(t);
	}

	@Override
	public Integer batchDelete(String[] ids) {
		return super.batchDelete(ids);
	}

	@Override
	public Admin loadById(Long id) {
		return super.loadById(id);
	}

	@Override
	public Admin getCurrentAdmin() {
		Subject subject = SecurityUtils.getSubject();
		if (subject != null) {
			Principal principal = (Principal) subject.getPrincipal();
			if (principal != null)
				return (Admin) this.adminMapper.loadById(principal.getId());
		}
		return null;
	}

	@Override
	@Transactional(rollbackFor = { TransactionException.class, RuntimeException.class })
	public Admin save(Admin admin) throws Exception {
		Admin oldAdmin = this.usernameExist(admin.getUsername());
		if (oldAdmin != null) {
			throw new TransactionException("用户名已经存在");
		}
		admin.setCreateTime(new Date());
		admin.setModifyTime(new Date());
		admin.setIsSuper(false);
		admin.setSalt(UUIDs.generateShortUid());
		admin.setPassword(DigestUtils.md5Hex(admin.getPassword() + admin.getSalt()));
		admin.setLoginFailureCount(0);
		if (admin.getIsLocked()) {
			admin.setLockedDate(new Date());
		}
		Integer result = this.adminMapper.add(admin);
		if (result <= 0) {
			throw new TransactionException("用户保存失败");
		}
		return admin;
	}

	@Override
	@Transactional(rollbackFor = { TransactionException.class, RuntimeException.class })
	public Admin updateAdmin(Admin admin, List<Long> roleIds) throws Exception {
		Admin oldAdmin = this.adminMapper.loadById(admin.getId());
		admin.setModifyTime(new Date());
		if (admin.getPassword() == null || admin.getPassword().isEmpty()) {
			admin.setSalt(oldAdmin.getSalt());
			admin.setPassword(oldAdmin.getPassword());
		} else {
			admin.setSalt(UUIDs.generateShortUid());
			admin.setPassword(DigestUtils.md5Hex(admin.getPassword() + admin.getSalt()));
		}
		if (!oldAdmin.getIsLocked() && admin.getIsLocked()) { // 如果之前不是锁定现在是锁定
			admin.setLockedDate(new Date());
		}
		if (oldAdmin.getIsLocked() && !admin.getIsLocked()) { // 之前是锁定现在不锁定
			admin.setLockedDate(null);
		}
		Integer result = this.adminMapper.update(admin);
		if (result <= 0) {
			throw new TransactionException("更新用户信息失败");
		}
		/*
		 * 更新用户所拥有的角色
		 */
		this.adminMapper.delUserOfAuth(admin.getId()); // 先删除该用户的所有角色
		for (Long roleId : roleIds) {
			AdminRole adminRole = new AdminRole();
			adminRole.setUserId(admin.getId());
			adminRole.setRoleId(roleId);
			result = this.adminMapper.addUserOfRole(adminRole);
			if (result <= 0) {
				throw new TransactionException("角色保存失败");
			}
		}
		return admin;
	}

	@Override
	@Transactional(rollbackFor = { TransactionException.class, RuntimeException.class })
	public void deleteAdmin(String[] ids) throws Exception {
		for (String id : ids) {
			Admin admin = this.adminMapper.loadById(new Long(id));
			if (admin == null) {
				continue;
			}
			if (admin.getIsSuper()) {
				throw new TransactionException("禁用失败,超级管理员[" + admin.getUsername() + "]无法禁用");
			}
			admin.setIsEnabled(false);
			Integer result = this.adminMapper.update(admin);
			if (result <= 0) {
				throw new TransactionException("账号[" + admin.getUsername() + "]禁用失败");
			}
		}
	}

	@Override
	@Transactional(rollbackFor = { TransactionException.class, RuntimeException.class })
	public void enableAdmin(String[] ids) throws Exception {
		for (String id : ids) {
			Admin admin = this.adminMapper.loadById(new Long(id));
			if (admin == null) {
				continue;
			}
			if (admin.getIsSuper()) {
				throw new TransactionException("启用失败,超级管理员[" + admin.getUsername() + "]无权操作");
			}
			admin.setIsEnabled(true);
			Integer result = this.adminMapper.update(admin);
			if (result <= 0) {
				throw new TransactionException("账号[" + admin.getUsername() + "]启用失败");
			}
		}
	}

}
