FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock .npmrc .yarnrc ./

RUN yarn install --frozen-lockfile --network-timeout 100000

COPY . .

#  проект
RUN yarn build

RUN yarn global add serve

EXPOSE 5002

# Запускаем production-сервер
CMD ["serve", "-s", "dist", "-l", "5002"]
