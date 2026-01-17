import app.thread.src.Pipeline as Pipeline
from app.thread.pipline2 import Config
import os
 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


	# Examples:
	# imgPath = "./src/Inputs/Elizabeth.png"
	# imgPath = "./src/Inputs/Jesus.png"
	# imgPath = "./src/Inputs/AbrahamLincoln.png"
	# imgPath = "./src/Inputs/MonaLisa.png"

def art(input,output,img_path):
	Config.sourceFolder = input
	Config.resultFolder = output
	Config.pathFolder=os.path.join(BASE_DIR,'src','paths')
	Config.imgPath = img_path
	# Config.maxLines = mxli
	# Config.calculationLineWeight = liwt
	# Config.numberOfNails = pins
	Pipeline.Generate()


# if __name__ == "__main__":
# 	Pipeline.Generate()
