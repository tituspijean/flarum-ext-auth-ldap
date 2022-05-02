FROM alpine:3.8

RUN apk add --update nginx
RUN rm -rf /var/cache/apk/* && rm -rf /tmp/*

ADD nginx.conf /etc/nginx/
ADD conf.d /etc/nginx/conf.d/

RUN adduser -D -g '' -G www-data www-data
RUN chown -R www-data:www-data /var/tmp/nginx

EXPOSE 80
EXPOSE 443

CMD ["nginx"]