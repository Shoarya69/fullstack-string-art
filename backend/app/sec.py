import os
from dotenv import load_dotenv

load_dotenv()


class JWTsettings:
    algo = os.getenv("Algo_jwt")
    key = os.getenv("Key_jwt")

class ENCsettings:
    SEC_key = os.getenv("sec_Key")