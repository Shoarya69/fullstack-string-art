import jwt
from app.sec import JWTsettings as Jwt_s
from fastapi import HTTPException, Header,status




algo = Jwt_s.algo
key = Jwt_s.key

def decode_tocken(token):
    if not token:
        print("In api route somting messed up no token is found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing"
        )
    try:
        playload = jwt.decode(token,key,algorithms=[algo])
        return {"playload": playload}
    except jwt.ExpiredSignatureError: 
        raise HTTPException(status_code=403, detail="Tocken is expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="This tocken is not valid")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="somting messed up in logic of code")