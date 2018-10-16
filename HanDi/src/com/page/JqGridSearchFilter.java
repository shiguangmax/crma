package com.page;

import java.io.Serializable;
import java.util.List;

/**
 * filters =
 * {"groupOp":"AND","rules":[{"field":"code","op":"eq","data":"123"}]}
 */
public class JqGridSearchFilter implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7323348311832294062L;

	public enum GroupOp {
		and,or;

		public static GroupOp fromString(String value) {
			return valueOf(value.toLowerCase());
		}
	}
	
	private String groupOp;
	
	private List<JqGridSearchRule> rules;
	
	private List<JqGridSearchFilter> groups;;

	public List<JqGridSearchFilter> getGroups() {
		return groups;
	}

	public void setGroups(List<JqGridSearchFilter> groups) {
		this.groups = groups;
	}

	public String getGroupOp() {
		return groupOp;
	}

	public void setGroupOp(String groupOp) {
		this.groupOp = groupOp;
	}

	public List<JqGridSearchRule> getRules() {
		return rules;
	}

	public void setRules(List<JqGridSearchRule> rules) {
		this.rules = rules;
	}
}