build-sovryn-frontend:
	docker build -t sovryn-frontend --build-arg ci_user_token=${CI_USER_TOKEN} .
run:
	docker run --rm -it --name sovryn-frontend --env-file .env sovryn-frontend
exec:
	docker exec -ti sovryn-frontend /bin/bash
stop:
	docker stop sovryn-frontend
get-onion-hostname:
	docker run -it --rm -a stdout --entrypoint cat sovryn-frontend /var/lib/tor/hidden_service/hostname
check-tor-service:
	docker run -it --rm -a stdout --entrypoint service sovryn-frontend tor status
tag:
	docker tag sovryn-frontend:latest gambitcajun/sovryn-frontend:latest
push:
	docker push gambitcajun/sovryn-frontend:latest