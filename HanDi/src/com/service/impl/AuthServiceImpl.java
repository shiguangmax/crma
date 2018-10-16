package com.service.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.entity.Authority;
import com.entity.RoleAuth;
import com.mapper.AuthMapper;
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.service.IAuthService;

/**
 * 角色-权限对应service实现类
 * 
 * @author caoxu
 *
 */
@Service
public class AuthServiceImpl extends BaseServiceImpl<Authority> implements IAuthService {

	@Autowired
	private AuthMapper authMapper;

	@Override
	@Transactional
	public JqGridPage<RoleAuth> roleAuthPage(Map<String, Object> parms, JqGridPageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public Integer add(Authority auth) {
		auth.setCreateTime(new Date());
		auth.setModifyTime(new Date());
		return this.authMapper.add(auth);
	}

	@Override
	@Transactional
	public List<Authority> listAuthority(Map<String, Object> parms) {
		return this.authMapper.listAuthority(parms);
	}

	@Override
	@Transactional
	public JqGridPage<Authority> authPage(JqGridPageable pageable) {
		Set<String> searchKeys = new HashSet<String>();
		searchKeys.add("name");
		searchKeys.add("sn");
		searchKeys.add("url");
		searchKeys.add("codeName");
		pageable.setSearchKeys(searchKeys);
		return findPage(pageable);
	}

	@Override
	@Transactional
	public List<Long> getAuthAssocRoleId(Long authId) {
		return this.authMapper.getAuthAssocRoleId(authId);
	}

	@Override
	public Integer update(Authority t) {
		Integer result = super.update(t);
		return result;
	}

	@Override
	public Integer delete(Authority t) {
		return super.delete(t);
	}

	@Override
	public Integer batchDelete(String[] ids) {
		return super.batchDelete(ids);
	}

	@Override
	public Authority loadById(Long id) {
		return super.loadById(id);
	}

}
