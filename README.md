# Run app on Docker

- Create Dockerfile file
```json
FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose app ports
EXPOSE 6075

# Start application
CMD [ "npm", "start" ]
```

- Create dockerignore file
```json
node_modules
npm-debug.log
```

- Building your images:
```bash
docker build -t eric/atlas-app .
```

- Check docker image list
```bash
docker images
```

<pre>
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
eric/atlas-app   latest              d6e01bdfc655        40 minutes ago      1.24GB
</pre>

- Run the image
```bash
docker run -p 8888:6075 -d -it eric/atlas-app
```
In the example above, Docker mapped the 6075 port inside of the container to the 8888 port on your machine. so you should access the first 6075(1) port to test. You may use the different ports.

- Get container ID
```bash
docker ps
```

- Print app output
```bash
docker logs <container id>
```

- Test your app
Access url http://localhost:8888

- Enter the container, run command inside container
```bash
docker exec -it <container id> /bin/bash
```

#### Next step, will try docker compose. 😊

🔗 [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)


# Docker Compose for NodeJS Web App

**Create** [`docker-compose.yml`](https://github.com/ericwdq/atlas-app/docker-compose.yml "docker-compose.yml")

```yml
app:
  build: ./
  volumes:
    - ./:/usr/src/app
  ports:
    - 8888:6075
  environment:
    - NODE_ENV=development
    - PORT=6075
  command: "npm start"
  restart: always
```

<!--more-->

8888 is the post of host machine，6075 is the port of app inside docker container.

**Build and Run**

```bash
docker-compose -f ./docker-compose.yml up -d
```

**List container and related logs**

```bash
docker ps
```

```bash
docker logs <container id>
```

**Execute bash inside docker container**

```bash
docker exec -it <container id> /bin/bash
```

**Reference：**

🔗 [A Docker/docker-compose setup with Redis and Node/Express](https://codewithhugo.com/setting-up-express-and-redis-with-docker-compose/)

🔗 [Using Docker Compose for NodeJS Development](https://blog.codeship.com/using-docker-compose-for-nodejs-development/)

🔗 [使用 docker-composer 部署 nodejs 应用](https://www.ddhigh.com/2017/11/01/docker-composer-nodejs.html)




