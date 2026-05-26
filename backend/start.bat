@echo off
title Tata Colours API Server
echo.
echo  ============================================================
echo   Tata Colours Procurement Portal — Backend Server Launcher
echo  ============================================================
echo.

REM Check if Node.js is available
node --version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo  [OK] Node.js detected — checking for dependencies...
    if not exist "%~dp0node_modules" (
        echo  Installing dependencies from package.json...
        cd /d "%~dp0"
        npm install
    )
    echo  Starting Express server on port 3001...
    echo.
    node "%~dp0server.js"
    goto :done
)

echo  [ERROR] Node.js was not found in PATH.
echo.
echo  Please install Node.js to run this server:
echo    Node.js (Recommended) ->  https://nodejs.org/
echo.
pause

:done
