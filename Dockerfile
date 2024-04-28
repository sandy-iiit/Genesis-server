FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 4000

CMD ["npm","start"]
