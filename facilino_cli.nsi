; facilino.nsi
;
; This script is based on example2.nsi, but it remember the directory, 
; has uninstall support and (optionally) installs start menu shortcuts.
;
; It will install facilino.nsi into a directory that the user selects,

;--------------------------------

; The name of the installer
Name "Facilino"

; The file to write
OutFile "facilino_1_5_0_win64_arduino_cli.exe"

; The default installation directory
InstallDir "C:\Facilino"

; Registry key to check for directory (so if you install again, it will 
; overwrite the old one automatically)
InstallDirRegKey HKLM "Software\Facilino" "Install_Dir"

; Request application privileges for Windows Vista
RequestExecutionLevel admin

BrandingText "Robótica Fácil"

!include "MUI2.nsh"

!include "FileFunc.nsh"
!insertmacro Locate
!include "MoveFileFolder.nsh"

!define MUI_ICON "facilino.ico"
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_BITMAP "facilino.bmp" ; optional
!define MUI_HEADERIMAGE_RIGHT

;--------------------------------

Function .onInit
 StrCpy $INSTDIR "C:\Facilino"
 System::Call 'kernel32::CreateMutex(p 0, i 0, t "myMutex") p .r1 ?e'
 Pop $R0
 
 StrCmp $R0 0 +3
   MessageBox MB_OK|MB_ICONEXCLAMATION "The installer is already running."
   Abort
FunctionEnd

; The stuff to install
Section "Facilino (required)" Section1
  
  SectionIn RO
  
  ; Set output path to the installation directory.
  SetOutPath $INSTDIR
  ; Checks Vc++ redistribution package is installed
  ;ReadRegStr $1 HKLM "SOFTWARE\WOW6432Node\Microsoft\DevDiv\vc\Servicing\14.0\RuntimeMinimum" "Install"
  ReadRegStr $1 HKLM "SOFTWARE\WOW6432Node\Microsoft\VisualStudio\14.0\VC\Runtimes\x64" "Installed"
  StrCmp $1 1 VC_INSTALLED
  ;MessageBox MB_OK|MB_ICONINFORMATION "Visual C++ Redistributable package not detected. Please install or repair!" IDOK VC_INSTALL
  ExecWait '"$INSTDIR\vc_redist.x64.exe"'
  VC_INSTALLED:
  
  ;ReadRegStr $1 HKLM "SOFTWARE\WOW6432Node\Arduino" "Install_Dir"
  ;StrCmp $1 "" ARDUINO_NOT_INSTALLED
  ;Goto ARDUINO_INSTALLED
  ;ARDUINO_NOT_INSTALLED:
  ;MessageBox MB_OK|MB_ICONINFORMATION "You must have Arduino IDE installed in order to compile programs!" IDOK ARDUINO_DOWNLOAD
  ;ARDUINO_DOWNLOAD:
  ;NSISdl::download "https://downloads.sourceforge.net/project/facilino/Arduino/arduino-1.6.9-windows.exe?r=https%3A%2F%2Fsourceforge.net%2Fprojects%2Ffacilino%2Ffiles%2FArduino%2F%3Fupload_just_completed%3Dtrue&ts=1506154877&use_mirror=master" "$INSTDIR\arduino-1.6.9-windows.exe" 
  ;ExecWait '"$INSTDIR\arduino-1.6.9-windows.exe"'
  ;Delete "$INSTDIR\arduino-1.6.9-windows.exe"
  ;ARDUINO_INSTALLED:
  
  ; Put file there
  File /nonfatal /a /r "src\" #note back slash at the end
  
  ; Write the installation path into the registry
  WriteRegStr HKLM SOFTWARE\Facilino "Install_Dir" "$INSTDIR"
  
  ; Write the uninstall keys for Windows
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "DisplayName" "Facilino"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "NoRepair" 1
  ;WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Explorer\FileExt\.bly" "a" "facilino.exe"
  WriteUninstaller "uninstall.exe"
  
  ; Add an application to the firewall exception list - All Networks - All IP Version - Enabled
  ;SimpleFC::AdvAddRule "Facilino" "Facilino license check" 6 1 1 3 1 "$INSTDIR\facilino.exe" "" "" "Block Programming" "" "" "" ""
  ;SimpleFC::AdvAddRule "Facilino" "Facilino license check" 6 2 1 3 1 "$INSTDIR\facilino.exe" "" "" "Block Programming" "" "" "" ""
  ;SimpleFC::AddApplication "Facilino" "$INSTDIR\facilino.exe" 0 2 "" 1
  ;Pop $0 ; return error(1)/success(0)
  ExecWait 'netsh advfirewall firewall add rule name=Facilino dir=in action=allow program="$INSTDIR\facilino.exe" enable=yes profile=public,private'
  ExecWait 'netsh advfirewall firewall add rule name=Facilino dir=out action=allow program="$INSTDIR\facilino.exe" enable=yes profile=public,private'
  
SectionEnd

Section "Arduino CLI (required)" Section2
  SectionIn RO
  NSISdl::download "https://downloads.arduino.cc/arduino-cli/arduino-cli-latest-windows.zip" "$INSTDIR\arduino-cli.zip"
  nsisunz::UnzipToLog "$INSTDIR\arduino-cli.zip" "$INSTDIR"
  Delete "$INSTDIR\arduino-cli.zip"
  DetailPrint "Installing Arduino CLI Boards & Libraries"
  nsExec::ExecToStack  'cmd /C ""$INSTDIR\arduino-cli.exe"" config init'
   Pop $0 # return value/error/timeout
   Pop $1 # printed text, up to ${NSIS_MAX_STRLEN}
   Push "PATH: " ; divider str
   Push $1 ; input string
   Call GetLastPart
   Pop $R1 ; last part
   nsExec::ExecToLog 'cmd /C ""$INSTDIR\config.bat"" $INSTDIR $R1'
   
   
SectionEnd

;Section "Arduino CLI Libraries (required)" Section3
;   SectionIn RO
   
  ;!insertmacro MoveFolder "$INSTDIR\dependencies\HTTPSRedirect" "$DOCUMENTS\Arduino\libraries\HTTPSRedirect" "*.*"
  ;!insertmacro MoveFolder "$INSTDIR\dependencies\ITEADLIB_Arduino_WeeESP8266" "$DOCUMENTS\Arduino\libraries\ITEADLIB_Arduino_WeeESP8266" "*.*"
  ;!insertmacro MoveFolder "$INSTDIR\dependencies\LARS" "$DOCUMENTS\Arduino\libraries\LARS" "*.*"
  ;!insertmacro MoveFolder "$INSTDIR\dependencies\AsyncTCP" "$DOCUMENTS\Arduino\libraries\AsyncTCP" "*.*"
  ;!insertmacro MoveFolder "$INSTDIR\dependencies\ESPAsyncWebServer" "$DOCUMENTS\Arduino\libraries\ESPAsyncWebServer" "*.*"
  
  
  ;DetailPrint "Installing Arduino dependencies..."
  
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --pref boardsmanager.additional.urls=http://arduino.esp8266.com/stable/package_esp8266com_index.json,https://dl.espressif.com/dl/package_esp32_index.json --save-prefs'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-boards esp8266:esp8266 --save-pref'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-boards esp32:esp32 --save-pref'
  
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "Adafruit BMP085 Library:1.0.0""'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "Adafruit DMA neopixel library:1.0.3""'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "Adafruit GFX Library:1.2.9""'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "Adafruit NeoPixel:1.1.6""'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "Adafruit SSD1306:1.1.2""'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "Adafruit Unified Sensor:1.0.2""'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "Adafruit VEML6070:1.0.1""'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library ""ArduinoJson:5.13.5""'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library DallasTemperature:3.8.0'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library DHT sensor library:1.3.4'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library ESPUI:1.6.3'
  ;;NSISdl::download "https://github.com/electronicsguy/ESP8266/archive/master.zip" "$INSTDIR\HTTPSRedirect.zip"
  ;;nsisunz::UnzipToLog "$INSTDIR\HTTPSRedirect.zip" "$DOCUMENTS\Arduino\libraries"
  
  ;;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library HTTPSRedirect'
  ;;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library ITEADLIB_Arduino_WeeESP8266'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library LiquidCrystal:1.0.7'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library OneWire:2.3.4'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library PubSubClient:2.7.0'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library SPIFFSReadServer:0.0.4'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library SSD1306Ascii:1.2.3'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library WiFi:1.2.6'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library WiFi101:0.15.3'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library WiFiEsp:2.2.2'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "ESP32 BLE Arduino:1.0.1""'
  ;nsExec::Exec 'cmd /k ""C:\Program Files (x86)\Arduino\arduino_debug.exe" "--install-library" "ESP32Servo:0.4.2""'
  ;nsExec::Exec 'cmd /C ""C:\Program Files (x86)\Arduino\arduino_debug.exe"" --install-library DHT sensor library for ESPx:1.0.8'
  
;SectionEnd

; Optional section (can be disabled by the user)
Section "Start Menu & Desktop Shortcuts" Section3

  CreateDirectory "$SMPROGRAMS\Facilino"
  CreateShortcut "$SMPROGRAMS\Facilino\Uninstall.lnk" "$INSTDIR\uninstall.exe" "" "$INSTDIR\uninstall.exe" 0
  CreateShortcut "$SMPROGRAMS\Facilino\Facilino.lnk" "$INSTDIR\facilino.exe" "" "$INSTDIR\facilino.ico" 0
  CreateShortCut "$DESKTOP\Facilino.lnk" "$INSTDIR\facilino.exe" "" "$INSTDIR\facilino.ico" 0
  
SectionEnd

;--------------------------------

; Uninstaller

Section "Uninstall"
  
  ; Remove registry keys
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino"
  DeleteRegKey HKLM SOFTWARE\Facilino

  ; Remove files and uninstaller
  Delete "$INSTDIR\*.*"

  ; Remove shortcuts, if any
  Delete "$SMPROGRAMS\Facilino\*.*"
  Delete "$DESKTOP\Facilino.lnk"

  ; Remove directories used
  RMDir /r "$SMPROGRAMS\Facilino"
  RMDir /r "$INSTDIR"
  
  ; Remove an application from the firewall exception list
  ;SimpleFC::RemoveApplication "$INSTDIR\facilino.exe"
  ;Pop $0 ; return error(1)/success(0)
  ;SimpleFC::AdvRemoveRule "Facilino"
  ExecWait 'netsh advfirewall firewall delete rule name=Facilino'
SectionEnd


!define LANG_ENGLISH 1033

LangString DESC_Section1 ${LANG_ENGLISH} "Installs Facilino (mandatory)."
LangString DESC_Section2 ${LANG_ENGLISH} "Installs Arduino CLI (mandatory)"
;LangString DESC_Section3 ${LANG_ENGLISH} "Installs Arduino CLI libraries (mandatory)."
LangString DESC_Section3 ${LANG_ENGLISH} "Creates shortcuts."
; Pages

; Page components
; Page directory
; Page instfiles

!insertmacro MUI_PAGE_COMPONENTS
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
!insertmacro MUI_DESCRIPTION_TEXT ${Section1} $(DESC_Section1)
!insertmacro MUI_DESCRIPTION_TEXT ${Section2} $(DESC_Section2)
!insertmacro MUI_DESCRIPTION_TEXT ${Section3} $(DESC_Section3)
;!insertmacro MUI_DESCRIPTION_TEXT ${Section4} $(DESC_Section3)
!insertmacro MUI_FUNCTION_DESCRIPTION_END

; UninstPage uninstConfirm
; UninstPage instfiles
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"
;--------------------------------
!include x64.nsh

Function GetLastPart
Exch $R0 ; input
Exch
Exch $R1 ; divider str
Push $R2
Push $R3
Push $R4
Push $R5
 
 StrCpy $R2 -1
 StrLen $R4 $R0
 StrLen $R5 $R1
 Loop:
  IntOp $R2 $R2 + 1
  StrCpy $R3 $R0 $R5 $R2
  StrCmp $R3 $R1 Chop
  StrCmp $R2 $R4 0 Loop
   StrCpy $R0 ""
   StrCpy $R1 ""
   Goto Done
 Chop:
  StrCpy $R1 $R0 $R2
  IntOp $R2 $R2 + $R5
  StrCpy $R0 $R0 "" $R2
 Done:
 
Pop $R5
Pop $R4
Pop $R3
Pop $R2
Exch $R1 ; before
Exch
Exch $R0 ; after
FunctionEnd
