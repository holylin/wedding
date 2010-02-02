@echo off

SET YuiCompressorDir=%0
SET YuiCompressorDir=%YuiCompressorDir:~0,-13%"\..\..\tool\JavascriptCssCompress\yuicompressor\build

SET ExtJsDir=%0
SET ExtJsDir=%ExtJsDir:~0,-13%"\..\..\src\main\webapp\js\ext\
 
  
cd /d %ExtJsDir%

echo del old AllExtAndTools.js

del AllExtAndTools.js

echo create new null AllExtAndTools.js

type NUL>AllExtAndTools.js

echo first compress ext-base.js  ext-all.js and ext-lang-zh_CN.js
@echo compressing ext-base.js
@java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 %ExtJsDir%\ext2\ext-base-2.3.0.js -o temp.js
@type temp.js>>AllExtAndTools.js
@echo compressing ext-all.js
@java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 %ExtJsDir%\ext2\ext-all-2.3.0.js -o temp.js
@type temp.js>>AllExtAndTools.js
@echo compressing ext-lang-zh_CN.js
@java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 %ExtJsDir%\ext2\ext-lang-zh_CN.js -o temp.js
@type temp.js>>AllExtAndTools.js

cd  %ExtJsDir%\ext2\extend

echo next compress ext official extend js
  
for /r . %%a in (*.js) do (
 @echo compressing %%~a ...
 @java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 %%~fa -o %ExtJsDir%\temp.js
 @type %ExtJsDir%\temp.js>>%ExtJsDir%\AllExtAndTools.js
)

cd  %ExtJsDir%\ext2tool

echo last compress ext third party extend js
  
for /r . %%a in (*.js) do (
 @echo compressing %%~a ...
 @java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 %%~fa -o %ExtJsDir%\temp.js
 @type %ExtJsDir%\temp.js>>%ExtJsDir%\AllExtAndTools.js
)

echo del temp.js
 
del %ExtJsDir%\temp.js
 
echo finished!
 
pause & exit