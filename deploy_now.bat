@echo off
echo.
echo ===================================================
echo   EdIntel Sovereign Deployment Launcher
echo ===================================================
echo.
echo Launching automated deployment script...
if not exist "%~dp0scripts\deploy-gcp.ps1" (
    echo Error: Script not found at %~dp0scripts\deploy-gcp.ps1
    pause
    exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0scripts\deploy-gcp.ps1'"
echo.
echo Deployment script finished.
pause
