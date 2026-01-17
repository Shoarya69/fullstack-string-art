from flask import Blueprint, request, session, jsonify, send_file, current_app
from app.max.productroute import fun
import os
from app.create_json.txt_to_json import create_json
from app.all_dir.diretre12 import json_p
from app.cloudeio import cloud_s
product = Blueprint("product", __name__)

# ==============================
# API: PROCESS STRING ART
# ==============================
@product.route('/api/process', methods=['POST'])
def api_process_image():
    if not session.get('last_upload'):
        return jsonify({
            "success": False,
            "message": "No uploaded image found"
        }), 400

    try:
        print("🔥 String art processing started")

        # fun() generates string art and RETURNS OUTPUT FILENAME
        # IMPORTANT: fun() must return something like: outxxxx.png
        output_filename = fun()

        image_path = os.path.join(
            current_app.root_path,
            'static',
            'output',
            output_filename
        )

        print("🔍 Checking:", image_path)

        if not os.path.exists(image_path):
            print("❌ File NOT found:", image_path)
            return jsonify({
                "success": False,
                "message": "Generated image not found on server"
            }), 500

        # Save for download routes
        session['result_image'] = image_path

        image_url = f"/static/resize/{output_filename}"

        print("✅ String art generated:", image_url)

        return jsonify({
            "success": True,
            "imageUrl": image_url
        })

    except Exception as e:
        print("❌ Processing error:", e)
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ==============================
# DOWNLOAD IMAGE
# ==============================
@product.route('/dwimage', methods=['GET'])
def download_image():
    image_path = session.get('result_image')
    try:
        cloud_s(image_path)
    except Exception as e:
        print(e)
    if not image_path or not os.path.exists(image_path):
        return "Image not found", 404

    return send_file(image_path, as_attachment=True)


# ==============================
# DOWNLOAD REPORT
# ==============================
@product.route('/dwreport', methods=['GET'])
def download_report():
    report_path = current_app.config.get('report')

    if not report_path or not os.path.exists(report_path):
        return "Report not found", 404

    return send_file(report_path, as_attachment=True)

# ==============================
# DOWNLOAD JSON REPORT
# ==============================

@product.route('/dwjson', methods=['GET'])
def download_json():
    report_path = current_app.config.get('report')
    json_path = json_p
    try:
        cloud_s(json_path)
    except Exception as e:
        print(e)   
    if not report_path or not os.path.exists(report_path):
        return "Report not found", 404
    
    path = create_json(report_path,json_path)
    return send_file(path, as_attachment=True)