@echo off
chcp 65001 >nul 2>&1
echo Starting Python image download script...
echo.
python "%~dp0download_images.py"
if errorlevel 1 (
    echo.
    echo Python execution failed. Make sure Python is installed and requests library is available.
    echo Install requests: pip install requests
)
echo.
pause
