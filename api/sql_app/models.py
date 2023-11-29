from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP, func
from sqlalchemy.orm import relationship

from .database import Base

class Country(Base):
    __tablename__ = "countries"

    id_country = Column(Integer, primary_key=True, index=True)
    name = Column(String(64))

class User(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True)
    #id_country = Column(Integer, ForeignKey('countries.id_country'),nullable=False)
    login = Column(String(64), nullable=False)
    password = Column(String(64), nullable=False)
    email = Column(String(64), nullable=False)
    email_validated = Column(Boolean, default=False,nullable=False)
    date_insert = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=False)