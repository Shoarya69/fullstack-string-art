#!/bin/bash

# Create .env file inside container if not exists
ENV_FILE="/app/.env"
if [ ! -f "$ENV_FILE" ]; then
  cat <<EOT > "$ENV_FILE"
FLASK_ENV=development
SECRET_KEY=your_secret_key
MYSQL_HOST=db
MYSQL_USER=flaskuser
MYSQL_PASSWORD=flaskpass
MYSQL_DB=myappdb
EOT
fi

# Execute the CMD from Dockerfile
exec "$@"
