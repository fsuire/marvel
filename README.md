# fsuire/marvel
Some exercices around react and the marvel API

## How to use

### 1. Make sure the docker engine and docker-compose are installed
  [Docker official documentation](https://docs.docker.com/compose/install/)
### 2. Clone this project
```shell
~$ git clone git@github.com:fsuire/marvel
```
### 3. Configure docker-compose with your Marvel developer key informations
  - Open, with your favorite editor, the file `docker-compose.yml`
  - Assign values to the following constants:
    - `MARVEL_TS`: It's a salt. Feel free to put any string you want.
    - `MARVEL_API_KEY`: Here's go your marvel public key.
    - `MARVEL_HASH`: A md5 hash made with (in this order) the salt, your marvel private key and your marvel public key.

To create the md5 hash, you can do
```shell
~$ echo -n saltPrivatekeyPublickey | md5sum
```

### 4. Run `docker-compose`:
```shell
~$ cd marvel
~/marvel/$ docker-compose up
```
It will:
  - create a new docker docker image based on the `Dockerfile`
  - create a new container for your application
  - download your npm dependencies
  - create the `conf/marvel.json` config file with the informations provided by the `docker-compose.yml` file
  - launch the development server
You can now open a browser and go to `http://localhost:3000`

### 5. Stop the docker container
To stop the development server and the docker container, just do `Ctrl+c` and wait for it to stop. Do not force it if you want to use the same container next time. And if you don't, you'll have plenty of useless old containers.
If you want to restart it, just do `~/marvel/$ docker-compose up` again. It will use the same image, the same container and will not perform another dependencies download.
