package com.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * 访问拒绝过滤器
 */
public class AccessDeniedFilter implements Filter {

	private static final String ACCESS_DENIED = "Access denied!";

	public void init(FilterConfig filterConfig) {
	}

	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		HttpServletResponse httpServletRes = (HttpServletResponse) servletResponse;
		httpServletRes.sendError(403, ACCESS_DENIED);
	}

}
