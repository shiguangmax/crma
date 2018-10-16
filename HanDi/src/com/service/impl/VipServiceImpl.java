package com.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.common.TransactionException;
import com.entity.Admin;
import com.entity.Vip;
import com.mapper.VipMapper;
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.service.IvipService;
@Service
public class VipServiceImpl extends BaseServiceImpl<Vip> implements IvipService{
	@Autowired
	private VipMapper vipMapper ;
	//新增vip会员信息分页查询
	@Override
	@Transactional
	public JqGridPage<Vip> pageVip(JqGridPageable pageable) {
		Set<String> searchKeys = new HashSet<String>();
		searchKeys.add("weiXinName");
		searchKeys.add("vipUserName");
		searchKeys.add("vipPhone");
		searchKeys.add("vipKhao");
		searchKeys.add("vipSex");
		searchKeys.add("vipDengJiName");
		searchKeys.add("vipJiFen");
		pageable.setSearchKeys(searchKeys);
		return findPage(pageable);
		
	}
//
	@Override
	public Vip updateVip(Vip vip) throws Exception {
			if (vip.getId()!=null) {
				Integer result = this.vipMapper.update(vip);
				if (result <= 0) {
					throw new TransactionException("修改用户信息失败");
				}
				return vip;	
			}
			if (vip.getId()==null) {
				Integer result =	this.vipMapper.addvip(vip);//添加用户列表信息
				if (result <= 0) {
					throw new TransactionException("修改用户信息失败");
				}
			}
			
			return vip;
	}
	
    //删除用户
	
	@Override
	@Transactional(rollbackFor = { TransactionException.class, RuntimeException.class })
	public void deleteVip(String[] ids) throws Exception {
		Integer result = this.vipMapper.batchDelete(ids);
		if (result <= 0) {
			throw new TransactionException("删除失败");
		}
	}

}
