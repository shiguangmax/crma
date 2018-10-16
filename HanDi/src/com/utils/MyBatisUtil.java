package com.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.type.TypeHandlerRegistry;

/**
 * mybatis 工具类
 * @author caoxu
 *
 */
public final class MyBatisUtil {

	/**
	 * 日期格式化
	 */
	private static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 解析获取sql语句
	 *
	 * @param boundSql
	 * @param parameterObject
	 * @param configuration
	 * @return
	 */
	public static String parseSql(MappedStatement ms, BoundSql boundSql, Object parameterObject,
			Configuration configuration) {
		String sql = boundSql.getSql().replaceAll("[\\s]+", " ");
		List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
		TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
		if (parameterMappings == null) {
			// 不存在参数
			return sql;
		}

		// 输入参数
		List<ParameterMapping> inputParams = new ArrayList<>();
		for (int i = 0; i < parameterMappings.size(); i++) {
			ParameterMapping parameterMapping = parameterMappings.get(i);
			if (parameterMapping.getMode() != ParameterMode.OUT) {
				inputParams.add(parameterMapping);
			}
		}
		// 没有输入参数
		if (inputParams.isEmpty()) {
			return sql;
		}
		// sql输入参数替换
		StringBuffer sb = new StringBuffer();
		StringTokenizer tokenizer = new StringTokenizer(sql, "[\\?]", true);
		int index = 0;
		while (tokenizer.hasMoreElements()) {
			String token = (String) tokenizer.nextElement();
			if ("?".equals(token)) {
				// 参数处理
				ParameterMapping parameterMapping = inputParams.get(index++);
				Object value;
				String propertyName = parameterMapping.getProperty();
				if (boundSql.hasAdditionalParameter(propertyName)) {
					value = boundSql.getAdditionalParameter(propertyName);
				} else if (parameterObject == null) {
					value = null;
				} else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
					value = parameterObject;
				} else {
					MetaObject metaObject = configuration.newMetaObject(parameterObject);
					value = metaObject.getValue(propertyName);
				}
				if (value != null) {
					if (value instanceof String) {
						// 字符串类型
						sb.append("'");
						sb.append(escape(value.toString()));
						sb.append("'");
					} else if (value instanceof Date) {
						// 日期类型
						sb.append("'");
						sb.append(new SimpleDateFormat(DATE_FORMAT).format(value));
						sb.append("'");
					} else {
						// 其他类型
						sb.append(escape(value.toString()));
					}
				} else {
					sb.append("null");
				}
			} else {
				sb.append(token);
			}
		}
		return sb.toString();
	}

	/**
	 * 解析获取sql语句
	 *
	 * @param boundSql
	 * @param parameterObject
	 * @param configuration
	 * @return
	 */
	public static String parseSql(BoundSql boundSql, Object parameterObject, Configuration configuration) {
		return parseSql(null, boundSql, parameterObject, configuration);
	}

	/**
	 * SQL引号转义处理
	 *
	 * @param value
	 * @return
	 */
	private static String escape(String value) {
		if (StringUtils.isBlank(value)) {
			return value;
		}
		return value.replaceAll("(?<!\\\\)'", "\\\\'");
	}

}
