FROM python:3.7-alpine
RUN apk add mariadb-dev
RUN apk add build-base
COPY . /administrator_app
WORKDIR /administrator_app
RUN echo Installing Python packages listed in requirements.txt
RUN pip install -r /administrator_app/requirements.txt
EXPOSE 80
RUN echo Starting python and starting the Flask service...
ENTRYPOINT ["python"]
CMD ["administrator.py"]