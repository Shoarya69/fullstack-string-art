import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os

load_dotenv()

cloudinary.config(
  cloud_name=os.getenv("c_name"),
  api_key=os.getenv("c_api"),
  api_secret=os.getenv("c_sec")
)

def cloud_s(url):
    response = cloudinary.uploader.upload(url)

    print("Uploaded URL:", response['secure_url'])
    return response['secure_url']