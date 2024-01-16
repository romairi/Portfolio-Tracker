FROM node:16-buster-slim AS build_client
WORKDIR /usr/src/app

COPY ./client/package*.json ./
RUN npm i
COPY ./client ./
RUN npm run build 

FROM python:3.8-slim-buster as base

ENV PORT 8080
WORKDIR /usr/src/app
RUN mkdir -p client/build
RUN apt-get update && apt-get install python-mysqldb default-libmysqlclient-dev gcc -y

COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./backend ./backend
COPY ./main.py ./main.py
COPY ./worker_runner.py ./worker_runner.py
COPY --from=build_client /usr/src/app/build ./client/build

CMD ["python", "main.py"]