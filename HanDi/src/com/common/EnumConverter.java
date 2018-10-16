package com.common;

import org.apache.commons.beanutils.converters.AbstractConverter;

/**
 * 枚举转换器
 * @author caoxu
 *
 */
public class EnumConverter extends AbstractConverter {
	
	// 枚举的类名,只允许构造的时候初始化
	private final Class<?> enumClass;

	public EnumConverter(Class<?> enumClass) {
		this(enumClass, null);
	}

	public EnumConverter(Class<?> enumClass, Object defaultValue) {
		super(defaultValue);
		this.enumClass = enumClass;
	}

	protected Class<?> getDefaultType() {
		return this.enumClass;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	protected Object convertToType(Class type, Object value) {
		String str = value.toString().trim();
		return Enum.valueOf(type, str);
	}

	protected String convertToString(Object value) {
		return value.toString();
	}
}
