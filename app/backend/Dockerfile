FROM  ruby:3.2.2

ARG UID
ARG GID
ARG USERNAME

ARG SECRET_KEY_BASE
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG JWT_SECRET_KEY
ARG FRONT_URL
ARG COOKIES_SAME_SITE

ENV SECRET_KEY_BASE=$SECRET_KEY_BASE
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV FRONT_URL=$FRONT_URL
ENV COOKIES_SAME_SITE=$COOKIES_SAME_SITE

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      nodejs postgresql-client libpq-dev build-essential && \
    rm -rf /var/lib/apt/lists/*

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