FROM node:8.0.0

ENV APPLICATION_ROOT /application
ENV NODE_ENV development

RUN mkdir /docker-scripts
WORKDIR /docker-scripts
COPY ./docker-scripts /docker-scripts/
RUN chmod -R u+x /docker-scripts

RUN mkdir /application
WORKDIR /application
VOLUME ["/application"]
