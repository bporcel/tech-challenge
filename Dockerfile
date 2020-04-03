FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g json-server
COPY . .
RUN npm run build-front:pro

ENTRYPOINT ["json-server", "src/back/db.js", "--port", "8080", "--host", "0.0.0.0", "--static", "./dist"]

CMD ["db.js"]