@echo off
SETLOCAL

REM ----- CONFIG -----
SET "BACKEND_DIR=.\backend"
SET "BACKEND_FILE=app\main.py"
SET "FRONTEND_DIR=.\electron"

REM ----- START BACKEND -----
echo [INFO] Starting Flask backend...
cd /d "%BACKEND_DIR%"
REM Lancer Flask en arrière-plan et récupérer le PID
start "" /B python "%BACKEND_FILE%"
REM pause pour que le serveur démarre
timeout /t 3 /nobreak >nul
cd /d "%~dp0"

REM ----- START ELECTRON -----
echo [INFO] Starting Electron frontend...
cd /d "%FRONTEND_DIR%"
npm run start
SET FRONTEND_EXIT=%ERRORLEVEL%
cd /d "%~dp0"

REM ----- STOP BACKEND -----
echo [INFO] Stopping backend...
REM On arrête tous les processus python en cours (option basique)
taskkill /F /IM python.exe >nul 2>&1

exit /B %FRONTEND_EXIT%
