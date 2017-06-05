# fsuire/marvel
Some exercices around react and the marvel API

## How to use

1. Make sure the docker engine and docker-compose are installed:
    - [Docker official documentation](https://docs.docker.com/compose/install/)
2. Clone this project:
    - `$ git clone git@github.com:fsuire/marvel`
3. Run `docker-compose`:
    - `$ cd marvel`
    - `$ docker-compose up`
    - It will download the node:8.0.0 image, create a container for your application and download its dependencies. This whole process take approximately 5 minutes.
    - The first time, this process could end up with an error (`Could not find a required file. \ Name: index.html \ Searched in: /application/public`), just  do `$ docker-compose up` another time.
    - When the message indicating that the react-scripts development server has been started, you can open a browser to [http://localhost:3000/](http://localhost:3000/) and start modifying what's in the `src` directory.
5. To stop the development server and the docker container, just do `Ctrl+c` and wait for it to stop. Do not force it if you want to use the same container next time.
