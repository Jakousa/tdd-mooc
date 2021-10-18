FROM node:alpine

USER node

EXPOSE 80

WORKDIR /usr/src/app

COPY --chown=node:node package* ./

RUN npm ci

COPY --chown=node:node . .

ENV PORT=80

CMD npm start