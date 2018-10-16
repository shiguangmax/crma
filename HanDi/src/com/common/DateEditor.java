package com.common;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.time.DateUtils;

/**
 * spring controller参数：时间格式字符串转date
 * @author caoxu
 *
 */
public class DateEditor extends PropertyEditorSupport {
	
	// 基本的时间格式
	public static final String[] DATE_PATTERNS = { "yyyy", "yyyy-MM", "yyyyMM",
				"yyyy/MM", "yyyy-MM-dd", "yyyyMMdd", "yyyy/MM/dd",
				"yyyy-MM-dd HH:mm:ss", "yyyyMMddHHmmss", "yyyy/MM/dd HH:mm:ss","HH:mm:ss" };
	
	// 默认日期基本格式
	private static final String DEFAULT_DATA_FORMAT = "yyyy-MM-dd HH:mm:ss";

	// 是否在日期为空的时候设置成null
	private boolean emptyAsNull;

	// 设置的日期基本格式
	private String dateFormat = DEFAULT_DATA_FORMAT;

	public DateEditor(boolean emptyAsNull) {
		this.emptyAsNull = emptyAsNull;
	}

	public DateEditor(boolean emptyAsNull, String dateFormat) {
		this.emptyAsNull = emptyAsNull;
		this.dateFormat = dateFormat;
	}

	// 获取日期的文本
	public String getAsText() {
		Date date = (Date) getValue();
		return date != null ? new SimpleDateFormat(this.dateFormat).format(date) : "";
	}

	// 通过日期字符串设置日期
	public void setAsText(String text) {
		if (text == null) {
			setValue(null);
		} else {
			String str = text.trim();
			if ((this.emptyAsNull) && ("".equals(str)))
				setValue(null);
			else
				try {
					setValue(DateUtils.parseDate(str, DATE_PATTERNS));
				} catch (ParseException localParseException) {
					setValue(null);
				}
		}
	}

}
