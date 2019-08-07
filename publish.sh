#!/bin/bash
IMAGE="rg.fr-par.scw.cloud/imazsak/imazsak-client:$(git rev-parse HEAD)"
docker build -t $IMAGE . && docker push $IMAGE

