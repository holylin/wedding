@echo off

SET YuiCompressorDir=%0
SET YuiCompressorDir=%YuiCompressorDir:~0,-13%"\..\..\tool\JavascriptCssCompress\yuicompressor\build

SET BusinessJsDir=%0
SET BusinessJsDir=%BusinessJsDir:~0,-13%"\..\..\src\main\webapp\pages
 
  
cd /d %BusinessJsDir%

echo del old AllBusinesses.js

del AllBusinesses.js

echo create new null AllBusinesses.js

type NUL>AllBusinesses.js

echo first compress common js

cd common

for /r . %%a in (*.js) do (
	@echo compressing %%~a ...
 	@java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 %%~fa -o ..\..\temp.js
 	@type ..\..\temp.js>>..\AllBusinesses.js
)

echo next compress business js
cd..
cd business

for /r . %%a in (*.js) do (
	@echo compressing %%~a ...
 	@java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 %%~fa -o ..\..\temp.js
 	@type ..\..\temp.js>>..\AllBusinesses.js
)

::echo last compress main.js
cd..
cd..
::@echo compressing main.js ...
::@java -jar %YuiCompressorDir%\yuicompressor-2.4.2.jar --charset UTF-8 main.js -o temp.js
::@type temp.js>>pages\AllBusinesses.js

echo del temp.js
 
del temp.js

echo finished!
 
pause & exit