ARG PORT

FROM node:20.6-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci 

RUN chmod +x ./node_modules/.bin/ts-node

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]
