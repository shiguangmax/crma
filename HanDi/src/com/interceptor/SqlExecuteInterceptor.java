package com.interceptor;

import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import com.utils.MyBatisUtil;

/**
 * mybatis SQL执行监控器
 * @author caoxu
 *
 */
@Intercepts({
		@Signature(type = Executor.class, method = "query", args = { MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class }),
		@Signature(type = Executor.class, method = "update", args = { MappedStatement.class, Object.class }) })
public class SqlExecuteInterceptor  implements Interceptor {
	
	/**
	 * 最小执行时间（编辑以便发现哪些SQL性能低下）
	 */
	private int minExcuteTime = 0;

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];
		Object parameterObject = null;
		if (invocation.getArgs().length > 1) {
			parameterObject = invocation.getArgs()[1];
		}
		BoundSql boundSql = mappedStatement.getBoundSql(parameterObject);
		Configuration configuration = mappedStatement.getConfiguration();
		// 解析SQL语句
		String sql = MyBatisUtil.parseSql(boundSql, parameterObject, configuration);

		long start = System.currentTimeMillis();

		Object result = invocation.proceed();

		long end = System.currentTimeMillis();
		long timing = end - start;
		// 输出大于指定时间的SQL
		if (timing > minExcuteTime) {
			System.out.println("耗时：" + timing + " ms" + " - " + sql);
			//logger.info(timing + " ms" + " - " + sql);
		}
		return result;
	}

	@Override
	public Object plugin(Object target) {
		if (target instanceof Executor) {
			return Plugin.wrap(target, this);
		}
		return target;
	}

	@Override
	public void setProperties(Properties properties) {
	}

	public int getMinExcuteTime() {
		return minExcuteTime;
	}

	public void setMinExcuteTime(int minExcuteTime) {
		this.minExcuteTime = minExcuteTime;
	}

}
