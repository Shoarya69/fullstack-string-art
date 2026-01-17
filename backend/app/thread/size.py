from PIL import Image
from flask import session

def resize_image(input_path, output_path):
   
    img = Image.open(input_path)
    
    # Crop to square first (center crop)
    width, height = img.size
    min_side = min(width, height)
    left = (width - min_side) // 2
    top = (height - min_side) // 2
    right = left + min_side
    bottom = top + min_side
    img = img.crop((left, top, right, bottom))
    
    # Resize to desired size
    img = img.resize((min_side,min_side), Image.LANCZOS)
    
    # Save the new image
    img.save(output_path)
    if session.get('upload_button'):
                session['upload_button'] = 0
    print(f"Image saved to {output_path})")

def resize_image1(image, output_path):
   
    img = Image.open(image)    
    # Crop to square first (center crop)
    width, height = img.size
    min_side = min(width, height)
    left = (width - min_side) // 2
    top = (height - min_side) // 2
    right = left + min_side
    bottom = top + min_side
    img = img.crop((left, top, right, bottom))
    
    # Resize to desired size
    img = img.resize((min_side,min_side), Image.LANCZOS)
    
    # Save the new image
    img.save(output_path)
    if session.get('upload_button'):
                session['upload_button'] = 0
    print(f"Image saved to {output_path})")
