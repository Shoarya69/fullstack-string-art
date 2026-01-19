from cryptography.fernet import Fernet
import json
from app.sec import ENCsettings as enc



cipher = Fernet(enc.SEC_key.encode())

def decrypt_payload(enc_str: str) -> dict:
    decrypted_bytes = cipher.decrypt(enc_str.encode())
    return json.loads(decrypted_bytes.decode())
