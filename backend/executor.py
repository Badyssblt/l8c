import json
import os
from steps.zip_step import ZipStep
from steps.web_step import WebStep
from steps.email_step import EmailStep

# Mapping step type → classe Python
STEP_CLASSES = {
    "zip": ZipStep,
    "web": WebStep,
    "email": EmailStep
}

class WorkflowExecutor:
    def __init__(self, workflow_file: str):
        self.workflow_file = workflow_file
        self.workflow_data = None

    def load_workflow(self):
        """Charge le workflow depuis un fichier JSON"""
        if not os.path.exists(self.workflow_file):
            print(f"Workflow non trouvé : {self.workflow_file}")
            raise FileNotFoundError(f"{self.workflow_file} not found")

        with open(self.workflow_file, "r") as f:
            self.workflow_data = json.load(f)
        print(f"Workflow chargé : {self.workflow_data.get('name', 'Unnamed')}")

    def run(self):
        """Exécute toutes les steps dans l’ordre"""
        if self.workflow_data is None:
            self.load_workflow()

        data = None
        for idx, step_def in enumerate(self.workflow_data.get("steps", []), start=1):
            step_type = step_def.get("type")
            params = step_def.get("params", {})

            print(f"Step {idx} : {step_type} avec params {params}")

            step_class = STEP_CLASSES.get(step_type)
            if not step_class:
                print(f"Step inconnu : {step_type}")
                return {"status": "error", "message": f"Unknown step {step_type}"}

            step_instance = step_class(**params)
            result = step_instance.run(data)
            print(f"Résultat step {idx} : {result}")

            # Passer le résultat au step suivant
            data = result

        print("Workflow terminé avec succès")
        return {"status": "ok", "final_result": data}


# Test rapide
if __name__ == "__main__":
    workflow_file = "./workflows/send_report.json"
    executor = WorkflowExecutor(workflow_file)
    result = executor.run()
    print(result)
