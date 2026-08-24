@echo off
title Servidor Pagina SQL
echo Iniciando el servidor local de la pagina SQL...
cd /d "%~dp0"
npm run dev
pause
