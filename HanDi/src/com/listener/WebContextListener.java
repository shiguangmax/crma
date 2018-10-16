package com.listener;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 * web初始化监听器
 * @author caoxu
 *
 */
@Component
public class WebContextListener implements ApplicationListener<ContextRefreshedEvent> {
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		// TODO Auto-generated method stub
		if (arg0.getApplicationContext().getParent() == null) {
			System.out.println("-----------------启动事件----------------");
		}
	}

}
