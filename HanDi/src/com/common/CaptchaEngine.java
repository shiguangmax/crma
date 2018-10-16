package com.common;

import com.octo.captcha.component.image.backgroundgenerator.FileReaderRandomBackgroundGenerator;
import com.octo.captcha.component.image.color.RandomListColorGenerator;
import com.octo.captcha.component.image.fontgenerator.RandomFontGenerator;
import com.octo.captcha.component.image.textpaster.DecoratedRandomTextPaster;
import com.octo.captcha.component.image.textpaster.textdecorator.TextDecorator;
import com.octo.captcha.component.image.wordtoimage.ComposedWordToImage;
import com.octo.captcha.component.word.wordgenerator.RandomWordGenerator;
import com.octo.captcha.engine.image.ListImageCaptchaEngine;
import com.octo.captcha.image.gimpy.GimpyFactory;
import java.awt.Color;
import java.awt.Font;
import org.springframework.core.io.ClassPathResource;

/**
 * 验证码引擎
 * @author caoxu
 *
 */
public class CaptchaEngine extends ListImageCaptchaEngine {
	private static final int IMAGE_WIDTH = 110;
	private static final int IMAGE_HEIGHT = 40;
	private static final int DEFAULT_MIN_FONT_SIZE = 14;
	private static final int DEFAULT_MAX_FONT_SIZE = 16;
	private static final int MIN_WORD_LENGTH = 4;
	private static final int MAX_WORD_LENGTH = 4;
	
	// 生成验证码的基本信息
	private static final String WORD_KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	// 验证码背景图片位置
	private static final String CAPTCHA_PATH = "/com/captcha/";
	
	// 字体数组
	private static final Font[] FONT_ARRY = { new Font("nyala", 1, 16),
			new Font("Arial", 1, 16), new Font("nyala", 1, 16),
			new Font("Bell", 1, 16), new Font("Bell MT", 1, 16),
			new Font("Credit", 1, 16), new Font("valley", 1, 16),
			new Font("Impact", 1, 16) };
	
	// 验证码颜色数组
	private static final Color[] COLOR_ARRY = { new Color(255, 255, 255),
			new Color(255, 220, 220), new Color(220, 255, 255),
			new Color(220, 220, 255), new Color(255, 255, 220),
			new Color(220, 255, 220) };

	/**
	 * 构建验证码
	 */
	protected void buildInitialFactories() {
		// 初始化验证码生成基本信息
		// 设置字体的大小
		RandomFontGenerator randomFontGenerator = new RandomFontGenerator(
				Integer.valueOf(DEFAULT_MIN_FONT_SIZE), Integer.valueOf(DEFAULT_MAX_FONT_SIZE), FONT_ARRY);
		// 设置验证码图片的高宽
		FileReaderRandomBackgroundGenerator fileReaderRandomBackgroundGenerator = new FileReaderRandomBackgroundGenerator(
				Integer.valueOf(IMAGE_WIDTH), Integer.valueOf(IMAGE_HEIGHT),
				new ClassPathResource(CAPTCHA_PATH).getPath());
		// 设置验证码的位数
		DecoratedRandomTextPaster decoratedRandomTextPaster = new DecoratedRandomTextPaster(
				Integer.valueOf(MIN_WORD_LENGTH), Integer.valueOf(MAX_WORD_LENGTH),
				new RandomListColorGenerator(COLOR_ARRY), new TextDecorator[0]);
		// 将设置生效
		addFactory(new GimpyFactory(new RandomWordGenerator(WORD_KEY_STR),
				new ComposedWordToImage(randomFontGenerator,
						fileReaderRandomBackgroundGenerator,
						decoratedRandomTextPaster)));
	}
}
