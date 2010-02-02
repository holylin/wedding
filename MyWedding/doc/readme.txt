1.开发指南
安装mysql5.0或以上版本，用户名为root、密码为a6023，如果mysql不是安装在本地，则需要修改配置中localhost为mysql所在的ip地址。
新建一个数据库，并用ctrl+H将系统中所有yourDatabase都替换成新建的数据库名。
新建一个表，必须要有两个字段，一个id字段（int类型主键、且自增），另一个remark字段（text类型，可为null）。
把AgileExtSpringMVCSpringHibernate重构改名成实际项目名。
对CodeGeneratorAgent运行Run Configurations 在Arguments里写上两个参数，第一个参数是所在包特定名（比如用户表，则所在包特定名为right，当然可依实际情况自己定义），第二个参数是表对应的Pojo名（比如用户表，则为Operator）。
刷新工程文件，在tomcat里启动项目，即可以看到此Pojo的简单增、删、查、改功能。(注意，如果启动出错，可以依照tomcat的部署路径修改并运行deployConfigToServer.bat，把resources下的配置文件重新部署到tomcat下，再启动tomcat试试)。
其它表开发类同。