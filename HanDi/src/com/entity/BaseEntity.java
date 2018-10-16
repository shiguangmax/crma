package com.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @author Administrator
 *
 */
public class BaseEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5889342414168221876L;

	/**
	 * 主键
	 */
	protected Long id;
	
	/**
	 * 创建时间
	 */
	protected Date createTime;
	
	/**
	 * 修改时间
	 */
	protected Date modifyTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

}
