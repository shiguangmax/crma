package com.mapper;

import java.util.List;

import com.page.JqGridPageable;

/**
 * Mapper接口基类
 * @author caoxu
 *
 * @param <T>
 */
public interface BaseMapper<T> {
	
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
	 * 批量删除
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
	
	/**
	 * 分页列表查询
	 * @param pageable
	 * @return
	 */
	public List<T> findPage(JqGridPageable pageable);

}
