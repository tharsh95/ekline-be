FROM node:alpine
WORKDIR /app
COPY package*.json .
COPY tsconfig*.json .
RUN npm install
COPY . .
COPY ./.env ./
CMD ["npm", "run","dev"]