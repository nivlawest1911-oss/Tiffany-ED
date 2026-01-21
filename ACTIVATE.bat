@echo off
REM EdIntel Professional - Quick Activation
REM Double-click this file to start activation

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                                                          ║
echo ║     🚀 EdIntel Professional - Quick Activation          ║
echo ║                                                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM Check if PowerShell is available
where pwsh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using PowerShell Core...
    pwsh -ExecutionPolicy Bypass -File "%~dp0scripts\activate-edintel.ps1"
) else (
    where powershell >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Using Windows PowerShell...
        powershell -ExecutionPolicy Bypass -File "%~dp0scripts\activate-edintel.ps1"
    ) else (
        echo ❌ PowerShell not found!
        echo Please install PowerShell to use this script.
        pause
        exit /b 1
    )
)

pause
