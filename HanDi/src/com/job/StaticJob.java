package com.job;

import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * spring自带定时任务
 * @author caoxu
 *
 */
@Component("staticJob")
@Lazy(false)
public class StaticJob {

	@Scheduled(cron = "${job.static.cron}")
	public void build() {
		//System.out.println("-----定时任务开始----");
	}
	
}