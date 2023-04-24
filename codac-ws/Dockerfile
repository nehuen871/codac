FROM python:3.9

RUN apt-get -y update && apt-get install libaio1

WORKDIR /opt

COPY ./requirements.txt /opt/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /opt/requirements.txt

RUN wget -nv https://download.oracle.com/otn_software/linux/instantclient/219000/instantclient-basic-linux.x64-21.9.0.0.0dbru.zip \
  && unzip -o instantclient-basic-linux.x64-21.9.0.0.0dbru.zip

ENV LD_LIBRARY_PATH=/opt/instantclient_21_9
RUN export PATH=$PATH:$LD_LIBRARY_PATH

COPY ./app /opt/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
