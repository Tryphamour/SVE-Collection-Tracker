up:
	docker-compose up --build

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs

shell:
	docker exec -it $(shell docker ps --filter "name=SVE-server" --quiet) bash

.PHONY: up down restart logs shell
