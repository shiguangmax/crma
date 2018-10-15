package com.java1234.dao;

import java.util.List;
import java.util.Map;

import com.java1234.entity.Order;

/**
 * 订单Dao接口
 * @author Administrator
 *
 */
public interface OrderDao {

	
	/**
	 * 查询订单集合
	 * @param map
	 * @return
	 */
	public List<Order> find(Map<String,Object> map);
	
	
	/**
	 * 获取总记录数
	 * @param map
	 * @return
	 */
	public Long getTotal(Map<String,Object> map);
	
	
	/**
	 * 通过Id查找实体
	 * @param id
	 * @return
	 */
	public Order findById(Integer id);
	
	/**
	 * 查找指定客户的最近的订单
	 * @param cusId
	 * @return
	 */
	public Order findLastOrderByCusId(int cusId);
}
