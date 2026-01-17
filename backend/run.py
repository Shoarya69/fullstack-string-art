from app.app import web
# from app.extension import socketio

app = web()

if __name__=="__main__":
    app.run()