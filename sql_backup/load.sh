#!/bin/bash

# setup
BACKUP_DIR="/usr/backup"
CONTAINER_NAME="portfolio_tracker_mysql_1"

mysql -u $MYSQL_USER -p $MYSQL_DATABASE < $BACKUP_DIR/dump__2023-01-05__16.23.sql
