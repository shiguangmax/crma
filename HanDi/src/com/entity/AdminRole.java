package com.entity;

/**
 * 账号-角色对应
 * @author caoxu
 *
 */
public class AdminRole {

	//管理员账号id
	private Long userId;
	
	//角色id
	private Long roleId;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

}
