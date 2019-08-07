#!/bin/bash
docker run -it --network=host -v $(pwd)/nginx/dev.conf:/etc/nginx/conf.d/default.conf nginx
