# Run app on Docker

- Check Dockerfile content

- Check dockerignore file

- Building your images:
```bash
docker build -t eric/node-web-app .
```

- Check docker image list
```bash
docker images
```

<pre>
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
eric/node-web-app   latest              d6e01bdfc655        40 minutes ago      1.24GB
</pre>

- Run the image
```bash
docker run -p 8888:6075 -d -it eric/node-web-app
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


# Enter the container
$ docker exec -it <container id> /bin/bash


🔗 [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
