FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm i
EXPOSE 3005

CMD ["npm", "start"]