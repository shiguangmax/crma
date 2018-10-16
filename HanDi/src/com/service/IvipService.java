package com.service;

import java.util.List;

import com.entity.Admin;
import com.entity.Vip;
import com.page.JqGridPage;
import com.page.JqGridPageable;

public interface IvipService  extends IBaseService<Vip>{
	/*
	 * 新增 获取vip卡会员信息
	 * 
	 */
	public JqGridPage<Vip> pageVip(JqGridPageable pageable);
	/**
	 * 更新用户信息
	 * @param Vip
	 * @return
	 * @throws Exception
	 */
	public Vip updateVip(Vip vip) throws Exception;
	/**
	 * 删除用户，
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public void deleteVip(String [] ids) throws Exception;
	
}
