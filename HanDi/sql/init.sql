create database if not exists `handi`;

USE `handi`;

/*Table handi for 系统用户表 `t_admin` */
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `modifyTime` datetime NOT NULL COMMENT '修改时间',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `username` varchar(200) NOT NULL COMMENT '用户名',
  `password` varchar(200) NOT NULL COMMENT '密码',
  `salt` varchar(100) NOT NULL COMMENT '盐',
  `nickname` varchar(200) NOT NULL COMMENT '昵称',
  `isSuper` bit(7) NOT NULL DEFAULT b'110000' COMMENT '是否为超级管理员',
  `isEnabled` bit(7) NOT NULL DEFAULT b'110001' COMMENT '是否启用',
  `isLocked` bit(7) NOT NULL DEFAULT b'110001' COMMENT '是否锁定',
  `loginFailureCount` int(7) NOT NULL DEFAULT '0' COMMENT '登录失败次数',
  `lockedDate` datetime DEFAULT NULL COMMENT '锁定时间',
  `loginDate` datetime DEFAULT NULL COMMENT '最后一次登录时间',
  `loginIp` varchar(200) DEFAULT NULL COMMENT '登录ip',
  `email` varchar(300) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`),
  KEY `idx_username` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table handi for 账号-角色对应表 `t_admin_role` */
DROP TABLE IF EXISTS `t_admin_role`;
CREATE TABLE `t_admin_role` (
  `userId` bigint(20) NOT NULL,
  `roleId` bigint(20) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table handi for 系统权限表 table `t_auth` */
DROP TABLE IF EXISTS `t_auth`;
CREATE TABLE `t_auth` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `modifyTime` datetime NOT NULL,
  `createTime` datetime NOT NULL,
  `type` varchar(200) NOT NULL,
  `name` varchar(100) NOT NULL,
  `codeName` varchar(200) NOT NULL,
  `url` text,
  `isEnabled` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table handi for 系统角色表 `t_role` */
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `modifyTime` datetime NOT NULL,
  `createTime` datetime NOT NULL,
  `name` varchar(200) NOT NULL,
  `sn` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_sn` (`sn`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table handi for 角色-权限对应表 `t_role_auth` */
DROP TABLE IF EXISTS `t_role_auth`;
CREATE TABLE `t_role_auth` (
  `roleId` bigint(20) NOT NULL,
  `authId` bigint(20) NOT NULL,
  PRIMARY KEY (`roleId`,`authId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into `t_admin` (`id`, `modifyTime`, `createTime`, `username`, `password`, `salt`, `nickname`, `isSuper`, `isEnabled`, `isLocked`, `loginFailureCount`, `lockedDate`, `loginDate`, `loginIp`, `email`) VALUES ('1',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP, 'admin', '1d3f99fb3fb2301930d4d441ca91f62a', '72ad34', '管理员', '', '', '\0', '0', NULL, '2017-03-20 10:03:20', NULL, 'admin@hzjztech.com');

/*Data for the table `t_role` */
insert  into `t_role`(`id`,`modifyTime`,`createTime`,`name`,`sn`) values 
(1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'超级管理员','0001');


insert  into `t_admin_role`(`userId`,`roleId`) values (1,1);

insert  into `t_auth`(`id`,`modifyTime`,`createTime`,`type`,`name`,`codeName`,`url`,`isEnabled`) values 
(1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'MENU','用户管理','admin:system:user','/admin/user/userlist.do',''),
(2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'MENU','权限管理','admin:system:auth','/admin/auth/authlist.do',''),
(3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'MENU','角色管理','admin:system:role','/admin/role/rolelist.do','');

/*Data for the table `t_role_auth` */
insert into `t_role_auth`(`roleId`,`authId`) values (1,1),(1,2),(1,3);
