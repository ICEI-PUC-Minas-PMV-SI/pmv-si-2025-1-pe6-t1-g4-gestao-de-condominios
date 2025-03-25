#!/bin/bash

set -e

host_port="$1"
shift

host=$(echo "$host_port" | cut -d':' -f1)
port=$(echo "$host_port" | cut -d':' -f2)

echo "Aguardando $host:$port ficar disponível..."

while ! (echo > /dev/tcp/$host/$port) >/dev/null 2>&1; do
  sleep 2
done

echo "$host:$port está disponível. Executando: " "$@"
exec "$@"
