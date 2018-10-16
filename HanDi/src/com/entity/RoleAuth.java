package com.entity;

import java.io.Serializable;

/**
 * 角色-权限对应实体类
 * @author caoxu
 *
 */
public class RoleAuth implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2796446416143434170L;
		
	//角色id
	private Integer roleId;
	
	//权限id
	private Integer authId;

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getAuthId() {
		return authId;
	}

	public void setAuthId(Integer authId) {
		this.authId = authId;
	}

}
