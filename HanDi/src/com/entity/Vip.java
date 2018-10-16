package com.entity;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

public class Vip extends BaseEntity implements Serializable{ //会员信息列表
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2347541613670377112L;


	private Long id; //会员卡id
	/**用户名*/
	@NotBlank
	@Pattern(regexp = "^[0-9a-z_A-Z\\u4e00-\\u9fa5]+$")
	private String weiXinName;//会员微信名字
	private String vipUserName;//会员真实姓名
	private Long vipPhone;//手机号
	private Long vipKhao;//卡号
	private String vipDengJiName;//商户等级名称
	private int vipJiFen;//商户积分
	private String vipSex;//性别
	private Date birthday;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getWeiXinName() {
		return weiXinName;
	}
	public void setWeiXinName(String weiXinName) {
		this.weiXinName = weiXinName;
	}
	public String getVipUserName() {
		return vipUserName;
	}
	public void setVipUserName(String vipUserName) {
		this.vipUserName = vipUserName;
	}
	public Long getVipPhone() {
		return vipPhone;
	}
	public void setVipPhone(Long vipPhone) {
		this.vipPhone = vipPhone;
	}
	public Long getVipKhao() {
		return vipKhao;
	}
	public void setVipKhao(Long vipKhao) {
		this.vipKhao = vipKhao;
	}
	public String getVipDengJiName() {
		return vipDengJiName;
	}
	public void setVipDengJiName(String vipDengJiName) {
		this.vipDengJiName = vipDengJiName;
	}
	public int getVipJiFen() {
		return vipJiFen;
	}
	public void setVipJiFen(int vipJiFen) {
		this.vipJiFen = vipJiFen;
	}
	public String getVipSex() {
		return vipSex;
	}
	public void setVipSex(String vipSex) {
		this.vipSex = vipSex;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	@Override
	public String toString() {
		return "Vip [id=" + id + ", weiXinName=" + weiXinName
				+ ", vipUserName=" + vipUserName + ", vipPhone=" + vipPhone
				+ ", vipKhao=" + vipKhao + ", vipDengJiName=" + vipDengJiName
				+ ", vipJiFen=" + vipJiFen + ", vipSex=" + vipSex
				+ ", birthday=" + birthday + "]";
	}
	
	
	
	
}
