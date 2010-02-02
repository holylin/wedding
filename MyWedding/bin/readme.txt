1.自动压缩系统所需js文件的说明
1）先把新增或者修改的旧js文件的引用放到managerPage.jsp里，进行功能测试。
2）等测试成功后，运行compressBusinessJs.bat或compressExtAndToolJs.bat。
3）运行完，删去1）里放入的临时引用，刷新eclipse，然后进行重新测试。
注意：1）执行需时较长，建议在中午及晚上吃饭前运行；2）最后一定要再测试下，看是否存在js文件顺序依赖的问题。
2.自动部署配置文件说明（由于eclipse的server插件有时会出现不会自动部署xml和properties配置文件的问题）
1）用文本编辑器打开“deployConfigToServer.bat”修改其中的ServerConfigFileParentDir（配置文件被部署到tomcat里的临时目录），并保存。
2）直接运行deployConfigToServer.bat即可。