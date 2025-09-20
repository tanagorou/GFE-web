FROM  ruby:3.2.2

ARG UID
ARG GID
ARG USERNAME

RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# タイムゾーンをAsia/Tokyoに設定
ENV TZ Asia/Tokyo

RUN groupadd --force -g $GID $USERNAME
RUN useradd -ms /bin/bash --no-user-group -g $GID -u $UID $USERNAME

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
