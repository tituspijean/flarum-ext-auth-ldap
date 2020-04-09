include docker/.docker.conf
export $(shell sed 's/=.*//' docker/.docker.conf)

DOCKER_COMPOSE=eval ${DOCKER_COMPOSE_CMD}

##########################
###### DEV DOCKER ########
##########################
up:
	${DOCKER_COMPOSE} up --build -d
	${DOCKER_COMPOSE} exec -T php rm flarum/config.php
stop:
	${DOCKER_COMPOSE} stop
ps:
	${DOCKER_COMPOSE} ps
logs:
	${DOCKER_COMPOSE} logs -tf
purge:
	${DOCKER_COMPOSE} down --remove-orphans -v
	${DOCKER_COMPOSE} rm -f -v
restart:
	@make purge
	@make up

##########################
###### DEV COMMAND #######
##########################
exec:
	${DOCKER_COMPOSE} exec php bash
exec-cmd:
	${DOCKER_COMPOSE} exec -T php ${cmd}
exec-root:
	${DOCKER_COMPOSE} exec -u root php bash
install:
	${DOCKER_COMPOSE} exec -T php bash docker/install-flarum.sh