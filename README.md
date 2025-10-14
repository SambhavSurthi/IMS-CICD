# **CICD-Practise-Notes**

---

# **LAB-1 -> Deploy Frontend in Git Actions**

## **React App With Routes Creation**

1. Create a react app with command:
   ```bash
   npm create vite@latest
   ```

2. Install Tailwind CSS from website.

3. Install React Router DOM for routings:
   ```bash
   npm install react-router-dom
   ```

4. Create 2 folders in `src`: **components**, **pages**

5. In components folder, create files that need to be routed — example: `Home.jsx`, `About.jsx`, `Contact.jsx`.  
   In each file, using `rafce`, create a simple react function.

6. In navbar, import Link tag:
   ```javascript
   import { Link } from 'react-router-dom';
   ```

7. Create navigation links using `<Link></Link>`  
   Example Route:
   ```jsx
   <Link to="/">Home</Link>
   ```

8. Now in `App.jsx` inside `<div>` call out Navbar:
   ```jsx
   <Navbar/>
   ```
   This Navbar is now visible to all the routes.  
   **Make sure it is also imported.**

9. In the same `<div>` below `<Navbar/>` define routes:
   ```jsx
   <div>
     <Navbar/>
     <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/about' element={<About />} />
       <Route path='/contact' element={<Contact/>} /> 
     </Routes>
   </div>
   ```

**NOTE:** Make sure all the links are imported.

---

## **Deploy The React App In Git Actions Using gh-pages, Git Actions**

1. Create a new Git repository and push your react app into it.
2. In `package.json` (around line 6, after `"type"`), add:
   ```json
   "homepage": "https://github.com/SambhavSurthi/Deploy-React-GitActions",
   ```
3. Install `gh-pages`:
   ```bash
   npm install gh-pages --save-dev
   ```
4. Inside `scripts` in `package.json`, add:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. In `vite.config.js`, add base path after plugin:
   ```javascript
   base: '/Deploy-React-GitActions'
   ```
6. In `main.jsx`, for `<BrowserRouter>` add basename:
   ```jsx
   <BrowserRouter basename="/Deploy-React-GitActions">
     <App/>
   </BrowserRouter>
   ```
7. Push code into Git.
8. Run:
   ```bash
   npm run predeploy
   ```
9. Then:
   ```bash
   npm run deploy
   ```
10. Check for published message and visit the deployed URL.

---

# **LAB-2 -> Deploy Frontend in Git Actions using deploy.yml**

## **React App With Routes Creation**

(Same steps as LAB-1)

```jsx
<div>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact/>} />
  </Routes>
</div>
```

**NOTE:** Make sure all the links are imported.

---

## **Deploy The React App In Git Actions Using gh-pages, Git Actions using deploy.yml**

1. Create a new git repository and push your app.
2. In `package.json`, add:
   ```json
   "homepage": "https://github.com/SambhavSurthi/Deploy-React-GitActions",
   ```
3. Install gh-pages:
   ```bash
   npm install gh-pages --save-dev
   ```
4. (Optional) Add in `scripts`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. In `vite.config.js`, add:
   ```javascript
   base: '/Deploy-React-GitActions'
   ```
6. In `main.jsx`:
   ```jsx
   <BrowserRouter basename="/Deploy-React-GitActions">
     <App/>
   </BrowserRouter>
   ```
7. Push the code into Git.
8. In GitHub:
   - Go to **Settings → Actions → General → Workflow permissions**
   - Change to **Read and Write permissions** and **Save**

9. Go to **Actions tab → set up a workflow yourself → rename file to deploy.yml**  
   Add this code:

   ```yaml
   name: Deploy Vite React App to GitHub Pages

   on:
     push:
       branches:
         - main

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout code
           uses: actions/checkout@v4

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'

         - name: Install dependencies
           run: npm install

         - name: Build the app
           run: npm run build

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v4
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

10. Save and push.  
11. In **Settings → Pages → Build and Deployment**, change branch to **gh-pages** and save.

**NOTE:** Make sure indentation is correct.

---

# **LAB-3 -> React App Deployment Using Jenkins**

> Make sure Tomcat 10, Node.js, and Git are installed in Jenkins.

## **React App With Routes Creation**

(Same steps as previous labs)

---

## **Deploy The React App in Jenkins**

1. In `vite.config.js`:
   ```javascript
   base: 'Taskmanager'
   ```
2. In `main.jsx`:
   ```jsx
   <BrowserRouter basename="Taskmanager">
     <App/>
   </BrowserRouter>
   ```
3. Open Jenkins → create new job (name = base name in vite.config.js)
4. Choose **Freestyle project**
5. Add description
6. Check **GitHub Project** and add URL:
   ```
   https://github.com/SambhavSurthi/Deploy-ReactApp-Jenkins
   ```
7. Under **Source Code Management → Git**, add:
   ```
   https://github.com/SambhavSurthi/Deploy-ReactApp-Jenkins.git
   ```
8. Branches to build → remove master, add **main**
9. Choose **Poll SCM** and enter:
   ```
   * * * * *
   ```
10. Under **Environment**, check:
    ```
    Delete Workspace Before Build Start
    ```
11. Under **Build Steps → Execute Windows batch commands**:
    ```batch
    call npm install
    call npm run build
    rmdir /S /Q "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\<your-app>"
    mkdir "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\<your-app>"
    xcopy /E /I /Y dist\* "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\<your-app>"
    ```
12. Click **Apply** and **Save**
13. Click **Build Now**
14. After successful build, open Tomcat → Manage App → find your project.

---

# **LAB-4 -> SpringBoot App Deployment In TomCat**

## **SpringBoot App Creation With Routes**

1. Packaging must be **war**
2. Open Eclipse → create Spring Boot app
3. Fill details → Maven, WAR, Java 21, etc.
4. Add dependencies and create project
5. Create controller:

   ```java
   package com.taskmanager.controllers;

   import org.springframework.web.bind.annotation.*;

   @RestController
   @RequestMapping("/api")
   public class Client {

       @GetMapping("/")
       public String sayHello() {
           return "Hello User!!";
       }

       @GetMapping("/greet/{name}")
       public String greetUser(@PathVariable String name) {
           return "Hello " + name + "!!";
       }

       @GetMapping("/test")
       public String testEndpoint() {
           return "Working Perfectly";
       }
   }
   ```

6. Export as WAR → save inside `tomcat/webapps/`
7. Go to Tomcat manage apps → test endpoints
8. If stopped, restart Tomcat using `Tomcat10.exe` in `bin`.

---

# **LAB-5 -> SpringBoot App Deployment In Tomcat Using Jenkins**

## **SpringBoot App Creation With Routes**

(Same as LAB-4)

---

## **SpringBoot App Deployment using Jenkins**

1. In `pom.xml` under `<build>`:
   ```xml
   <finalName>taskmanager</finalName>
   ```
2. Maven → Update Project (force)
3. Open terminal and push code to Git
4. In Jenkins → New item → name same as finalName
5. Choose **Freestyle project**
6. Add GitHub project URL (without `.git`)
7. Under **Source Code Management → Git**, add URL with `.git`
8. Change branch to **main**
9. Choose **Poll SCM** →  
   ```
   * * * * *
   ```
10. Under **Environment**, check **Delete Workspace Before Build start**
11. Under **Build Steps:**
    - Step 1: **Invoke top-level Maven targets**
      - Maven Version → MAVEN
      - Goals → `clean package`
    - Step 2: **Execute Windows batch command**

      ```batch
      del /Q "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\taskmanager.war"
      rmdir /S /Q "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\taskmanager"
      cd target
      copy *.war "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\"
      ```

12. Apply and Save
13. Build Now
14. Open Tomcat manage apps → test endpoints
15. If stopped, restart Tomcat.

---

# **LAB-6 -> FullStack Deployment In Tomcat Using Jenkins**

(To be continued setup same as above combining frontend + backend)

---

# **Lab-7 -> Docker Frontend Deployment**

1. Create a simple React app
2. In root directory, create:
   - `.dockerignore`
   - `Dockerfile`

**.dockerignore**
```
node_modules
dist
.git
.gitignore
Dockerfile
```

**Dockerfile**
```dockerfile
# Stage 1: Build 
FROM node:20-alpine AS build 
WORKDIR /react-app 
COPY package*.json ./ 
RUN npm install 
COPY . . 
RUN npm run build
 
# Stage 2: Serve production 
FROM nginx:alpine 
COPY --from=build /react-app/dist /usr/share/nginx/html 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]
```

3. Build the project:
   ```bash
   docker build -t docker-react-nginx .
   ```
4. Run:
   ```bash
   docker run -d -p 2028:80 docker-todo-nginx
   ```
5. Open browser → [http://localhost:2028](http://localhost:2028)
6. List containers:
   ```bash
   docker ps
   ```
7. List images:
   ```bash
   docker images
   ```
8. Login to Docker Hub:
   ```bash
   docker login
   ```
9. Tag and push:
   ```bash
   docker tag <imagename> <username>/<react_name>:latest
   docker push sambhavsurthi/react-app:latest
   ```
10. Run locally (dev mode):
   ```bash
   docker run -d -p 2025:5173 docker-react-app npm run dev -- --host
   ```
11. Stop container:
   ```bash
   docker ps
   docker stop <container_id>
   ```

---

# **Lab-8 -> Docker Backend Deployment**

1. Create a simple Spring Boot project.
2. In `application.properties`:
   ```
   server.port=<port no>
   ```
3. Test the project.
4. Run:
   ```bash
   mvn clean package
   ```
   (Ensure **BUILD SUCCESS**)
5. Run JAR:
   ```bash
   java -jar ./target/<snapshot>.jar
   ```
6. Create Dockerfile:

```dockerfile
# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /<your app name>

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /<your app name>
COPY --from=builder /<your app name>/target/*.jar app.jar

EXPOSE 2006

ENTRYPOINT ["java", "-jar", "app.jar"]
```

7. Change `/app` to your project name.
8. Build image:
   ```bash
   docker build -t <your project> .
   ```
9. View images:
   ```bash
   docker images
   ```
10. Run container:
   ```bash
   docker run -p <any_port>:<server.port> <appname>
   ```
11. Login:
   ```bash
   docker login
   ```
12. Tag and push:
   ```bash
   docker tag <app> sambhavsurthi/<app name>:latest
   docker push sambhavsurthi/<app>:latest
   ```

---

# **Lab-9 -> Docker FullStack Deployment**

1. Create a Simple Full Stack application
2. in frontend create a .env to fetch the backend URL. 
3. in frontend in src create frontend.Dockerfile and add the following code
```bash
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /<app name>

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve production
FROM nginx:alpine
COPY --from=build /<app name>/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```
4. in backend in applications.properties make sure these are added
```bash
spring.application.name=SpringBootProject
server.port=2000

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://mysqldb:3306/klustudentdb
spring.datasource.username=root
spring.datasource.password=docker

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

5. In root directory create backend.Dockerfile and add this code
```bash
# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /<appname>

COPY mvnw .          
COPY .mvn/ .mvn
COPY pom.xml ./
COPY src ./src

# Give execute permission for mvnw
RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /<appname>
COPY --from=builder /<appname>/target/*.jar <appname>.jar

EXPOSE 2000

ENTRYPOINT ["java", "-jar", "<appname>.jar"]
```

6. Now create in parent directory below frontend and backend create docker-compose.yml and add this code

```bash

services:
  mysqldb:
    image: mysql:8
    container_name: mysql-db
    environment:
      MYSQL_ROOT_PASSWORD: docker
      MYSQL_DATABASE: <youtdbname gave in application.properties>
    ports:
      - "3307:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - springboot-mysql-net

  backend:
    image: sambhavsurthi/docker-backend:latest
    container_name: springboot
    ports:
      - "2025:2000"
    depends_on:
      - mysqldb
    restart: on-failure
    networks:
      - springboot-mysql-net

  frontend:
    image: sambhavsurthi/docker-frontend:latest
    container_name: react
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: on-failure
    networks:
      - springboot-mysql-net

volumes:
  mysql_data:

networks:
  springboot-mysql-net:

```
7. Push the code into the github(repo can be private)
8. Goto repo settings> Secrets and varibales> Actions> New Repo Secrate> name= DOCKERHUB_USERNAME Secrte=<Your Username>
9. Goto Dockerhub website login and goto settings>personal access token> create a new token> add any description> Optional change to read,Write, Delete and copy that token and in github create a new token with name=DOCKERHUB_TOKEN Secrte=<token You copied>
10. save and goto actions tab
11. select Docker Image from suggestins
12. change name to docker-image.yml and add the following code
```bash

name: Docker Fullstack CI

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push backend image
        uses: docker/build-push-action@v5
        with:
          context: ./STUDENTAPI-SPRINGBOOT
          file: ./STUDENTAPI-SPRINGBOOT/backend.Dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/docker-backend:latest

      - name: Build and push frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./STUDENTAPI-REACT
          file: ./STUDENTAPI-REACT/frontend.Dockerfile
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/docker-frontend:lates

```

make change accordingly

13. now push the code 
14. now pull the code into vscode
15. run these commands
```bash
docker-compose build
docker-compose up -d
docker logs -f springboot
docker exec -it mysql-db mysql -uroot -pdocker
docker-compose down

```


