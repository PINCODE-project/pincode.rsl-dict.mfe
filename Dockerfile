FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY .npmrc ./

RUN yarn config set registry https://registry.npmmirror.com

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5002

CMD ["yarn", "start"]
