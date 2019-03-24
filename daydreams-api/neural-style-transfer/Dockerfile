FROM python:3.6-alpine

# FROM ubuntu:16.04

# RUN apt-get update -y && \
#    apt-get install -y python-pip python-dev

# RUN add-apt-repository ppa:jonathonf/python-3.6
# RUN apt-get update && apt-get install python3.6

# RUN apt update && apt install gcc

RUN /usr/bin/env python3 -m pip install --upgrade pip
RUN pip install setuptools -U

RUN mkdir -p /app

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python" ]

CMD ["main.py"]