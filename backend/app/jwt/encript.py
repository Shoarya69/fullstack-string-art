from cryptography.fernet import Fernet
import json
from app.sec import ENCsettings as enc



SEC_key = enc.SEC_key.encode()
cipher = Fernet(SEC_key)

def Enc_playload(user_id: int,username : str):
    data = {
    "user_id": user_id,
    "username": username,
    }

    encrypted_data = cipher.encrypt(
        json.dumps(data).encode()
    )

    return  encrypted_data.decode()