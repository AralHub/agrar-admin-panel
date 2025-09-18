FROM node:22.19.0

WORKDIR /app

COPY . .

CMD ["npm", "run", "dev"]
