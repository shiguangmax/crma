package com.service;

import java.util.List;
import java.util.Map;

import com.entity.Authority;
import com.entity.Role;
import com.page.JqGridPage;
import com.page.JqGridPageable;

/**
 * 用户角色service接口
 * @author caoxu
 *
 */
public interface IRoleService extends IBaseService<Role> {

	/**
	 * 获取角色
	 * @param parms
	 * @return
	 */
	public List<Role> getRoleInfo(Map<String, Object> parms);
	
	/**
	 * 获取角色
	 * @return
	 */
	public List<Role> getRoleList();

	/**
	 * 获取角色分页信息
	 * @param pageable
	 * @return
	 */
	public JqGridPage<Role> rolePage(JqGridPageable pageable);

	/**
	 * 保存角色
	 * @param role
	 * @return
	 */
	public Integer addRole(Role role);
	
	/**
	 * 分页获取角色拥有的权限
	 * @param parms
	 * @return
	 */
	public JqGridPage<Authority> findPageRoleHadAuth(JqGridPageable pageable);
	
	/**
	 * 获取角色拥有的权限
	 * @param pageable
	 * @return
	 */
	public List<Authority> getRoleHadAuth(JqGridPageable pageable);
	
	/**
	 * 分页获得角色未拥有的权限
	 * @param pageable
	 * @return
	 */
	public JqGridPage<Authority> findPageRoleNoHadAuth(JqGridPageable pageable);
	
	/**
	 * 给角色添加权限
	 * @param parms
	 * @return
	 */
	public Integer addRoleOfAuth(Map<String, Long> parms);
	
	/**
	 * 给角色删除权限
	 * @param parms
	 * @return
	 */
	public Integer delRoleOfAuth(Map<String, Object> parms);
	
	/**
	 * 得到角色关联的用户id
	 * @param roleId
	 * @return
	 */
	public List<Long> getRoleAssocUserId(Long roleId);
	
	public boolean snExist(String sn);
}
