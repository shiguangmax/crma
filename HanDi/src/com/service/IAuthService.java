package com.service;

import java.util.List;
import java.util.Map;

import com.entity.Authority;
import com.entity.RoleAuth;
import com.page.JqGridPage;
import com.page.JqGridPageable;

/**
 * 角色-权限对应service接口
 * @author caoxu
 *
 */
public interface IAuthService extends IBaseService<Authority> {

	/**
	 * 获取角色-权限对应分页信息
	 * @param parms
	 * @return
	 */
	public JqGridPage<RoleAuth> roleAuthPage(Map<String, Object> parms, JqGridPageable pageable);

	/**
	 * 列出所有的权限
	 * @param parms
	 * @return
	 */
	List<Authority> listAuthority(Map<String, Object> parms);
	
	/**
	 * 获取权限分页信息
	 * @param parms
	 * @return
	 */
	public JqGridPage<Authority> authPage(JqGridPageable pageable);
	
	/**
	 * 获得权限被关联的角色id
	 * @param authId
	 * @return
	 */
	public List<Long> getAuthAssocRoleId(Long authId);
}
