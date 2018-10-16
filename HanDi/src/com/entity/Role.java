package com.entity;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 角色实体类
 * @author caoxu
 *
 */
public class Role extends BaseEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -896478475871652739L;
		
	//角色名称
	@NotBlank
	private String name;
	
	//角色编号
	@NotBlank
	private String sn;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}
}
