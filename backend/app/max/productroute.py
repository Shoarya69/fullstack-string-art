import os
from flask import session, current_app,flash
from app.thread.size import resize_image
from app.thread.ThreadArt import art
from app.database import get_cursor,db

def kio(image_name):
    try:
        cursor = get_cursor()
        quary = "INSERT INTO datacre (user_id,image_id,imagecre_URL) VALUES (%s, %s, %s)"
        cursor.execute(quary,(session['user_id'],session['image_id'],f"{image_name}"))
        print("trying to save data in db")
        db.commit()
    except Exception as e:
        db.rollback()
        print("The Error is : ",e)
        flash("somthing is wrong in database",'error')
    finally:
        cursor.close()

def fun():
    image_path = os.path.join(current_app.config.get('Size'), session['last_upload'])
    resize = current_app.config.get('RESIZE')
    os.makedirs(resize,exist_ok=True)
    path2 = os.path.join(resize)
    path3 = os.path.join(resize, os.path.basename(image_path))

    resize_image(image_path,path3)
    output_path=os.path.join(current_app.config.get('Size'),'output')
    
    string_n = session.get("number_str", 2500)
    nail_n = session.get("number_Nails", 300)

    art(path2,output_path,path3,string_n,nail_n)
    image_name = os.path.basename(image_path)
    session['output_img']=output_path+"/out"+f"{image_name}"
    name_only, _ = os.path.splitext(image_name)
    return f"out{name_only}.png"
