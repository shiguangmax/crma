package com.service.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.entity.Authority;
import com.entity.Role;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mapper.RoleMapper;
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.service.IRoleService;

/**
 * 用户角色service实现类
 * @author caoxu
 *
 */
@Service
public class RoleServiceImpl extends BaseServiceImpl<Role> implements IRoleService  {

	@Autowired
	private RoleMapper roleMapper;
	
	/**
	 * 获取角色
	 * @param parms
	 * @return
	 */
	@Override
	@Transactional
	public List<Role> getRoleInfo(Map<String, Object> parms) {
		return this.roleMapper.getRoleInfo(parms);
	}
	
	/**
	 * 获取所有角色
	 * @return
	 */
	@Override
	@Transactional
	public List<Role> getRoleList() {
		return this.roleMapper.getRoleList();
	}

	/**
	 * 获取角色分页信息
	 * @param parms
	 * @return
	 */
	@Override
	@Transactional
	public JqGridPage<Role> rolePage(JqGridPageable pageable) {
		Set<String> searchKeys = new HashSet<String>();
		searchKeys.add("name");
		searchKeys.add("sn");
		pageable.setSearchKeys(searchKeys);
		return findPage(pageable);
	}
	
	/**
	 * 保存角色
	 * @param role
	 * @return
	 */
	@Override
	@Transactional
	public Integer addRole(Role role) {
		role.setCreateTime(new Date());
		role.setModifyTime(new Date());
		return this.roleMapper.add(role);
	}
	
	@Override
	@Transactional
	public JqGridPage<Authority> findPageRoleHadAuth(JqGridPageable pageable) {
		Set<String> searchKeys = new HashSet<String>();
		searchKeys.add("a.name"); // 因为是多表查询所以在列名前加上表的别名
		searchKeys.add("a.sn");
		searchKeys.add("a.category");
		pageable.setSearchKeys(searchKeys);

		Page<Authority> page = PageHelper.startPage(pageable.getPage(), pageable.getRows());
		List<Authority> rows = this.roleMapper.findPageRoleHadAuth(pageable);
		return new JqGridPage<Authority>(rows, page.getTotal(), pageable);
	}
	
	@Override
	@Transactional
	public List<Authority> getRoleHadAuth(JqGridPageable pageable) {
		List<Authority> rows = this.roleMapper.findPageRoleHadAuth(pageable);
		return rows;
	}
	
	@Override
	@Transactional
	public JqGridPage<Authority> findPageRoleNoHadAuth(JqGridPageable pageable) {
		Set<String> searchKeys = new HashSet<String>();
		searchKeys.add("name");		// 因为是多表查询所以在列名前加上表的别名
		searchKeys.add("sn");
		searchKeys.add("category");
		pageable.setSearchKeys(searchKeys);
		
		Page<Authority> page = PageHelper.startPage(pageable.getPage(), pageable.getRows());
		List<Authority> rows = this.roleMapper.findPageRoleNoHadAuth(pageable);
		return new JqGridPage<Authority>(rows, page.getTotal(), pageable);
	}

	@Override
	@Transactional
	public Integer addRoleOfAuth(Map<String, Long> parms) {
		Integer result = this.roleMapper.addRoleOfAuth(parms);
		return result;
	}

	@Override
	@Transactional
	public Integer delRoleOfAuth(Map<String, Object> parms) {
		Integer result = this.roleMapper.delRoleOfAuth(parms);
		return result;
	}

	@Override
	@Transactional
	public List<Long> getRoleAssocUserId(Long roleId) {
		return this.roleMapper.getRoleAssocUserId(roleId);
	}

	@Override
	public Integer update(Role t) {
		return super.update(t);
	}

	@Override
	public Integer delete(Role t) {
		return super.delete(t);
	}

	@Override
	public Integer batchDelete(String[] ids) {
		return super.batchDelete(ids);
	}

	@Override
	public Role loadById(Long id) {
		return super.loadById(id);
	}

	@Override
	public boolean snExist(String sn) {
		String str = this.roleMapper.snExist(sn);
		if (str != null) {
			return true;
		}
		return false;
	}

}
