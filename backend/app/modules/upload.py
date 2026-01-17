from flask import Blueprint,request,current_app,session,url_for,flash,redirect,jsonify
from app.allow.alowed_files import allowed_file
from app.max.uploadrooute import ok
from app.all_dir.diretre12 import Static,template
from app.cloudeio import cloud_s
upload = Blueprint("upload",__name__,static_folder=Static,template_folder=template)




@upload.route('/api/upload', methods=['POST'])
def api_upload():
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image file"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"success": False, "message": "Empty filename"}), 400

    if not allowed_file(file.filename):
        return jsonify({"success": False, "message": "File type not allowed"}), 400

    # 🔥 EXISTING LOGIC (DO NOT TOUCH)
    ok(file)
    try:
        cloud_s(file)
    except Exception as e:
        print(e)
    # 🔑 FINAL OUTPUT LOCATION
    image_path = session.get('last_upload')

    if not image_path:
        return jsonify({
            "success": False,
            "message": "Image processed but path not found"
        }), 500

    return jsonify({
        "success": True,
        "imageUrl": f"http://localhost:5000/static/{image_path}"
    })
