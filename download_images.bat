@echo off
chcp 65001 >nul 2>&1
echo Starting image download script...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0download_images.ps1"
echo.
pause
