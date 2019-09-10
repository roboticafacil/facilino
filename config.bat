@echo off
:cd /d %1
set arduino-cli-cmd=%1\arduino-cli.exe
cmd /C %arduino-cli-cmd% config init
setlocal enableextensions disabledelayedexpansion
FOR %%i IN ("%2") DO (
set filepath=%%~pi
)
:echo %result%
set search={}
set replace=`r`n    additional_urls:`r`n`    - http://arduino.esp8266.com/stable/package_esp8266com_index.json`r`n`    - https://dl.espressif.com/dl/package_esp32_index.json
set textFile=%2

:PowerShell
SET PSScript=%temp%\~tmpStrRplc.ps1
ECHO (Get-Content "%textFile%").replace("%search%", "%replace%") ^| Set-Content "%textFile%">"%PSScript%"

SET PowerShellDir=C:\Windows\System32\WindowsPowerShell\v1.0
CD /D "%PowerShellDir%"
Powershell -ExecutionPolicy Bypass -Command "& '%PSScript%'"

cmd /C %arduino-cli-cmd% core update-index
cmd /C %arduino-cli-cmd% core install arduino:avr
cmd /C %arduino-cli-cmd% core install arduino:megaavr
cmd /C %arduino-cli-cmd% core install esp8266:esp8266
cmd /C %arduino-cli-cmd% core install esp32:esp32

CD /D "%filepath%\packages\esp32\hardware\esp32"
for /R %%f in (platform.txt) do if exist "%%f" (set textFile=%%f) 
set search=0x8000
set replace=`r`n#0x8000
echo %textFile%
:set textFile=%2\packages\esp32\hardware\esp32\1.0.2\platform.txt
SET PSScript=%temp%\~tmpStrRplc.ps1
ECHO (Get-Content "%textFile%").replace("%search%", "%replace%") ^| Set-Content "%textFile%">"%PSScript%"
SET PowerShellDir=C:\Windows\System32\WindowsPowerShell\v1.0
CD /D "%PowerShellDir%"
Powershell -ExecutionPolicy Bypass -Command "& '%PSScript%'"
