from flask import Blueprint,request,redirect,flash
from app.all_dir.diretre12 import Static,template

error12 = Blueprint("error12",__name__,static_folder=Static,template_folder=template)

@error12.route("/413", methods=["GET", "POST"])
def handle_413():
    flash("⚠️ File too large! Maximum allowed size is 10 MB.", "error")
    return redirect(request.referrer or "/")

@error12.route("/toolarge")
def too_large():
    flash("⚠️ File too large! Maximum allowed size is 2 MB.", "error")
    return redirect(request.referrer or "/")

@error12.route("/toolarge2")
def too_large2():
    flash("⚠️ File too large! Maximum allowed size is 10 MB.", "error")
    return redirect(request.referrer or "/")