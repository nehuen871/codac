from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, String, Integer, Date, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.sql.schema import Column
import cx_Oracle
import asyncio
import os

cx_Oracle.init_oracle_client()

# TODO: pasar TODAS las connection strings hardcodeadas a env variables

engine_std = create_engine(
    'oracle+cx_oracle://STD_PRD:s7GYbugM@bicdb-scan.gcba.gob.ar:1521/?service_name=saspro.gcba.gob.ar'
)

engine_gc = create_engine(
    'oracle+cx_oracle://GC_PRD:wnQRYuac@bicdb-scan.gcba.gob.ar:1521/?service_name=saspro.gcba.gob.ar'
)

engine_encoladores = create_engine(
    'oracle+cx_oracle://SIGEC_DEV:MaeLNHwA@bicdb-scan.gcba.gob.ar:1521/?service_name=sasdev.gcba.gob.ar'
)

engine_sigeci = create_engine(
    'oracle+cx_oracle://SIGEC_PRD:tH6Lz4Yk@bicdb-scan.gcba.gob.ar:1521/?service_name=saspro.gcba.gob.ar'
)

SessionLocalSTD = sessionmaker(bind=engine_std)
SessionLocalGC = sessionmaker(bind=engine_gc)
SessionLocalEncoladores = sessionmaker(bind=engine_encoladores)
SessionLocalSigeci = sessionmaker(bind=engine_sigeci)


def get_db_std():
    db = SessionLocalSTD()
    try:
        yield db
    finally:
        db.close()


def get_db_gc():
    db = SessionLocalGC()
    try:
        yield db
    finally:
        db.close()


def get_db_enc():
    db = SessionLocalEncoladores()
    try:
        yield db
    finally:
        db.close()


def get_db_sigeci():
    db = SessionLocalSigeci()
    try:
        yield db
    finally:
        db.close()


BaseSTD = declarative_base()
BaseGC = declarative_base()
BaseEncoladores = declarative_base()
BaseSigeci = declarative_base()


class BandejaEntrada(BaseSTD):
    __tablename__ = 'ESPEJADO_STD_BANDEJA_ENTRADA'

    ID = Column(String(64), primary_key=True)
    ANIO = Column(Integer)
    NOMBRECIUDADANO = Column(String(80))
    APELLIDOCIUDADANO = Column(String(80))
    BAID = Column(String(72))
    FECHAINGRESO = Column(Date)
    NUMERODOCUMENTO = Column(String(40))


class Ciudadanos(BaseGC):
    __tablename__ = 'VW_GC_CIUDADANOS'

    CIUDADANO_KEY = Column(Integer, primary_key=True)
    CIUDADANO_BAID_ID = Column(String(80))
    SUACI_ID = Column(String(15))
    DOCUMENTO = Column(String(20))
    TIPO_DOCUMENTO_DESC = Column(String(15))
    NACIONALIDAD_DOCUMENTO_DESC = Column(String(50))
    SEXO_DESC = Column(String(20))
    RANGO_ETARIO_DESC = Column(String(50))


class Encoladores(BaseEncoladores):
    __tablename__ = 'VW_FILA0_SUBSCRIPTIONS'

    ID = Column(String(50), primary_key=True)
    SUBSCRIPTIONTIME = Column(Date)
    CREATEDFROM_V = Column(String(20))
    SUBSCRIPTIONTYPE = Column(String(15))
    NAME = Column(String(30))
    STATUS = Column(String(30))
    REASON = Column(String(40))
    HASPRIORITY = Column(Boolean)
    CREATEDAT = Column(String)
    UPDATEDAT = Column(String)
    CANCELEDBY = Column(String(10))
    CALLEDBY = Column(String(30))
    CALLEDFROM = Column(String(30))
    NUMERO_DE_POSTA = Column(Integer)
    CHECKIN_CHECKINTIME = Column(String)
    CALLEDTIME = Column(String)
    COMPLETEDTIME = Column(String)
    TIEMPO_DE_ESPERA = Column(Float)
    TIEMPO_DE_ATENCION = Column(Float)
    PERSON_ID = Column(String(30))
    PERSON_IDTYPE = Column(String(30))
    PERSON_FIRSTNAME = Column(String(50))
    PERSON_LASTNAME = Column(String(50))
    QUEUEDATA_LABEL = Column(String(80))
    QUEUEDATA_QUEUEID = Column(String(50))
    QUEUEDATA_QUEUETYPE = Column(String(10))


class Sigeci(BaseSigeci):
    __tablename__ = 'VW_SIGECI_CITAS'

    CITA_ID = Column(Integer, primary_key=True)
    FECHA = Column(Date)
    ESTADO_CITA_DESC = Column(String(255))
    FECHA_CANCELACION_CITA = Column(Date)
    FECHA_USUARIO = Column(Date)
    NOMBRE_OPERARIO = Column(String(255))
    SEDE_DESC = Column(String(255))
    CIUDADANO_KEY = Column(Integer)
    CIUDADANO_ID = Column(Integer)
    TIPO_DOC = Column(Integer)
    NUM_DOC = Column(String(255))
    NOMBRE_CIUDADANO = Column(String(255))
    APELLIDO = Column(String(255))
    FECHA_NACIMIENTO = Column(Date)
    TELEFONO = Column(String(255))
    EMAIL = Column(String(255))
    GENERO = Column(Integer)
    VALIDADO_RENAPER = Column(String(2))
    BAID = Column(String(255))


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


async def get_user_data_std(miba_id: str, db: Session):
    return db \
        .query(BandejaEntrada) \
        .filter(BandejaEntrada.BAID == miba_id) \
        .first()


async def get_user_data_gc(miba_id: str, db: Session):
    return db \
        .query(Ciudadanos) \
        .filter(Ciudadanos.CIUDADANO_BAID_ID == miba_id) \
        .first()


async def get_user_data_encoladores(person_id: str, person_id_type: str, db: Session):
    return db \
        .query(Encoladores) \
        .filter(Encoladores.PERSON_ID == person_id) \
        .filter(Encoladores.PERSON_IDTYPE == person_id_type) \
        .first()


async def get_user_data_sigeci(miba_id: str, db: Session):
    return db \
        .query(Sigeci) \
        .filter(Sigeci.BAID == miba_id) \
        .first()


@app.get('/users/{miba_id}')
async def get_user_data(miba_id: str,
                        db_std: Session = Depends(get_db_std),
                        db_gc: Session = Depends(get_db_gc),
                        db_enc: Session = Depends(get_db_enc),
                        db_sigeci: Session = Depends(get_db_sigeci)):
    [data_std, data_gc, data_sigeci] = await asyncio.gather(
        get_user_data_std(miba_id, db_std),
        get_user_data_gc(miba_id, db_gc),
        get_user_data_sigeci(miba_id, db_sigeci)
    )
    data_enc = None
    if data_gc is not None:
        tipo_doc = data_gc.TIPO_DOCUMENTO_DESC.lower()
        doc = data_gc.DOCUMENTO
        data_enc = await get_user_data_encoladores(doc, tipo_doc, db_enc)

    data = {'GC': data_gc, 'STD': data_std, 'ENCOLADORES': data_enc, 'SIGECI': data_sigeci}
    return data
