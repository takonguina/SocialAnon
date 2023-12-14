import os
from settings import settings
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError

http_bearer =  HTTPBearer()

credentials_exception = HTTPException(
	status_code=status.HTTP_401_UNAUTHORIZED,
	detail="Could not validate credentials",
	headers={"WWW-Authenticate": "Bearer"},
)

def create_jwt(sub: str) -> str:
    exp = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "exp": exp, # Expiration
        "sub": sub, # Subject eg: id_user, id_email
    }

    encoded_jwt = jwt.encode(payload, f"{os.environ.get('SECRET_KEY')}", algorithm="HS256")

    return encoded_jwt

def decode_jwt(jwt_in: str) -> int:
	try:
		payload = jwt.decode(
			jwt_in,
			key=f"{os.environ.get('SECRETKEY')}",
			algorithms="HS256"
		)

		sub: str = payload.get("sub")
		use: str = payload.get("use")

	except JWTError as err:
		raise credentials_exception
	
	# if use_in != use:
	# 	raise HTTPException(
	# 		status_code=409,
	# 		detail=f"Wrong jwt use should be {use_in} instead of {use}"
	# 	)

	return int(sub)


def has_access(jwt_in: HTTPAuthorizationCredentials = Depends(http_bearer)) -> int:
	sub: int = decode_jwt(jwt_in.credentials)

	return sub