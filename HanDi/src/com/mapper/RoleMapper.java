package com.mapper;

import java.util.List;
import java.util.Map;

import com.entity.Authority;
import com.entity.Role;
import com.page.JqGridPageable;

/**
 * 用户角色Mapper接口
 * @author caoxu
 *
 */
public interface RoleMapper extends BaseMapper<Role> {
	
	/**
	 * 获取角色
	 * @param parms
	 * @return
	 */
	List<Role> getRoleInfo(Map<String, Object> parms);
	
	/**
	 * 获取所有角色
	 * @return
	 */
	List<Role> getRoleList();
	
	/**
	 * 获取角色数量
	 * @param parms
	 * @return
	 */
	Integer roleCount(Map<String, Object> parms);
	
	/**
	 * 获取角色拥有的权限
	 * @param parms
	 * @return
	 */
	List<Authority> findPageRoleHadAuth(JqGridPageable pageable);
	
	/**
	 * 获得角色未拥有的权限
	 * @param pageable
	 * @return
	 */
	List<Authority> findPageRoleNoHadAuth(JqGridPageable pageable);
	
	/**
	 * 给角色添加权限
	 * @param parms
	 * @return
	 */
	Integer addRoleOfAuth(Map<String, Long> parms);
	
	/**
	 * 给角色删除权限
	 * @param parms
	 * @return
	 */
	Integer delRoleOfAuth(Map<String, Object> parms);
	
	/**
	 * 得到角色关联的用户id
	 * @param roleId
	 * @return
	 */
	List<Long> getRoleAssocUserId(Long roleId);
	
	String snExist(String sn);

}
