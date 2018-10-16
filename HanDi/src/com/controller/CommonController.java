package com.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.common.Message;
import com.entity.Admin;
import com.service.IAdminService;
import com.service.ICaptchaService;
import com.shiro.Principal;
import com.utils.UUIDs;

/**
 * 通用控制器
 * @author caoxu
 *
 */
@Controller("commonController")
@RequestMapping("/admin/common")
public class CommonController extends BaseController {
	
	@Autowired
	private ICaptchaService captchaService;
	
	@Autowired
	private IAdminService adminService;
	
	/**
	 * 验证码图片流输出
	 * @param captchaId
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = { "/captcha" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public void image(String captchaId, HttpServletRequest request, HttpServletResponse response) {
		if (StringUtils.isEmpty(captchaId))
			captchaId = request.getSession().getId();
		String name = new StringBuffer().append("yB").append("-").append("der").append("ewoP").reverse().toString();
		String value = new StringBuffer().append("ten").append(".").append("xxp").append("ohs").reverse().toString();
		response.addHeader(name, value);
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Cache-Control", "no-store");
		response.setDateHeader("Expires", 0L);
		response.setContentType("image/jpeg");
		ServletOutputStream servletOutputStream = null;
		try {
			servletOutputStream = response.getOutputStream();
			BufferedImage bufferedImage = this.captchaService.buildImage(captchaId);
			ImageIO.write(bufferedImage, "jpg", servletOutputStream);
			servletOutputStream.flush();
		} catch (Exception exception) {
			exception.printStackTrace();
		} finally {
			try {
				servletOutputStream.close();
			} catch (IOException e) {
				servletOutputStream = null;
			}
		}
	}
	
	/**
	 * 首页
	 * @param map
	 * @return
	 */
	@RequestMapping(value = { "/main" }, method = { RequestMethod.GET })
	public String main(ModelMap map) {
		Subject currentUser = SecurityUtils.getSubject();
		Principal principal = (Principal) currentUser.getPrincipal();
		Map<String, Object> parms = new HashMap<String, Object>();
		parms.put("id", principal.getId());
		List<Admin> admins = this.adminService.adminList(parms);
		if (admins != null && admins.size() > 0) {
			map.addAttribute("admin", admins.get(0));
		}
		return "common/main";
	}
	
	/**
	 * 修改密码
	 * @param pass
	 * @return
	 */
	@RequestMapping(value = { "/setpass" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message setpass(String pass) {
		try {
			if (pass != null && !StringUtils.isBlank(pass)) {
				Subject currentUser = SecurityUtils.getSubject();
				Principal user = (Principal) currentUser.getPrincipal();
				Admin admin = new Admin();
				admin.setId(user.getId());
				admin.setSalt(UUIDs.generateShortUid());
				admin.setPassword(DigestUtils.md5Hex(pass + admin.getSalt()));
				this.adminService.update(admin);
				return Message.success("修改成功");
			}
			return Message.success("密码未作修改");
		} catch (Exception e) {
			return Message.error("修改失败！");
		}
	}

}
