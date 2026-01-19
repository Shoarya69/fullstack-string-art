import jwt
from app.sec import JWTsettings as Jwt_s
from datetime import datetime, timedelta
import uuid
from app.jwt.encript import Enc_playload



algo = Jwt_s.algo
key = Jwt_s.key

def Create_token(user_id: int, username: str):
    
    if not user_id or not username:
        print("Somting is wrong in api we can't find username and userid for tocken Creation")
        return {"error": "either user_id or username is missing"}
    
    enc_key = Enc_playload(user_id, username)

    now  = datetime.utcnow()
    expire = now +timedelta(hours=1)
    playload = {
        "enc_key": enc_key,
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
        "jti" : str(uuid.uuid4())
    }
    try:
        token = jwt.encode(playload,key,algorithm=algo)
    except Exception as e:
        print(e)
        raise RuntimeError("JWT creation failed")
    return token