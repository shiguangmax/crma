package com.shiro;

import java.util.Date;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.pam.UnsupportedTokenException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.entity.Admin;
import com.service.IAdminService;
import com.service.ICaptchaService;

/**
 * shiro 认证逻辑
 * @author caoxu
 *
 */
public class AuthenticationRealm extends AuthorizingRealm {

	@Autowired
	private IAdminService adminService;

	@Autowired
	private ICaptchaService captchaService;

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

		com.shiro.AuthenticationToken authenticationToken = (com.shiro.AuthenticationToken) token;
		// 用户名
		String username = authenticationToken.getUsername();
		// 密码
		String password = new String(authenticationToken.getPassword());
		// 验证码ID
		String captchaId = authenticationToken.getCaptchaId();
		// 验证码
		String captcha = authenticationToken.getCaptcha();
		// 访问来源的地址
		String host = authenticationToken.getHost();

		// 管理员登录验证
		if (!this.captchaService.isValid(captchaId, captcha))
			throw new UnsupportedTokenException();
		// 通过用户和密码进行有效性验证
		if ((username != null) && (password != null)) {
			Admin admin = this.adminService.usernameExist(username);

			// 判断用户是否存在
			if (admin == null)
				throw new UnknownAccountException();

			// 判断用户是否启用
			if (!admin.getIsEnabled().booleanValue())
				throw new DisabledAccountException();

			// 判断管理员是否已经登录
			if (admin.getIsLocked().booleanValue()) {
				// 当管理员账号被锁的时候进行相应的判断
				int accountLockTime = 30;
				Date lockedDate = admin.getLockedDate();
				Date expiredDate = DateUtils.addMinutes(lockedDate, accountLockTime);
				if (new Date().after(expiredDate)) {
					// 如果锁的时候已经到了进行解锁
					admin.setLoginFailureCount(Integer.valueOf(0));
					admin.setIsLocked(Boolean.valueOf(false));
					admin.setLockedDate(null);
					this.adminService.update(admin);
				} else {
					throw new LockedAccountException();
				}
			}
			String checkPwd = password + admin.getSalt();
			if (!DigestUtils.md5Hex(checkPwd).equals(admin.getPassword())) {
				// 比较用户密码失败的时候操作
				// 获取登录失败的次数
				int loginFailureCount = admin.getLoginFailureCount().intValue() + 1;
				if (loginFailureCount >= 5) {
					// 如果已经超过最大登录次数则锁住账号
					admin.setIsLocked(Boolean.valueOf(true));
					admin.setLockedDate(new Date());
				}
				// 登录失败增加登录失败次数
				admin.setLoginFailureCount(Integer.valueOf(loginFailureCount));
				this.adminService.update(admin);
				throw new IncorrectCredentialsException();
			}
			// 如果登录成功，设置基本登录信息记录，并且返回认证信息
			admin.setLoginIp(host);
			admin.setLoginDate(new Date());
			admin.setLoginFailureCount(Integer.valueOf(0));
			this.adminService.update(admin);
			// 返回基本认证信息
			return new SimpleAuthenticationInfo(new Principal(admin.getId(), username), password, getName());
		}
		// 如果没有用户名和密码直接返回账号无效
		throw new UnknownAccountException();
	}

	/**
	 * 登录后加载权限
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		// 获取主要角色
		Principal principal = (Principal) principals.fromRealm(getName()).iterator().next();
		if (principal != null) {
			// 获取角色对应的权限
			List<String> authorities = this.adminService.listAuthorityCodesByAdmin(principal.getId());
			if (authorities != null) {
				SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
				simpleAuthorInfo.addStringPermissions(authorities);
				return simpleAuthorInfo;
			}
		}
		return null;
	}

}
