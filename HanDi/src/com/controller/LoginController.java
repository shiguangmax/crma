package com.controller;

import java.util.UUID;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.pam.UnsupportedTokenException;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.common.Message;
import com.shiro.AuthenticationToken;

/**
 * 登录控制器
 * @author caoxu
 *
 */
@Controller("loginController")
@RequestMapping("/admin")
public class LoginController extends BaseController {

    @RequestMapping(value = "/login",method = RequestMethod.GET)
	public String login(ModelMap model) {
		model.addAttribute("captchaId", UUID.randomUUID().toString());
		return "login/login";
	}

	@RequestMapping(value = { "/syslogin" }, method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	@ResponseBody
	public Message syslogin(String username, String password, String captchaId, String captcha) {
		AuthenticationToken token = new AuthenticationToken(username, password, captchaId, captcha, false, null);
		Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(token);
			if (subject.isAuthenticated()) {
				return Message.success("登录成功，即将跳转..");
			}
		} catch (IncorrectCredentialsException e) {
			return Message.error("用户名或密码错误");
		} catch (ExcessiveAttemptsException e) {
			return Message.error("失败次数过多");
		} catch (LockedAccountException e) {
			return Message.error("账号已被锁定");
		} catch (DisabledAccountException e) {
			return Message.error("账号已禁用");
		} catch (UnknownAccountException e) {
			return Message.error("用户名或密码错误");
		} catch (UnsupportedTokenException e) {
			return Message.error("验证码错误");
		}
		return Message.error("登录失败");
	}

}
