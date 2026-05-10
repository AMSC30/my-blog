@echo off
chcp 65001 >nul 2>&1
echo Fixing image paths from "images/" to "./images/"...
echo.
python "%~dp0fix_image_paths.py"
if errorlevel 1 (
    echo.
    echo Python execution failed.
)
echo.
pause
