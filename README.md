# Portfolio_Tracker
## Create a new docker image 
```
docker build -t portfolio_tracker .
```
docker-compose run -p 8080:8080 -p 8889:8889  web bash

## Using jupyterLab inside container:
```
pip install jupyterLab
```
```
jupyter-lab --ip=0.0.0.0 --port=8889 --allow-root
```

## Drop table from sql
```
SET FOREIGN_KEY_CHECKS=0; DROP TABLE `portfolio_tracker`.`portfolios`;
```

## Add submodule auth-microservice
```
git submodule add https://github.com/romairi/auth-microservice.git 
```
## Remove git submodule and fix error during adding a submodule: "already exists in the index" 
```
rm -rf auth-microservice
```
```
git rm -r auth-microservice
```
```
git rm --cached c3-pro-ios-framework
```
```
rm -rf .gitmodules
```

## Kill the process listening on that port 
```
sudo kill -9 `sudo lsof -t -i:8000` 
```

## Connect to mysql and download backup
- Connect to mysql docker:
```
docker exec -it <DOCKER_ID_MY_SQL/> bash
```
- Connect to mysql and enter MYSQL_PASSWORD:
```
mysql -u $MYSQL_USER -p $MYSQL_DATABASE
```
- Load the dump by the command:
```
source /usr/backup/<DUMP_FILE/>
```
- Check the tables by command:
```
SELECT * FROM stock_history LIMIT 1000;
```