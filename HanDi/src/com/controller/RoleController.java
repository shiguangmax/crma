package com.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.common.Message;
import com.entity.Authority;
import com.entity.Role;
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.page.JqGridSearchRule;
import com.service.IRoleService;

@Controller("roleController")
@RequestMapping("/admin/role")
public class RoleController extends BaseController {
	
	@Autowired
	private IRoleService roleService;
	
	/**
	 * 跳转到角色管理列表页
	 * @return
	 */
	@RequestMapping(value = { "/rolelist" }, method = { RequestMethod.GET })
	public String rolelist() {
		return "role/role_list";
	}
	
	/**
	 * 角色列表数据
	 * @param pageable
	 * @return
	 */
	@RequestMapping(value = { "/rolelistjson" })
	@ResponseBody
	public Map<String, Object> rolelistjson(JqGridPageable pageable) {
		JqGridPage<Role> rolePage = this.roleService.rolePage(pageable);
		if (rolePage == null) {
			rolePage = new JqGridPage<Role>();
		}
		return rolePage.toMap();
	}
	
	/**
	 * 添加角色弹框
	 * @return
	 */
	@RequestMapping(value = { "/add" }, method = { RequestMethod.GET })
	public String add(ModelMap map, Long id) {
		if (id != null) {
			Role role = this.roleService.loadById(id);
			if (role != null) {
				map.addAttribute("role", role);
			}
		}
		return "role/role_add";
	}
	
	/**
	 * 保存角色
	 * @param role
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = { "/save" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message save(@Valid Role role, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			// 参数验证错误
			return Message.error("请检查 * 标注的必填项");
		}
		if (this.roleService.snExist(role.getSn())) {
			return Message.error("该编号已存在");
		}
		Integer result = this.roleService.addRole(role);
		if (result > 0) {
			return Message.success("保存成功");
		} else {
			return Message.error("保存失败！");
		}
	}
	
	/**
	 * 更新角色
	 * @param role
	 * @param bindingResult
	 * @param code
	 * @return
	 */
	@RequestMapping(value = { "/update" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message update(@Valid Role role, BindingResult bindingResult, String oldsn) {
		if (bindingResult.hasErrors()) {
			// 参数验证错误
			return Message.error("请检查 * 标注的必填项");
		}
		try {
			if (!oldsn.equals(role.getSn()) && this.roleService.snExist(role.getSn())) {
				return Message.error("该编号已存在");
			}
			role.setModifyTime(new Date());
			this.roleService.update(role);
			return Message.success("更新成功");
		} catch (Exception e) {
			e.printStackTrace();
			return Message.error("更新失败");
		}
	}
	
	/**
	 * 删除角色
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = { "/delete" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message delete(String ids) {
		String[] idArr = null;
		try {
			idArr = ids.split(",");
			for (int i = 0; i < idArr.length; ++i) {
				if (!idArr[i].isEmpty()) {
					List<Long> userIdList = this.roleService.getRoleAssocUserId(new Long(idArr[i]));		// 用于判断角色是否已经关联了用户
					if (userIdList.size() != 0) {
						return Message.error("删除失败，角色已关联用户");
					}
				}
			}
			// 删除角色关联的权限的记录
			for (int i = 0; i < idArr.length; ++i) {
				Map<String, Object> parms = new HashMap<>();
				if (!idArr[i].isEmpty()) {
					parms.put("roleId", idArr[i]);
					this.roleService.delRoleOfAuth(parms);
				}
			}
			this.roleService.batchDelete(idArr);
		} catch (Exception e) {
		}
		return Message.success("成功删除 " + idArr.length + " 条记录");
	}
	
	/**
	 * 编辑角色权限弹框
	 * @return
	 */
	@RequestMapping(value = { "/editRoleOfAuth" }, method = { RequestMethod.GET })
	public String editRoleOfAuth(ModelMap map, Long id) {
		if (id != null) {
			map.addAttribute("roleId", id);
		}
		return "role/role_auth_edit";
	}

	/**
	 * 角色已拥有的权限列表数据
	 * @param roleId 角色id
	 * @return
	 */
	@RequestMapping(value = { "/rolehadauthlistjson" }, method = { RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> roleHadAuthListJson(JqGridPageable pageable, Long roleId) {
		if (roleId != null) {
			JqGridSearchRule rule = new JqGridSearchRule();
			rule.setField("r.id");
			rule.setOp("eq");
			rule.setData(roleId.toString());
			pageable.addRule(rule);
		}
		JqGridPage<Authority> authPage = this.roleService.findPageRoleHadAuth(pageable);
		if (authPage == null) {
			authPage = new JqGridPage<Authority>();
		}
		return authPage.toMap();
	}
	
	/**
	 * 角色未拥有的权限列表数据
	 * @param roleId 角色id
	 * @return
	 */
	@RequestMapping(value = { "/rolenohadauthlistjson" }, method = { RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> roleNoHadAuthListJson(JqGridPageable pageable, Long roleId) {
		if (roleId != null) {
			Set<String> inDatas = new HashSet<>();
			JqGridPageable rolePageable = new JqGridPageable();
			JqGridSearchRule roleRule = new JqGridSearchRule();
			roleRule.setField("r.id");
			roleRule.setOp("eq");
			roleRule.setData(roleId.toString());
			rolePageable.addRule(roleRule);
			List<Authority> authorities = this.roleService.getRoleHadAuth(rolePageable);		// 得到该角色所有拥有的权限
			for (Authority auth: authorities) {
				inDatas.add(auth.getId().toString());		// 将权限id放入
			}
			if (inDatas.size() != 0) {
				JqGridSearchRule rule = new JqGridSearchRule();
				rule.setField("id");
				rule.setOp("ni");
				rule.setInDatas(inDatas);
				pageable.addRule(rule);
			}
		}
		JqGridPage<Authority> authPage = this.roleService.findPageRoleNoHadAuth(pageable);
		if (authPage == null) {
			authPage = new JqGridPage<Authority>();
		}
		return authPage.toMap();
	}
	
	/**
	 * 添加角色的权限
	 * @param ids
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/addroleofauth", method = {RequestMethod.POST})
	@ResponseBody
	public Message addRoleOfAuth(String ids, Long roleId) {
		Map<String, Long> parms = new HashMap<>();
		parms.put("roleId", roleId);
		
		String[] array = ids.split(",");
		
		for (int i = 0; i < array.length; ++i) {
			if (array[i] != null && !array[i].isEmpty()) {
				parms.put("authId", new Long(array[i]));
			}
			try {
				this.roleService.addRoleOfAuth(parms);
			} catch (Exception e) {
				return Message.success("添加失败");
			}
		}
		return Message.success("成功添加 " + array.length + " 条权限");
	}
	
	/**
	 * 删除角色的权限
	 * @param ids
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/delroleofauth", method = {RequestMethod.POST})
	@ResponseBody
	public Message delRoleOfAuth(String ids, Long roleId) {
		Map<String, Object> parms = new HashMap<>();
		parms.put("roleId", roleId);
		String[] array = ids.split(",");
		if (array.length != 0) {
			parms.put("authId", array);
			try {
				this.roleService.delRoleOfAuth(parms);
			} catch (Exception e) {
				return Message.success("删除失败");
			}
		}
		return Message.success("成功删除 " + array.length + " 条权限");
	}

}
