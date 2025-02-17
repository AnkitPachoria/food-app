FROM node:18

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]