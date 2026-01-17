from PIL import Image, ImageEnhance, ImageOps
import os
from app.thread.pipline2 import Config as config

class ImageSelector:

    def __init__(self):
        self.scroll = 1
        self.contrast = 1
        self.brightness = 1

    def start(self):
        self.filePath = self.__chooseFile()
        self.baseImage = self.__initiateImage()
        self.__saveImage()
        return self.outputImage

    def __chooseFile(self):
        # ✅ Automatically pick the first image file from config.sourceFolder
        valid_exts = ('.jpg', '.jpeg', '.png', '.gif', '.webp')
        folder = config.sourceFolder

        for file in os.listdir(folder):
            if file.lower().endswith(valid_exts):
                return os.path.join(folder, file)

        raise FileNotFoundError("No image found in source folder")

    def __initiateImage(self):
        baseImage = Image.open(self.filePath)
        baseImage = ImageOps.grayscale(baseImage)

        original_width, original_height = baseImage.size
        if original_width < original_height:
            new_width = 800
            new_height = int(original_height * (800 / original_width))
        else:
            new_height = 800
            new_width = int(original_width * (800 / original_height))

        baseImage = baseImage.resize((new_width, new_height), Image.ANTIALIAS)
        return baseImage

    def __adjustImage(self, image):
        contrastEnhancer = ImageEnhance.Contrast(image)
        image = contrastEnhancer.enhance(self.contrast)

        brightnessEnhancer = ImageEnhance.Brightness(image)
        image = brightnessEnhancer.enhance(self.brightness)
        return image

    def __saveImage(self):
        image = self.__adjustImage(self.baseImage)

        output_dir = config.resultFolder
        base_name = os.path.splitext(os.path.basename(self.filePath))[0]
        self.outputImage = os.path.join(output_dir, f"{base_name}-modified.png")

        image.save(self.outputImage, "PNG")
        config.imgPath = self.outputImage
        print(f"[✅] Image saved automatically → {self.outputImage}")
