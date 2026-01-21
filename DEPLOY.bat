@echo off
REM EdIntel Professional - Production Deployment
REM Quick deployment to Vercel Production

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                                                                  ║
echo ║        🚀 EdIntel Professional - Production Deployment          ║
echo ║                                                                  ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

echo 🎯 Deploying to: https://edintel-app.vercel.app
echo.

REM Check if PowerShell is available
where pwsh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Using PowerShell Core...
    pwsh -ExecutionPolicy Bypass -File "%~dp0scripts\deploy-production.ps1"
) else (
    where powershell >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Using Windows PowerShell...
        powershell -ExecutionPolicy Bypass -File "%~dp0scripts\deploy-production.ps1"
    ) else (
        echo ❌ PowerShell not found! Falling back to direct Vercel deployment...
        echo.
        echo 📦 Running production build...
        call npm run build
        if %ERRORLEVEL% NEQ 0 (
            echo ❌ Build failed!
            pause
            exit /b 1
        )
        echo.
        echo 🚀 Deploying to Vercel...
        call vercel --prod --yes
        if %ERRORLEVEL% EQU 0 (
            echo.
            echo ✅ Deployment successful!
            echo 🌐 Production URL: https://edintel-app.vercel.app
        ) else (
            echo ❌ Deployment failed!
        )
    )
)

echo.
pause
