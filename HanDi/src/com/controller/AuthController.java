package com.controller;

import java.util.ArrayList;
import java.util.Date;
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
import com.page.JqGridPage;
import com.page.JqGridPageable;
import com.page.JqGridSearchRule;
import com.service.IAuthService;

@Controller("authController")
@RequestMapping("/admin/auth")
public class AuthController extends BaseController {

	@Autowired
	private IAuthService authServiceImpl;

	/**
	 * 跳转到权限管理列表页
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/authlist" }, method = { RequestMethod.GET })
	public String authlist() {
		return "auth/auth_list";
	}

	/**
	 * 权限列表数据
	 * 
	 * @param pageable
	 * @return
	 */
	@RequestMapping(value = { "/authlistjson" })
	@ResponseBody
	public Map<String, Object> authlistjson(JqGridPageable pageable, String types, Boolean isEnabled) {
		/*
		 * 处理过滤条件
		 */
		List<JqGridSearchRule> rules = new ArrayList<>();
		if (types != null && types.length() != 0) {

			JqGridSearchRule rule = new JqGridSearchRule();
			Set<String> inDatas = new HashSet<>();
			String[] arr = types.split(",");
			for (int i = 0; i < arr.length; i++) {
				if (!arr[i].isEmpty()) {
					inDatas.add(arr[i]);
				}
			}
			rule.setField("type");
			rule.setOp("in");
			rule.setInDatas(inDatas);
			rules.add(rule);
		}
		if (isEnabled != null) {
			JqGridSearchRule rule = new JqGridSearchRule();
			rule.setField("isEnabled");
			rule.setData(isEnabled.booleanValue() ? "1" : "0");
			rules.add(rule);
		}
		pageable.setRules(rules);
		JqGridPage<Authority> authPage = this.authServiceImpl.authPage(pageable);
		if (authPage == null) {
			authPage = new JqGridPage<Authority>();
		}
		return authPage.toMap();
	}

	/**
	 * 添加权限弹框
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/add" }, method = { RequestMethod.GET })
	public String add(ModelMap map, Long id) {
		if (id != null) {
			Authority auth = this.authServiceImpl.loadById(id);
			if (auth != null) {
				map.addAttribute("auth", auth);
			}
		}
		return "auth/auth_add";
	}

	/**
	 * 保存权限
	 * 
	 * @param auth
	 * @param bindingResult
	 * @return
	 */
	@RequestMapping(value = { "/save" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message save(@Valid Authority auth, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			// 参数验证错误
			return Message.error("请检查 * 标注的必填项");
		}
		auth.setCreateTime(new Date());
		auth.setModifyTime(new Date());
		Integer result = this.authServiceImpl.add(auth);
		if (result > 0) {
			return Message.success("保存成功");
		} else {
			return Message.error("保存失败！");
		}
	}

	/**
	 * 更新权限
	 * 
	 * @param auth
	 * @param bindingResult
	 * @param oldsn
	 * @return
	 */
	@RequestMapping(value = { "/update" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message update(@Valid Authority auth, BindingResult bindingResult, String oldsn) {
		if (bindingResult.hasErrors()) {
			// 参数验证错误
			return Message.error("请检查 * 标注的必填项");
		}
		try {
			auth.setModifyTime(new Date());
			this.authServiceImpl.update(auth);
			return Message.success("更新成功");
		} catch (Exception e) {
			e.printStackTrace();
			return Message.error("更新失败");
		}
	}

	/**
	 * 删除权限
	 * 
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = { "/delete" }, method = { RequestMethod.POST })
	@ResponseBody
	public Message delete(String ids) {
		String[] idArr = null;
		try {
			idArr = ids.split(",");
			// 删除之前先判断权限是否已经与某个角色关联（t_role_auth中是否有该auhtId的记录），如果有关联项则不能删除
			for (int i = 0; i < idArr.length; ++i) {
				if (!idArr[i].isEmpty()) {
					List<Long> roleIdList = this.authServiceImpl.getAuthAssocRoleId(new Long(idArr[i]));
					if (roleIdList.size() != 0) {
						return Message.error("删除失败，权限已关联角色");
					}
				}
			}
			this.authServiceImpl.batchDelete(idArr);
		} catch (Exception e) {
		}
		return Message.success("成功删除 " + idArr.length + " 条记录");
	}
}

