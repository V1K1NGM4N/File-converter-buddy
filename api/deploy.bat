@echo off
echo 🚀 Deploying File Converter Buddy Backend...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Make sure you're in the api directory.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Check if ytdl-core is installed
call npm list ytdl-core >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: ytdl-core not installed. Please check your dependencies.
    pause
    exit /b 1
)

REM Start the server
echo 🌐 Starting server on port 3001...
echo 📡 API endpoints available at:
echo    - GET  http://localhost:3001/api/youtube/info?videoId={id}
echo    - POST http://localhost:3001/api/youtube/download
echo    - GET  http://localhost:3001/health
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
pause
