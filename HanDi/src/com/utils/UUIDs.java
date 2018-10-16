package com.utils;

import java.util.UUID;

public class UUIDs {
	
	public static String[] chars = new String[] { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
			"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8",
			"9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
			"U", "V", "W", "X", "Y", "Z" };

	/**
	 * 去掉-的UUID
	 * @return
	 */
	public static String getShortRandomUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	/**
	 * 完整的UUID
	 * @return
	 */
	public static String getRandomUUID() {
		return UUID.randomUUID().toString();
	}
	
	/**
	 * 短UUID，保证随机性
	 * @return
	 */
	public static String generateShortUid() {
		StringBuffer shortBuffer = new StringBuffer();
		String uuid = UUID.randomUUID().toString().replace("-", "");
		for (int i = 0; i < 8; i++) {
			String str = uuid.substring(i * 4, i * 4 + 4);
			// 将截取后符合16进制的字符转化为10进制数
			int x = Integer.parseInt(str, 16);
			// 从字符数组里取字符后拼接上去
			shortBuffer.append(chars[x % 0x3E]);
		}
		return shortBuffer.toString();
	}

}
