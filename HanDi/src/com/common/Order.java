package com.common;

import java.io.Serializable;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

/**
 * 排序类
 * @author caoxu
 *
 */
public class Order implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5987563257388346335L;

	// 默认排序方式
	private static final Order.Direction DEFAULT_DIRECTION = Order.Direction.desc;

	// 排序的属性
	private String property;

	// 排序方式
	private String direction = DEFAULT_DIRECTION.name();

	// 排序类型
	public enum Direction {
		asc, desc;

		public static Direction fromString(String value) {
			return valueOf(value.toLowerCase());
		}
	}

	public Order() {
	}

	public Order(String property, Order.Direction direction) {
		this.property = property;
		this.direction = direction.name();
	}

	public static Order asc(String property) {
		return new Order(property, Order.Direction.asc);
	}

	public static Order desc(String property) {
		return new Order(property, Order.Direction.desc);
	}

	public String getProperty() {
		return this.property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getDirection() {
		return this.direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public boolean equals(Object obj) {
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		if (this == obj)
			return true;
		Order localOrder = (Order) obj;
		return new EqualsBuilder().append(getProperty(), localOrder.getProperty())
				.append(getDirection(), localOrder.getDirection()).isEquals();
	}

	public int hashCode() {
		return new HashCodeBuilder(17, 37).append(getProperty()).append(getDirection()).toHashCode();
	}

}
