FROM ruby:2.6.6

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq \
 && apt-get -y install build-essential libpq-dev nodejs yarn

RUN gem install bundler:1.17.2

RUN mkdir /furikaerin
ENV APP_ROOT /furikaerin
WORKDIR $APP_ROOT

ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

RUN bundle install
ADD . $APP_ROOT

RUN bin/yarn

EXPOSE 5000

CMD ["./start.sh"]