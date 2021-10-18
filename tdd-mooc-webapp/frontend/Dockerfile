FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.20-alpine

COPY docker/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker/docker-entrypoint.sh /

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

