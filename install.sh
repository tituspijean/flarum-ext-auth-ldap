#!/bin/bash

function usage {
  echo -e "\nUsage ./install.sh <command>\n"
  echo -e "Available commands:\n"

  echo -e "- install: Purge, restart and install environment"
  echo -e "- console: Enter in docker console"
  echo -e "- purge: Stop and purge dockers"
  echo -e ""

  echo -e "- console-root: Enter in docker console with root user"
  echo -e "- exec <cmd>: Execute command in docker"
  echo -e "- exec_in <path> <cmd>: Execute command in docker"
  echo -e "- logs: Show logs"
  echo -e "- ps: List dockers"
  echo -e "- start: Start dockers"
  echo -e ""
}

function console {
  env UID=${UID} ${DOCKER_COMPOSE} exec php bash
}
function console-root {
  env UID=${UID} ${DOCKER_COMPOSE} exec -u root php bash
}
function exec {
  env UID=${UID} ${DOCKER_COMPOSE} exec -T php $EX_CMD
}
function exec_in {
  echo -e "$EX_CMD"
  env UID=${UID} ${DOCKER_COMPOSE} exec -T -w $EX_PATH php $EX_CMD
}
function purge {
  env UID=${UID} ${DOCKER_COMPOSE} down --remove-orphans -v
	env UID=${UID} ${DOCKER_COMPOSE} rm -f -v
}
function ps {
  env UID=${UID} ${DOCKER_COMPOSE} ps
}
function logs {
  env UID=${UID} ${DOCKER_COMPOSE} logs -tf
}
function start {
  env UID=${UID} ${DOCKER_COMPOSE} up --build -d
}
function install {
  purge
  start
	env UID=${UID} ${DOCKER_COMPOSE} exec -T php bash bin/waitMysql.sh
	env UID=${UID} ${DOCKER_COMPOSE} exec -T php composer install
	env UID=${UID} ${DOCKER_COMPOSE} exec -T php bash docker/install-flarum.sh
}

## MAIN FUNCTIONS
## Add new env for CI
case $ENV in
  *)
    DOCKER_COMPOSE="docker-compose -p flarum-ldap -f docker/docker-compose.yml"
    ;;
esac

DOCKER_FILE=docker/.docker.conf
if [ ! -f "$DOCKER_FILE" ]; then
    echo "You need to create $DOCKER_FILE file !"
    exit 1
fi

case $1 in
  install)
    install
    ;;
  purge)
    purge
    ;;
  ps)
    ps
    ;;
  logs)
    logs
    ;;
  exec)
    EX_CMD="$2"
    exec
    ;;
  exec_in)
    EX_PATH="$2"
    EX_CMD="$3"
    exec_in
    ;;
  console-root)
    console-root
    ;;
  console)
    console
    ;;
  start)
    start
    ;;
  *)
    usage
    ;;
esac
