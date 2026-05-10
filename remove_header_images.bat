@echo off
chcp 65001 >nul 2>&1
echo Removing all "标头.jpg" image references...
echo.
python "%~dp0remove_header_images.py"
if errorlevel 1 (
    echo.
    echo Python execution failed.
)
echo.
pause
