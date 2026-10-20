@echo off
title NexoSQL - Servidor Local
cd /d "%~dp0"

:: Verificar si el servidor ya esta activo en el puerto 3000
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo El servidor ya esta activo en http://localhost:3000
    echo Abriendo NexoSQL en tu navegador...
    start http://localhost:3000
    timeout /t 2 >nul
    exit /b
)

echo ========================================================
echo          Iniciando Plataforma NexoSQL...
echo ========================================================
echo.
echo  El navegador se abrira automaticamente en unos segundos.
echo  Para detener el servidor cuando termines, cierra esta ventana.
echo.
npm run dev
pause
