from .database import Base
from datetime import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

class Country(Base):
    __tablename__ = "countries"

    id_country = Column(Integer, primary_key=True, index=True)
    name = Column(String(64))

class Users(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True)
    #id_country = Column(Integer, ForeignKey('countries.id_country'),nullable=False)
    email = Column(String(64), nullable=False)
    password = Column(String(64), nullable=False)
    email_validated = Column(Boolean, default=False,nullable=False)
    date_insert = Column(DateTime, default=func.now(), nullable=False)

class Posts(Base):
    __tablename__ = "posts"

    id_post =  Column(Integer, primary_key=True, index=True)
    id_user = Column(Integer, nullable=False)
    content = Column(String(320), nullable=False)
    likes_post = Column(Integer, nullable=False, default=0)
    date_insert = Column(DateTime, nullable=False, default=func.now())

    class Config:
        orm_mode = True