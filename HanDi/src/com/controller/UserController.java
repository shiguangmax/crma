package com.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.common.Message;
import com.entity.Admin;
import com.entity.Role;
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.service.IAdminService;
import com.service.IRoleService;

@Controller("userController")
@RequestMapping("/admin/user")
public class UserController extends BaseController {
	@Autowired
	private IAdminService adminService;
	
	@Autowired
	private IRoleService roleService;
	
	/**
	 * 跳转到用户管理列表页
	 * @return
	 */
	@RequestMapping(value = { "/userlist" }, method = { RequestMethod.GET })
	public String userlist() {
		return "user/user_list";
	}
	
	/**
	 * 用户列表数据
	 * @param pageable
	 * @return
	 */
	@RequestMapping(value = { "/userlistjson" })
	@ResponseBody
	public Map<String, Object> userListJson(JqGridPageable pageable, Long branchId) {
		JqGridPage<Admin> adminPage = this.adminService.adminPage(pageable);
		if (adminPage == null) {
			adminPage = new JqGridPage<Admin>();
		}
		return adminPage.toMap();
	}
	
	/**
	 * 添加用户弹框
	 * @return
	 */
	@RequestMapping(value = { "/add" }, method = { RequestMethod.GET })
	public String add(ModelMap map, Long id) {
		if (id != null) {
			Admin user = this.adminService.loadById(id);
			if (user != null) {
				map.addAttribute("user", user);
			}
		}
		List<Role> roles = this.roleService.getRoleList();		// 所有的角色
		map.addAttribute("roles", roles);
		if (id != null) {
			List<Role> userOfRoles = this.adminService.getUserOfRole(id);
			List<String> userOfRoleIds = new ArrayList<>();
			for (Role role: userOfRoles) {
				userOfRoleIds.add(role.getId().toString());
			}
			map.addAttribute("userOfRoleIds", userOfRoleIds);
		}
		return "user/user_add";
	}
	
	/**
	 * 保存用户
	 * @param role
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = { "/save" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message save(@Valid Admin admin, BindingResult bindingResult, String[] roleIds, Long branchId) {
		if (bindingResult.hasErrors()) {
			// 参数验证错误
			if (bindingResult.getFieldError().getField().equals("email")) {
				return Message.error("请检查邮件格式");
			}
			return Message.error("请检查 * 标注的必填项");
		}
		if (this.adminService.usernameExist(admin.getUsername()) != null) {
			return Message.error("该用户名已存在");
		}
		//获取所有角色id
		List<Long> lRoleIds = new ArrayList<Long>();
		for (int i = 0; i < roleIds.length; ++i) {		// 再添加
			lRoleIds.add(new Long(roleIds[i]));
		}
		
		try {
			admin = this.adminService.save(admin);
		} catch (Throwable t) {
			return Message.error(t.getMessage());
		}
		return Message.success("保存成功");	
	}
	
	/**
	 * 更新用户
	 * @param admin
	 * @param bindingResult
	 * @param oldsn
	 * @return
	 */
	@RequestMapping(value = { "/update" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message update(@Valid Admin admin, BindingResult bindingResult, String[] roleIds, Long branchId) {
		if (bindingResult.hasErrors()) {
			// 参数验证错误
			if (bindingResult.getFieldError().getField().equals("email")) {
				return Message.error("请检查邮件格式");
			}
			if (!bindingResult.getFieldError().getField().equals("password")) {
				return Message.error("请检查 * 标注的必填项");
			}
		}
		try {
			//获取所有角色id
			List<Long> lRoleIds = new ArrayList<Long>();
			for (int i = 0; i < roleIds.length; ++i) {		// 再添加
				lRoleIds.add(new Long(roleIds[i]));
			}
			this.adminService.updateAdmin(admin, lRoleIds);
			return Message.success("更新成功");
		} catch (Exception e) {
			e.printStackTrace();
			return Message.error(e.getMessage());
		}
	}
	
	/**
	 * 删除用户：更改为禁用用户
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = { "/delete" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message delete(String ids) {
		String[] idArr = null;
		try {
			idArr = ids.split(",");
			this.adminService.deleteAdmin(idArr);
		} catch (Exception e) {
			return Message.error(e.getMessage());
		}
		return Message.success("成功禁用 " + idArr.length + " 条记录");
	}

	/**
	 * 启用用户
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = { "/enable" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message enable(String ids) {
		String[] idArr = null;
		try {
			idArr = ids.split(",");
			this.adminService.enableAdmin(idArr);
		} catch (Exception e) {
			return Message.error(e.getMessage());
		}
		return Message.success("成功启用 " + idArr.length + " 条记录");
	}
	
	/**
	 * 分店选择页面
	 * @return
	 */
	@RequestMapping(value = {"/branchlist"}, method = {RequestMethod.GET})
	public String branchList() {
		return "admin/user/branch_list";
	}
}

