# Start the service

docker-compose up -d

# Stop the service

docker-compose down

# View logs

docker-compose logs timescaledb

# Stop and remove volumes (data will be lost)

docker-compose down -v
