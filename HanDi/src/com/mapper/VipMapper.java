package com.mapper;
import java.util.List;
import java.util.Map;

import com.entity.Admin;
import com.entity.Vip;

public interface VipMapper extends BaseMapper<Vip>{

	/**
	 * 获取管理账户
	 * @param parms
	 * @return
	 */
	List<Admin> VipList(Map<String, Object> parms);
	public Integer addvip(Vip vip);
}
