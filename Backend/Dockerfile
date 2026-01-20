FROM node:20-alpine 
RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "server.js"]
