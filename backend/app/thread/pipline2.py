from flask import session





class Config:
	# -------- Paths --------
	sourceFolder = "#"
	resultFolder = "#"
	pathFolder = "#"
	createPathFile = True
	createResultImage = True


	# ---- Visualisation ----
	visualisationLineWidth = 2      # Default : 1
	visualisationLineAlpha = 50		# Default : 50 (255 is darker)
	visualisationWindowSize = 500 	# Default : 500
	visualisationDebug = False


	# ----- Calculation -----
	numberOfNails = 600				# Default : 300
	minDist = 30					# Default : 30
	maxLines = 5000					# Default : 4000
	calculationLineWeight = 40		# Default : 40
	sourcePhotoContrast = 1			# Default : 1 (0 is gray, no max)
	sourcePhotoBrightness = 1		# Default : 1 (0 is black, no max)


	# -------- Batch --------
	batchVariations = 0
	batchLines = 		{"active": False, "data": [2000 ,2500]}
	batchWeights = 		{"active": False, "data": [35 ,40 ,45, 50, 55]}
	batchContrasts = 	{"active": False, "data": [0.2, 0.5, 0.8]}
	batchBrignthess =	{"active": False, "data": [0.7, 1, 1.3]}


	# -------- Source image --------
	imgPath = "#"