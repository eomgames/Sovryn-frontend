FROM node:12.19 AS builder

ARG ci_user_token
ENV CI_USER_TOKEN=$ci_user_token

RUN apt-get update && apt-get install -y git build-essential

WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nginx curl gpg

RUN apt-get install -y apt-transport-https

RUN echo "deb https://deb.torproject.org/torproject.org bionic main\ndeb-src https://deb.torproject.org/torproject.org bionic main" >> /etc/apt/sources.list
RUN curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import

RUN gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -

RUN apt-get update
RUN apt-get install -y tor deb.torproject.org-keyring
RUN echo "HiddenServiceDir /var/lib/tor/hidden_service/\nHiddenServicePort 80 127.0.0.1:80" > /etc/tor/torrc
RUN /etc/init.d/tor start
RUN rm -rf /var/lib/tor/hidden_service/*

WORKDIR /var/www/html/

RUN rm -rf ./*

COPY --from=builder /app/build .
COPY start.sh /start.sh

CMD ["/start.sh"]
