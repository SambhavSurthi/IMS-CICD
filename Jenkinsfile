pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('Frontend/imsfrontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ims-frontend" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ims-frontend"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ims-frontend"
                xcopy /E /I /Y "Frontend\\imsfrontend\\dist\\*" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\ims-frontend"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('Backend/IMSBackend') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                echo "Starting backend deployment..."
                set WAR_SOURCE_DIR="Backend\\IMSBackend\\target"
                
                echo "Looking for WAR file in %WAR_SOURCE_DIR%..."
                
                rem Find the specific WAR file and store its name
                for /f "delims=" %%i in ('dir /b /a-d "%WAR_SOURCE_DIR%\\*.war"') do (
                    set "WAR_FILE_NAME=%%i"
                )
                
                if defined WAR_FILE_NAME (
                    echo "Found WAR file: %WAR_FILE_NAME%"
                    set WAR_SOURCE_PATH="%WAR_SOURCE_DIR%\\%WAR_FILE_NAME%"
                    set TOMCAT_WEBAPPS="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"
                    
                    echo "Deleting old deployment..."
                    rem Delete the old WAR file
                    if exist "%TOMCAT_WEBAPPS%\\%WAR_FILE_NAME%" (
                        del /Q "%TOMCAT_WEBAPPS%\\%WAR_FILE_NAME%"
                    )
                    
                    rem Delete the old exploded folder (Tomcat auto-deploys)
                    set FOLDER_TO_DELETE=%WAR_FILE_NAME:.war=%
                    if exist "%TOMCAT_WEBAPPS%\\%FOLDER_TO_DELETE%" (
                        rmdir /S /Q "%TOMCAT_WEBAPPS%\\%FOLDER_TO_DELETE%"
                    )

                    echo "Copying new WAR file from %WAR_SOURCE_PATH% to %TOMCAT_WEBAPPS%..."
                    copy "%WAR_SOURCE_PATH%" "%TOMCAT_WEBAPPS%\\"
                    echo "Copy complete."
                ) else (
                    echo "ERROR: No WAR file found in %WAR_SOURCE_DIR%. Aborting deployment."
                    exit /b 1
                )
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed.'
        }
    }
}
