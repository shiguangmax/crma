package com.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;

import com.common.DateEditor;

/**
 * controller基类
 * @author caoxu
 *
 */
public class BaseController {
	
	// 错误页面
	protected static final String ERROR_PAGE_PATH = "/common/error";

	/**
	 * controller前台参数绑定，主要用于参数处理
	 * @param binder
	 */
	@InitBinder
	protected void initWebDataBinder(WebDataBinder binder) {
		
		// string去空格（trim）处理器
		binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
		
		// 日期格式string转换date处理器
		binder.registerCustomEditor(Date.class, new DateEditor(true));
	}
	
	/**
	 * 全局异常拦截
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler(RuntimeException.class)
	public String exceptionBack(RuntimeException ex, HttpServletRequest request) {
		ex.printStackTrace();
		return "error/500";
	}

}
