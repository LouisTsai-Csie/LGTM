import jwt
from dotenv import load_dotenv
import os
load_dotenv()

encoded_jwt = jwt.encode({"some": "payload"}, os.getenv("SALT"), algorithm="HS256")

encoded_jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InkxMDMwMTc2QGdtYWlsLmNvbSJ9.ZTzuirlyWyvWnahdFDfZ2X8mjp9rSkPZyBQw2dEY6Ns'

print(encoded_jwt)
print(type(encoded_jwt))
payload = jwt.decode(encoded_jwt, os.getenv("SALT"), algorithms=["HS256"])

print(payload)