package com.page;

import java.io.Serializable;
import java.util.Set;

/**
 * 分页请求过滤条件规则
 * @author caoxu
 *
 */
public class JqGridSearchRule implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 802876104727700641L;
	
	private String field;

	// 过滤操作
	public enum Operator {
		eq,ne,lt,le,gt,ge,bw,bn,in,ni,ew,en,cn,nc;

		public static Operator fromString(String value) {
			return valueOf(value.toLowerCase());
		}
	}

	/**
	 * [
	 * 'eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','cn','nc'
	 * ] The corresponding texts are in language file and mean the
	 * following: ['equal','not equal', 'less', 'less or
	 * equal','greater','greater or equal', 'begins with','does not begin
	 * with','is in','is not in','ends with','does not end
	 * with','contains','does not contain']
	 */
	private String op;
	
	private String data;
	
	private Set<String> inDatas;

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getOp() {
		return op;
	}

	public void setOp(String op) {
		this.op = op;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Set<String> getInDatas() {
		return inDatas;
	}

	public void setInDatas(Set<String> inDatas) {
		this.inDatas = inDatas;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((data == null) ? 0 : data.hashCode());
		result = prime * result + ((field == null) ? 0 : field.hashCode());
		result = prime * result + ((inDatas == null) ? 0 : inDatas.hashCode());
		result = prime * result + ((op == null) ? 0 : op.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		JqGridSearchRule other = (JqGridSearchRule) obj;
		if (data == null) {
			if (other.data != null)
				return false;
		} else if (!data.equals(other.data))
			return false;
		if (field == null) {
			if (other.field != null)
				return false;
		} else if (!field.equals(other.field))
			return false;
		if (inDatas == null) {
			if (other.inDatas != null)
				return false;
		} else if (!inDatas.equals(other.inDatas))
			return false;
		if (op == null) {
			if (other.op != null)
				return false;
		} else if (!op.equals(other.op))
			return false;
		return true;
	}
	
	
}