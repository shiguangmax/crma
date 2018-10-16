package com.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mapper.BaseMapper;
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.service.IBaseService;

public class BaseServiceImpl<T> implements IBaseService<T> {

	@Autowired
	public BaseMapper<T> mapper;

	@Override
	@Transactional
	public JqGridPage<T> findPage(JqGridPageable pageable) {
		// 分页插件
		Page<T> page = PageHelper.startPage(pageable.getPage(), pageable.getRows());
		List<T> rows = mapper.findPage(pageable);
		return new JqGridPage<T>(rows, page.getTotal(), pageable);
	}

	@Override
	@Transactional
	public Integer add(T t) {
		return this.mapper.add(t);
	}

	@Override
	@Transactional
	public Integer update(T t) {
		return this.mapper.update(t);
	}

	@Override
	@Transactional
	public Integer delete(T t) {
		return this.mapper.delete(t);
	}

	@Override
	@Transactional
	public Integer batchDelete(String[] ids) {
		return this.mapper.batchDelete(ids);
	}

	@Override
	@Transactional
	public T loadById(Long id) {
		return this.mapper.loadById(id);
	}

}
