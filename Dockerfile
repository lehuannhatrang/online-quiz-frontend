### STAGE 1: Build ###
FROM node:8.12.0 as build
ENV HTTP_PROXY http://10.30.76.11:3128
ENV HTTPS_PROXY http://10.30.76.11:3128
RUN mkdir /usr/app
WORKDIR /usr/app

# production environment
FROM nginx:1.13.9-alpine
COPY --from=build /usr/app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]