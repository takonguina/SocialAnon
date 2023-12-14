import os

from pydantic import BaseSettings

class Settings(BaseSettings):
	SECRET_KEY: str = os.environ.get("SECRET_KEY")
	ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
	JWT_ALGORITHM: str = "HS256"

	# Database
	POSTGRES_USER: str = os.environ.get("POSTGRES_USER")
	POSTGRES_PASSWORD: str = os.environ.get("POSTGRES_PASSWORD")
	POSTGRES_DB: str = os.environ.get("POSTGRES_DB")


settings = Settings()