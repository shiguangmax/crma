package com.service;

import java.util.List;
import java.util.Map;

import com.entity.Admin;
import com.entity.AdminRole;
import com.entity.Authority;
import com.entity.Role;
import com.entity.Vip;
import com.page.JqGridPage;
import com.page.JqGridPageable;

/**
 * 平台管理账户service接口
 * @author caoxu
 *
 */
public interface IAdminService extends IBaseService<Admin> {

	/**
	 * 获取管理账户分页信息
	 * @param parms
	 * @return
	 */
	public JqGridPage<Admin> adminPage(JqGridPageable pageable);

	
	/**
	 * 获取管理账户
	 * @param parms
	 * @return
	 */
	public List<Admin> adminList(Map<String, Object> parms);
	
	/**
	 * 判断管理账户是否存在
	 * @param parms
	 * @return
	 */
	public Admin usernameExist(String username);

	public List<Authority> listAuthoritysByAdmin(Long id);
	
	public List<String> listAuthorityCodesByAdmin(Long id);
	
	public List<Role> listRolesByAdmin(Long id);
	
	/**
	 * 获得用户拥有的角色
	 * @param userId
	 * @return
	 */
	public List<Role> getUserOfRole(Long userId);
	
	/**
	 * 给用户添加角色
	 * @param parms
	 * @return
	 */
	public Integer addUserOfRole(AdminRole adminRole);
	
	/**
	 * 删除用户拥有的角色
	 * @param userId
	 * @return
	 */
	public Integer delUserOfAuth(Long userId);
	
	/**
	 * 得到当前登录的账号
	 * @return
	 */
	public Admin getCurrentAdmin();
	
	/**
	 * 保存用户
	 * @param admin
	 * @return
	 * @throws Exception
	 */
	public Admin save(Admin admin) throws Exception;
	
	/**
	 * 根据用户，角色，更新用户信息
	 * @param admin
	 * @param roleIds
	 * @return
	 * @throws Exception
	 */
	public Admin updateAdmin(Admin admin, List<Long> roleIds) throws Exception;

	/**
	 * 删除用户，采用假删除，用禁用的方式来代替删除
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public void deleteAdmin(String [] ids) throws Exception;
	
	/**
	 * 批量启用账号
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public void enableAdmin(String [] ids) throws Exception;

}
