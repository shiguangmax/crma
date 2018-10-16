package com.service;

import com.page.JqGridPage;
import com.page.JqGridPageable;

public interface IBaseService<T> {
	
	/**
	 * 分页查询列表
	 * @param pageable
	 * @return
	 */
	public JqGridPage<T> findPage(JqGridPageable pageable);
	
	/**
	 * 添加
	 * @param t
	 * @return
	 */
	public Integer add(T t);
	
	/**
	 * 更新
	 * @param t
	 * @return
	 */
	public Integer update(T t);
	
	/**
	 * 删除
	 * @param t
	 * @return
	 */
	public Integer delete(T t);
	
	/**
	 * 修改
	 * @param ids
	 * @return
	 */
	public Integer batchDelete(String[] ids);
	
	/**
	 * 根据id查询实体
	 * @param id
	 * @return
	 */
	public T loadById(Long id);

}
