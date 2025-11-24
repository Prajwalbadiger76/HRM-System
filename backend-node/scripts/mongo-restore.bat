@echo off
echo Restoring MongoDB Backup...

set DB_NAME=hrm_db

if "%1"=="" (
    echo ERROR: Please provide backup folder path. Example:
    echo mongo-restore.bat "C:\path\to\backup\2025-11-20"
    pause
    exit /b
)

mongorestore --drop --db %DB_NAME% "%1\%DB_NAME%"

echo Restore Completed Successfully!
pause
