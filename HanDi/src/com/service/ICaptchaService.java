package com.service;

import java.awt.image.BufferedImage;


/**
 * 验证码服务
 * @author scotte
 *
 */
public abstract interface ICaptchaService {
	/**
	 * 构建图片，根据验证码id
	 * @param captchaId
	 * @return
	 */
	public abstract BufferedImage buildImage(String captchaId);

	/**
	 * 判断验证码是否有效
	 * @param captchaId
	 * @param captcha
	 * @return
	 */
	public abstract boolean isValid(String captchaId, String captcha);

}
