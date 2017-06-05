# Personal react boilerplate

## the docker part

1. Create the image:

  ```docker build -t fsuire/marvel .```
2. Create a container

  ```docker run -it -v /<some-app-folder>:/application -p 127.0.0.1:3000:3000 --name <some-name> my/react```
3. In the container shell, install dependencies:

  ```/application# yarn install```
uo
