from flask import Blueprint,render_template,session,request,url_for,redirect,flash,jsonify
from app.database import get_cursor
from app.all_dir.diretre12 import Static,template
from app.jwt.Create_tok import Create_token
auth = Blueprint("auth",__name__,static_folder=Static,template_folder=template)

@auth.route('/api/auth',methods=['POST'])
def auth_page():
    
    username = request.form['username']
    password = request.form['password']
    try:
        cursor = get_cursor()

        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s",(username,password))
        user = cursor.fetchone()
        cursor.close()

        if user:
            # session['user_id'] = user['id']
            token = Create_token( user['id'],user['username'])
            
            return jsonify({"token": token})
        else:
            return jsonify({"error": "either username or password is incorrect"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Somting went wrong"})


@auth.route('/logout',methods=['POST'])
def logout():
    session.clear()
    flash('success fully log out')
    return jsonify({"logout":"succefully"})