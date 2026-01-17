from flask import Blueprint,render_template,request,session,flash,redirect,url_for
from app.database import get_cursor,db
from app.all_dir.diretre12 import Static,template

regi = Blueprint("regi",__name__,static_folder=Static,template_folder=template)

@regi.route('/register',methods=['GET','POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        cursor = get_cursor()
        try:
            cursor.execute("SELECT * FROM users WHERE username = %s",(username,))
            exitst = cursor.fetchone()
            if exitst:
                flash('username already exist')
                cursor.close()
                return redirect(url_for('regi.register'))
            
            cursor.execute("INSERT INTO users (username,password)  VALUES (%s,%s) ",(username,password))
            db.commit()
            user_id = cursor.lastrowid
            
            session['user_id'] = user_id
            return redirect(url_for('home.home_page'))
        except Exception as e:
            db.rollback()
            flash(f"Database error: {e}", 'error')
            return redirect(url_for('regi.register'))
        finally:
            cursor.close()
    return render_template('register.html')