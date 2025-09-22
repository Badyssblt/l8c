import shutil

class MoveFileStep:
    def __init__(self, input_folder, output_folder):
        self.input_folder = input_folder
        self.output_folder = output_folder

    def run(self):
        shutil.move(self.input_folder, self.output_folder)
        print("Dossier déplacer avec succès")
    
