@echo off
 
SET YUIFOLDER=YuiCompressorDir\build
 
SET JSFOLDER=MyJsOrCssDir
 
echo looking JavaScript, CSS ...
 
chdir /d %JSFOLDER%
 
for /r . %%a in (*.js *.css) do (
 @echo compressing %%~a ...
 @java -jar %YUIFOLDER%\yuicompressor-2.4.2.jar --charset UTF-8 %%~fa -o %%~fa
)
 
echo finished!
 
pause & exit