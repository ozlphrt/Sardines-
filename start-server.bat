@echo off
echo Starting Sardines Simulation Server...
echo.
echo The simulation will be available at:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
cd dist
python -m http.server 8000
pause
