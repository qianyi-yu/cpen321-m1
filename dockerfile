ARG PORT

FROM node:20.6-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci 

RUN chmod -R 755 /app/node_modules/.bin

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]
