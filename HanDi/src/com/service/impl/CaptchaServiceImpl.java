package com.service.impl;

import java.awt.image.BufferedImage;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.octo.captcha.service.CaptchaService;
import com.service.ICaptchaService;

/**
 * 验证码服务实现
 * 
 * @author scotte
 * 
 */
@Service
public class CaptchaServiceImpl implements ICaptchaService {

	// 验证码图片服务，调用的是octo验证码
	@Autowired
	private CaptchaService captchaService;

	/**
	 * 构建图片
	 */
	public BufferedImage buildImage(String captchaId) {
		return (BufferedImage) this.captchaService.getChallengeForID(captchaId);
	}

	/**
	 * 判断验证码是否有效
	 */
	public boolean isValid(String captchaId, String captcha) {
		if ((StringUtils.isNotEmpty(captchaId)) && (StringUtils.isNotEmpty(captcha))) {
			try {
				return this.captchaService.validateResponseForID(captchaId, captcha.toUpperCase()).booleanValue();
			} catch (Exception localException) {
				return false;
			}
		}
		return true;
	}

}
