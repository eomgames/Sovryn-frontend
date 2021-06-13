#!/bin/bash
echo ${TORPUB} | base64 --decode > /var/lib/tor/hidden_service/hs_ed25519_public_key
echo ${TORKEY} | base64 --decode > /var/lib/tor/hidden_service/hs_ed25519_secret_key
service tor start && nginx -g "daemon off;"