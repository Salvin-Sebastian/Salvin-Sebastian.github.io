@echo off
echo ===================================================
echo Setting up Digital Image Processing Environment...
echo ===================================================

python --version
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH. Please install Python.
    pause
    exit /b 1
)

echo.
echo Installing required packages from requirements.txt...
python -m pip install -r requirements.txt

echo.
echo Verifying installation...
python -c "import cv2, numpy, matplotlib; print('[SUCCESS] DIP Environment Ready! OpenCV:', cv2.__version__, '| NumPy:', numpy.__version__, '| Matplotlib:', matplotlib.__version__)"

echo.
echo ===================================================
echo Setup complete! You can now run any of the 25 DIP programs:
echo Example: python image_loading_grayscale.py
echo ===================================================
pause
