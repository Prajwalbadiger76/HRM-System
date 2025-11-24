@echo off
echo Running MongoDB Backup...

set DB_NAME=hrm_db
set BACKUP_DIR=..\backup\%date:~-4%-%date:~4,2%-%date:~7,2%

echo Backup directory: %BACKUP_DIR%

mkdir %BACKUP_DIR%

mongodump --db %DB_NAME% --out %BACKUP_DIR%

echo Backup Completed Successfully
