#!/bin/bash
bundle exec rails db:setup
bundle exec rails db:migrate
bundle exec foreman start
