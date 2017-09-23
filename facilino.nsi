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
OutFile "Facilino.exe"

; The default installation directory
InstallDir $PROGRAMFILES\Facilino

; Registry key to check for directory (so if you install again, it will 
; overwrite the old one automatically)
InstallDirRegKey HKLM "Software\Facilino" "Install_Dir"

; Request application privileges for Windows Vista
RequestExecutionLevel admin

;--------------------------------

; Pages

Page components
Page directory
Page instfiles

UninstPage uninstConfirm
UninstPage instfiles

;--------------------------------

; The stuff to install
Section "Facilino (required)"

  SectionIn RO
  
  ; Set output path to the installation directory.
  SetOutPath $INSTDIR
  
  ; Put file there
  File "facilino.nsi"
  
  ; Write the installation path into the registry
  WriteRegStr HKLM SOFTWARE\Facilino "Install_Dir" "$INSTDIR"
  
  ; Write the uninstall keys for Windows
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "DisplayName" "Facilino"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino" "NoRepair" 1
  WriteUninstaller "uninstall.exe"
  
SectionEnd

; Optional section (can be disabled by the user)
Section "Start Menu Shortcuts"

  CreateDirectory "$SMPROGRAMS\Facilino"
  CreateShortcut "$SMPROGRAMS\Facilino\Uninstall.lnk" "$INSTDIR\uninstall.exe" "" "$INSTDIR\uninstall.exe" 0
  CreateShortcut "$SMPROGRAMS\Facilino\Facilino (MakeNSISW).lnk" "$INSTDIR\facilino.nsi" "" "$INSTDIR\facilino.nsi" 0
  
SectionEnd

;--------------------------------

; Uninstaller

Section "Uninstall"
  
  ; Remove registry keys
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Facilino"
  DeleteRegKey HKLM SOFTWARE\Facilino

  ; Remove files and uninstaller
  Delete $INSTDIR\facilino.nsi
  Delete $INSTDIR\uninstall.exe

  ; Remove shortcuts, if any
  Delete "$SMPROGRAMS\Facilino\*.*"

  ; Remove directories used
  RMDir "$SMPROGRAMS\Facilino"
  RMDir "$INSTDIR"

SectionEnd
