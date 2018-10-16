package com.page;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.alibaba.fastjson.JSONObject;
import com.common.Order;

/**
 * 分页请求类
 * @author caoxu
 *
 */
public class JqGridPageable implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4103606701108779988L;
	private static final int DEFAULT_PAGENUMBER = 1;
	private static final int DEFAULT_PAGESIZE = 10;
	
	// 默认为每页记录条数为10条
	private Integer rows = DEFAULT_PAGESIZE;
	
	// 当前页默认为第一页
	private Integer page = DEFAULT_PAGENUMBER;
	
	// 排序的字段
	private String sidx;
	
	// 排序方式
	private String sord;
	
	/**
	 * 过滤条件只限于and
	 */
	private List<JqGridSearchRule> rules;
	
	/**
	 * 模糊查询的key，多个key之间or的方式成立
	 */
	private Set<String> searchKeys;
	
	/**
	 * 模糊查询的参数
	 */
	private String searchParams;

	// 分组条件
	private List<Order> orders = new ArrayList<Order>();
	
	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public String getSord() {
		return sord;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}

	public String getSearchParams() {
		return searchParams;
	}

	public void setSearchParams(String searchParams) {
		this.searchParams = searchParams;
	}

	public Set<String> getSearchKeys() {
		return searchKeys;
	}

	public void setSearchKeys(Set<String> searchKeys) {
		this.searchKeys = searchKeys;
	}

	public List<JqGridSearchRule> getRules() {
		return rules;
	}

	public void setRules(List<JqGridSearchRule> rules) {
		this.rules = rules;
	}

	public List<Order> getOrders() {
		if (orders == null || orders.isEmpty()) {
			if (sidx == null || sidx.trim().isEmpty() || sord == null || sord.trim().isEmpty()) {
				return orders;
			}
			String orderStr = sidx + " " + sord;
			String [] orderItems = orderStr.split(",");
			for(int i = orderItems.length-1; i >= 0; i--) {
				String orderItem = orderItems[i].trim();
				String [] orderSplits = orderItem.split(" ");
				if (orderSplits.length < 2) {
					continue;
				}
				if (orderSplits[1].trim().equals("asc")) {
					Order order = Order.asc(orderSplits[0].trim());
					orders.add(order);
				} else if (orderSplits[1].trim().equals("desc")) {
					Order order = Order.desc(orderSplits[0].trim());
					orders.add(order);
				} 
			}
			
		}
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public void addRule(JqGridSearchRule rule) {
		if (rule == null) {
			return ;
		}
		if(this.rules == null) {
			this.rules = new ArrayList<JqGridSearchRule>();
		}
		this.rules.add(rule);
	}

	public void addOrder(Order order) {
		if (order == null) {
			return;
		}
		if(this.orders == null) {
			this.orders = new ArrayList<Order>();
		}
		this.orders.add(order);
	}
	
	@Override
	public int hashCode() {
		return JSONObject.toJSONString(this).hashCode();
	}
	
}
