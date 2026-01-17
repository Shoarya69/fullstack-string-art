from flask import session
from app.database import get_cursor

def lol():
    if session.get("user_id"):
        try:
            cursor = get_cursor()
            u = session.get("user_id")
            quary = """SELECT dc.imagecre_id AS creation_id,
                        i_in.image_URL AS input_image,
                        i_out.imagecre_URL AS output_image
                    FROM datacre dc
                    LEFT JOIN data i_in 
                        ON dc.image_id = i_in.image_id
                    LEFT JOIN datacre i_out 
                        ON dc.imagecre_id = i_out.imagecre_id
                    WHERE dc.user_id = %s
                    ORDER BY dc.imagecre_id DESC;"""
            cursor.execute(quary,(u,))
            creations = cursor.fetchall()
            print("DEBUG: Total rows fetched =", len(creations))
            if creations:
                print("DEBUG: Keys in one row =", creations[0].keys())
                print("DEBUG: First row sample =", creations[0])
        except Exception as e:
            print("on fetching history there is some problem:- ",e)
        finally:
            cursor.close()
            
        if creations:
            return creations
        else:
            return []
                    
                            