from flask import session,current_app,flash
import os
from app.database import get_cursor,db
import uuid
from werkzeug.utils import secure_filename

def gog(file):
    filename = secure_filename(file.filename)
    ext = os.path.splitext(filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    upload_folder = current_app.config.get('Edting_upload')
    os.makedirs(upload_folder,exist_ok=True)
    save_path = os.path.join(upload_folder,filename)
    file.save(save_path)
    if session.get('user_id'):
        try:
            user_id = session['user_id']
            cursor = get_cursor()
            quary = "INSERT INTO edit (user_id, image_URL) VALUES (%s, %s)"
            print("trying to save data in db")
            cursor.execute(quary,(user_id,filename))
            db.commit()
            image_id = cursor.lastrowid
            session['edit_id'] = image_id
        except Exception as e:
            db.rollback()
            print("The Error is : ",e)
            flash("somthing is wrong",'error')
        finally:
            cursor.close()
    print("save data of edting in edting'_upoad folder")
    session['ed_upload'] = f"ed_upload/{filename}"
    session['ed_route'] = save_path

def gog2(output):
    f = output
    u = session.get('user_id')
    i = session.get("edit_id")
    try:
        cursor = get_cursor()
        quary = "INSERT INTO editcre (user_id,image_id,imagecre_URl) VALUES (%s,%s,%s)"
        print("try to add your output data")
        cursor.execute(quary,(u,i,f))
        db.commit()
    except Exception as e:
        db.rollback()
        print("The error is : ",e)
        flash("Somthing went wrong",'error')
    finally:
        cursor.close()
    print("This is gog2 ending for table for edit commite")