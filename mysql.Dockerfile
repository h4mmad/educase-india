FROM mysql:8

# Expose MySQL default port
COPY schema.sql /docker-entrypoint-initdb.d/   

EXPOSE 3306
