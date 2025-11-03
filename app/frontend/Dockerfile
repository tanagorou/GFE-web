FROM node:20   # 21でもOKですが、LTSの方が安定しやすい

WORKDIR /app
COPY package.json yarn.lock ./

# タイムアウトを10分に延長（グローバル設定）
RUN yarn config set network-timeout 600000 -g

# リトライ付きインストール（最大3回）
RUN for i in 1 2 3; do yarn install --frozen-lockfile --no-progress && break || sleep 10; done

COPY . .

# ここもリトライさせてもOK
RUN for i in 1 2 3; do yarn build && break || sleep 10; done

# serve運用ならこのまま
RUN yarn global add serve
CMD ["sh","-c","serve -s build -l tcp://0.0.0.0:$PORT"]
