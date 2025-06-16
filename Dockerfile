FROM node:22-slim

WORKDIR /app

COPY package.json yarn.lock ./

COPY .npmrc ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5002

CMD ["yarn", "start"]
