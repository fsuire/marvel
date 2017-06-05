FROM node:8.0.0

ENV APPLICATION_ROOT /application
ENV NODE_ENV development
ENV REACT_VERSION 15.5.4
ENV REACT_DOM_VERSION 15.5.4
ENV REACT_SCRIPTS_VERSION 1.0.7

RUN mkdir /docker-scripts
WORKDIR /docker-scripts
COPY ./docker-scripts /docker-scripts/
RUN chmod -R u+x /docker-scripts

RUN mkdir /application
WORKDIR /application
VOLUME ["/application"]
