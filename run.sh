#!/bin/bash

# ----- CONFIG -----
BACKEND_DIR="./backend"
BACKEND_FILE="app/main.py"
FRONTEND_DIR="./electron"

# ----- START BACKEND -----
echo "[INFO] Starting Flask backend..."
cd "$BACKEND_DIR" || exit
python3 "$BACKEND_FILE" &
BACKEND_PID=$!
cd - >/dev/null

# Petit délai pour que le serveur démarre
sleep 3

# ----- START ELECTRON -----
echo "[INFO] Starting Electron frontend..."
cd "$FRONTEND_DIR" || exit
npm run start
FRONTEND_EXIT=$?
cd - >/dev/null

# ----- STOP BACKEND -----
echo "[INFO] Stopping backend (PID: $BACKEND_PID)..."
kill $BACKEND_PID

exit $FRONTEND_EXIT
