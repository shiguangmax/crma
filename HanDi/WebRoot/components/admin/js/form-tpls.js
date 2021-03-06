var form_tpls = {
	schooltpl : function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{sId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">名称</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">学校类别</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{schoolTypeId}'
										+ '{schoolTypeName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectSchoolTypeBtn" onclick="selectSchoolType(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">所属教育局</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{departmentId}'
										+ '{departmentName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectDepartmentBtn" onclick="selectDepart(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">最大年级</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{gradeId}'
										+ '{gradeName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectGradeBtn" onclick="selectGrade(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
	classtpl : function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{cId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">名称</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">学校</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{schoolId}'
										+ '{schoolName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectSchoolBtn" onclick="selectSchool(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">年级</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{gradeId}'
										+ '{gradeName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectGradeBtn" onclick="selectGrade(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">入学时间</label>'
								+ '<div class="col-sm-9">{startDate}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
	teachertpl : function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{tId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">姓名</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">学校</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{schoolId}'
										+ '{schoolName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectSchoolBtn" onclick="selectSchool(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
	gradetpl : function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{gId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">名称</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">上一年级</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{prevGradeId}'
										+ '{prevGradeName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectPrevGradeBtn" onclick="selectGrade(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
	studentmgr : function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{sId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">姓名</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">性别</label>'
								+ '<div class="col-sm-9">{gender}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">年龄</label>'
								+ '<div class="col-sm-9">{age}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">生日</label>'
								+ '<div class="col-sm-9">{birthday}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">班级</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{classId}'
										+ '{className}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectClassBtn" onclick="selectClass(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
	knowledgepoint:function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{kId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">名称</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">科目</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{subjectId}'
										+ '{subjectName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectSubjectBtn" onclick="selectSubject(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">年级</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{gradeId}'
										+ '{gradeName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectGradeBtn" onclick="selectGrade(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
	exampapertpl : function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{eId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">名称</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">科目</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{subjectId}'
										+ '{subjectName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectSubjectBtn" onclick="selectSubject(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">年级</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{gradeId}'
										+ '{gradeName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectGradeBtn" onclick="selectGrade(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">总分</label>'
								+ '<div class="col-sm-9">{score}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
	questiontpl : function(editType) {
		if(editType == null || editType == undefined) {
			editType = "add";
		}
		var template = '<div class="form-horizontal m-t-md" style="text-align:left;">'
							+ '<input type="hidden" id="opertype" value="' + editType + '" />'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">编号</label>'
								+ '<div class="col-sm-9">{qId}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">名称</label>'
								+ '<div class="col-sm-9">{name}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">详情</label>'
								+ '<div class="col-sm-9">{detail}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">题目类型</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{typeId}'
										+ '{typeName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectQuestionTypeBtn" onclick="selectQuestionType(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">题目等级</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{levelId}'
										+ '{levelName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectQuestionLevelBtn" onclick="selectQuestionLevel(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">模块</label>'
								+ '<div class="col-sm-9">'
									+ '<div class="input-group">'
										+ '{knowledgePointId}'
										+ '{knowledgePointName}'
										+ '<div class="input-group-btn">'
											+ '<button id="selectKnowledgePointBtn" onclick="selectKnowledgePoint(\'' + editType + '\')" class="btn btn-white m-b-xs" type="button">'
												+'<i class="fa fa-ellipsis-h"></i>'
											+ '</button>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">分值</label>'
								+ '<div class="col-sm-9">{score}</div>'
							+ '</div>'
							+ '<div class="form-group m-n-l m-n-r">'
								+ '<label class="col-sm-3">备注</label>'
								+ '<div class="col-sm-9">{memo}</div>'
							+ '</div>'
						+'</div>'
						+ '<div class="hr-line-dashed"></div>'
						+ '<div>{pData} {nData} <div class="pull-right">{sData} {cData}</div></div>';
		return template;
	},
}
