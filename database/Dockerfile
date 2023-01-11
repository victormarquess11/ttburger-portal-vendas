FROM postgres:latest
ADD ./scripts/fill_tables.sh /docker-entrypoint-initdb.d/fill_tables.sh
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 5432
CMD ["postgres"]