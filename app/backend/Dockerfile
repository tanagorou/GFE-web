# backend/Dockerfile
FROM ruby:3.2.2

# Node と MySQLクライアント（アセットやヘルスチェックで使用）
RUN apt-get update -qq && \
    apt-get install -y nodejs default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 依存を先に入れてキャッシュを効かせる
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install --without development test

# アプリ本体
COPY . .

# タイムゾーン
ENV TZ=Asia/Tokyo

# 本番アセット（ある場合）
# Rails 7+ で importmap なら不要、webpacker/jsbundling なら必要に応じて調整
# RUN bundle exec rake assets:precompile

# Render は $PORT を注入。EXPOSE は省略可（あっても可）
# EXPOSE 10000

# Puma で 0.0.0.0:$PORT を待受（puma.rb も下に載せます）
CMD ["bundle","exec","puma","-C","config/puma.rb"]
