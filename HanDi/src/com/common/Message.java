package com.common;

import com.common.Message;

/**
 * 消息类
 * @author caoxu
 *
 */
public class Message {

	// 消息类型
	private Message.Type type;

	// 消息内容
	private String message;
	
	// 数据域
	private Object userData;

	// 消息类型
	public enum Type {
		success, warn, error;
	}

	public Message() {
	}

	public Message(Message.Type type, String content) {
		this.type = type;
		this.message = content;
	}

	public Message(Message.Type type, Object data, String content) {
		this.type = type;
		this.message = content;
		this.userData = data;
	}
	
	public static Message success(String content) {
		return new Message(Message.Type.success, content);
	}

	public static Message success(Object data, String content) {
		return new Message(Message.Type.success, data,  content);
	}

	public static Message warn(String content) {
		return new Message(Message.Type.warn, content);
	}

	public static Message warn(Object data, String content) {
		return new Message(Message.Type.warn, data, content);
	}

	public static Message error(String content) {
		return new Message(Message.Type.error, content);
	}

	public static Message error(Object data, String content) {
		return new Message(Message.Type.error, data, content);
	}

	public Message.Type getType() {
		return this.type;
	}

	public void setType(Message.Type type) {
		this.type = type;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getUserData() {
		return userData;
	}

	public void setUserData(Object userData) {
		this.userData = userData;
	}

}
