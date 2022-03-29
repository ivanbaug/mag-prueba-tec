# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10-slim-buster

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
# This directory may change depending of the git folder distribution
COPY ./backend ./

# Install production dependencies.
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install --no-cache-dir psycopg2 \
    && apt-get remove -y gcc && apt-get -y autoremove \
    && apt-get clean
RUN pip install --no-cache-dir -r requirements.txt

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 backend.wsgi:application
#Note that project.app referst to project/app.py and :app is the name of the flask app
#inside the app.py file