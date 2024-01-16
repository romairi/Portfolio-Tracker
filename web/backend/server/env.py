import os
from urllib.parse import quote

mysql_host = os.getenv('MYSQL_HOST', 'mysql')
mysql_user = os.getenv('MYSQL_USER')
mysql_pass = quote(os.getenv('MYSQL_PASSWORD'))
mysql_port = os.getenv('MYSQL_PORT', 3306)
mysql_db = os.getenv('MYSQL_DATABASE', 'portfolio_tracker')
