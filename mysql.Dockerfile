FROM mysql:8

# healthcheck endpoint (optional)
RUN apt-get update && apt-get install -y curl
COPY health.sh /health.sh
RUN chmod +x /health.sh
HEALTHCHECK CMD ["/health.sh"]

# Expose MySQL default port
EXPOSE 3306
