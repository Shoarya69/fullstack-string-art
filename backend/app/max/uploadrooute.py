from flask import session,current_app,flash,url_for
import os
from app.database import get_cursor,db
import uuid
from werkzeug.utils import secure_filename
from app.jwt.Verify_tok import decode_tocken
from app.jwt.decript import decrypt_payload

def ok(file,token):
    filename =secure_filename(file.filename)
    print(f"{filename}")
    ext = os.path.splitext(filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    upload_folder = current_app.config.get('UPLOAD_FOLDER')
    os.makedirs(upload_folder,exist_ok=True)
    save_path=os.path.join(upload_folder,filename)
    file.save(save_path)
    if token:
        playload = decode_tocken(token)
        try:
            playload_1 = decrypt_payload(playload['enc'])
            if playload_1['user_id']:
                user_id = playload_1['user_id']
                session['user_id']= user_id
                cursor = get_cursor()
                quary = "INSERT INTO data (user_id, image_URL) VALUES (%s, %s)"
                print("trying to save data in db")
                file_name = f"uploads/{filename}"
                cursor.execute(quary,(user_id,file_name))
                db.commit()
                image_id = cursor.lastrowid
                session['image_id'] = image_id
        except Exception as e:
            db.rollback()
            print("The Error is : ",e)
            flash("somthing is wrong",'error')
        finally:
            cursor.close()
    print("save data in db success")
    session['last_upload'] = f"uploads/{filename}"
    session['upload_button'] = 1
    print(session.get('last_upload'))
    flash("Image uploaded successfully", "success")
