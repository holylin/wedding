@echo off

SET ConfigFileParentDir=%0
SET ConfigFileParentDir=%ConfigFileParentDir:~0,-13%"\..\..\src\main\resources

::改成自己tomcat部署的路径 
SET ServerConfigFileParentDir=D:\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp9\wtpwebapps\MyWedding\WEB-INF\classes

  
cd /d %ConfigFileParentDir%

for /d  %%a in (*) do (
	@echo del %ServerConfigFileParentDir%\%%a
	@del /Q %ServerConfigFileParentDir%\%%a
	@echo copy %%a
	@copy %ConfigFileParentDir%\%%a %ServerConfigFileParentDir%\%%a
)

copy %ConfigFileParentDir%\ehcache.xml %ServerConfigFileParentDir%\
copy %ConfigFileParentDir%\logback.xml %ServerConfigFileParentDir%\

echo finished!
 
pause & exit