FROM nginx:1.15.0

# removing default config
RUN rm /etc/nginx/conf.d/default.conf

# grabbing configuration from nginx.conf file 
COPY nginx.conf /etc/nginx/conf.d
