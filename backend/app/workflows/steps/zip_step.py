import shutil
import os

class ZipStep:
    """
    Step pour zipper un dossier.
    """

    def __init__(self, input_folder: str, output_file: str):
        self.input_folder = input_folder
        self.output_file = output_file

    def run(self, data=None):
        """
        Exécute le step.
        data : peut contenir des données transmises par le step précédent
        """
        try:
            if not os.path.exists(self.input_folder):
                print(f"Dossier source inexistant : {self.input_folder}")
                return {"status": "error", "message": "input_folder not found"}

            # Supprimer le zip existant si nécessaire
            if os.path.exists(self.output_file):
                os.remove(self.output_file)

            # Création du zip
            shutil.make_archive(self.output_file.replace(".zip", ""), 'zip', self.input_folder)
            print(f"Zip créé : {self.output_file}")
            return {"status": "ok", "zip_path": self.output_file}

        except Exception as e:
            print(f"Erreur dans ZipStep : {e}")
            return {"status": "error", "message": str(e)}

# Test direct du step
if __name__ == "__main__":
    step = ZipStep("input_reports", "output/report.zip")
    result = step.run()
    print(result)
