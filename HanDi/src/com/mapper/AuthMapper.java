package com.mapper;

import java.util.List;
import java.util.Map;

import com.entity.Authority;

/**
 * 角色-权限对应Mapper接口
 * @author caoxu
 *
 */
public interface AuthMapper extends BaseMapper<Authority> {
	
	/**
	 * 列出所有的权限
	 * @param parms
	 * @return
	 */
	List<Authority> listAuthority(Map<String, Object> parms);
	
	/**
	 * 获得权限被关联的角色id
	 * @param authId
	 * @return
	 */
	List<Long> getAuthAssocRoleId(Long authId);
}
