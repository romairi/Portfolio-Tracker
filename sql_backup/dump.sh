#!/bin/bash

# setup
TIMESTAMP=$(date +%Y-%m-%d__%H.%M)
BACKUP_DIR="/usr/backup"
CONTAINER_NAME="portfolio_tracker_mysql_1"

# dump
/usr/bin/mysqldump -uroot --password=$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE> $BACKUP_DIR/dump__$TIMESTAMP.sql