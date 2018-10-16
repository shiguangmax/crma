package com.page;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 翻页信息（用于数据返回前端）
 * @author caoxu
 *
 * @param <T>
 */
public class JqGridPage<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5949644581432747255L;

	// 页面的实际数据内容
	private final List<T> content = new ArrayList<T>();

	// 总页数
	private final long total;

	// 分页规则信息
	private final JqGridPageable pageable;

	public JqGridPage() {
		this.total = 0L;
		this.pageable = new JqGridPageable();
	}

	public JqGridPage(List<T> content, long total, JqGridPageable pageable) {
		this.content.addAll(content);
		this.total = total;
		this.pageable = pageable;
	}

	public int getPageNumber() {
		return this.pageable.getPage();
	}

	public int getPageSize() {
		return this.pageable.getRows();
	}

	public int getTotalPages() {
		int  totalPage =  (int) Math.ceil((double)getTotal() / getPageSize());
		return totalPage == 0? 1:totalPage;
	}

	public List<T> getContent() {
		return this.content;
	}

	public long getTotal() {
		return this.total;
	}

	public JqGridPageable getPageable() {
		return this.pageable;
	}

	public Map<String, Object> toMap() {
		Map<String, Object> listInfoMap = new HashMap<String, Object>();
		listInfoMap.put("content", this.getContent());
		listInfoMap.put("size", this.getPageSize());
		listInfoMap.put("number", this.getContent().size());
		listInfoMap.put("numberOfElements", this.getContent().size());
		listInfoMap.put("totalElements", this.getTotal());
		listInfoMap.put("firstPage", this.getPageNumber() == 1);
		listInfoMap.put("totalPages", this.getTotalPages());
		listInfoMap.put("lastPage", this.getPageNumber() == this.getTotalPages());
		return listInfoMap;
	}

}
