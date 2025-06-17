FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY .npmrc .yarnrc ./

RUN yarn install --frozen-lockfile --network-timeout 100000

COPY . .

EXPOSE 5002

CMD ["yarn", "start"]
