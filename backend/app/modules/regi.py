from flask import Blueprint,render_template,request,session,redirect,url_for,jsonify
from app.database import get_cursor,db
from app.all_dir.diretre12 import Static,template
from app.jwt.Create_tok import Create_token
from email_validator import validate_email

regi = Blueprint("regi",__name__,static_folder=Static,template_folder=template)

@regi.route('/api/register',methods=['POST'])
def register():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({"error": "Missing fields"}), 400
    cuor = True
    try:
        validate_email(username)
    except Exception:
        return jsonify({"error": "Email is not valid"})
    cursor = get_cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE username = %s",(username,))
        exitst = cursor.fetchone()
        if exitst:
            cursor.close()
            cuor = False
            return jsonify({"error": "Already exist user"})
        
        cursor.execute("INSERT INTO users (username,password)  VALUES (%s,%s) ",(username,password))
        db.commit()
        user_id = cursor.lastrowid
        
        # session['user_id'] = user_id
        token = Create_token(user_id,username)
        return jsonify({"token": token})
    except Exception as e:
        db.rollback()
        
        return jsonify({"error":"Somting went wrong"})
    finally:
        if cuor:
            cursor.close()
