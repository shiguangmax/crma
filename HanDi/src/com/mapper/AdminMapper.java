package com.mapper;

import java.util.List;
import java.util.Map;

import com.entity.Admin;
import com.entity.AdminRole;
import com.entity.Authority;
import com.entity.Role;

/**
 * 平台管理账户Mapper接口
 * @author caoxu
 *
 */
public interface AdminMapper extends BaseMapper<Admin> {
	
	/**
	 * 获取管理账户
	 * @param parms
	 * @return
	 */
	List<Admin> adminList(Map<String, Object> parms);
	
	/**
	 * 判断管理账户是否存在
	 * @param parms
	 * @return
	 */
	Admin usernameExist(String username);
	
	/**
	 * 获取某个账号的所有权限
	 * @param id
	 * @return
	 */
	List<Authority> listAuthoritysByAdmin(Long id);
	
	/**
	 * 获取某个账号的所有权限编码
	 * @param id
	 * @return
	 */
	List<String> listAuthorityCodesByAdmin(Long id);
	
	/**
	 * 获取某个账号的所有角色
	 * @param id
	 * @return
	 */
	List<Role> listRolesByAdmin(Long id);
	
	/**
	 * 获得用户拥有的角色
	 * @param userId
	 * @return
	 */
	List<Role> getUserOfRole(Long userId);
	
	/**
	 * 删除用户拥有的角色
	 * @param userId
	 * @return
	 */
	Integer delUserOfAuth(Long userId);
	
	/**
	 * 给用户添加角色
	 * @param parms
	 * @return
	 */
	Integer addUserOfRole(AdminRole adminRole);

}
