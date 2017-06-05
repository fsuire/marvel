# fsuire/react-scripts
A docker container that runs a "boiler-plated" react application made with create-react-app and react-scripts

## How to use

1. Make sure the docker engine and docker-compose are installed:
    - [Docker official documentation](https://docs.docker.com/compose/install/)
2. Clone this project:
    - `$ git clone git@github.com:fsuire/react-scripts.git your-project-name`
3. Modify the `package.json` according to your needs
4. Run `docker-compose`:
    - `$ cd your-project-name`
    - `$ docker-compose up`
    - It will download the node:8.0.0 image, create a container for your application and download its dependencies. This whole process take approximately 5 minutes.
    - The first time, this process could end up with an error (`Could not find a required file. \ Name: index.html \ Searched in: /application/public`), just  do `$ docker-compose up` another time.
    - When the message indicating that the react-scripts development server has been started, you can open a browser to [http://localhost:3000/](http://localhost:3000/) and start modifying what's in the `src` directory.
5. To stop the development server and the docker container, just do `Ctrl+c`
