from flask import Blueprint,render_template,session,url_for,redirect,flash
from app.all_dir.diretre12 import Static,template
from app.max.historyroute import lol

history = Blueprint("history",__name__,static_folder=Static,template_folder=template)

@history.route("/history")
def history_page():
    if "user_id" not in session:
        flash("Please login first for this operation")
        return redirect(url_for("auth.auth_page"))
    if session.get("user_id"):
        creations = lol()
        print(creations)
        
        return render_template("pc/history.html",creations = creations)
    # return render_template("history.html")