# frontend/Dockerfile
FROM node:21.5.0

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
# CRAなら build、Viteなら dist に合わせて script を調整
RUN yarn build

# 軽量化：ローカル dev 用依存は消してもOK
RUN yarn global add serve

# Render 側が $PORT を注入するので EXPOSE は省略可（あっても可）
# EXPOSE 3000

# 0.0.0.0 で $PORT をリッスン
CMD ["sh","-c","serve -s build -l tcp://0.0.0.0:$PORT"]
