package com.entity;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 权限实体类
 * @author caoxu
 *
 */
public class Authority extends BaseEntity implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 497380232276169875L;

	/**
	 * 权限类型枚举
	 */
	public enum Type {
		menu(1, "MENU"), // 菜单
		url(2, "URL"), // controller路由
		button(3, "BUTTON"), // 按钮
		data(4, "DATA"); // 数据

		public int value;
		public String name;

		private Type(int value, String name) {
			this.value = value;
			this.name = name;
		}
	}
	
	/** 权限的类型，详细见上面的枚举 */
	@NotBlank
	private String type;
	
	/** 权限的名称，中文名称 */
	@NotBlank
	private String name;
	
	/** 权限的编码 */
	@NotBlank
	private String codeName;
	
	/** 权限对应的操作链接，shiro控制 */
	@NotBlank
	private String url;
	
	/** 权限是否启用 */
	@NotNull
	private Boolean isEnabled;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

}
