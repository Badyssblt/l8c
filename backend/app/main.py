from flask import Flask, jsonify, request
from workflows.executor import WorkflowExecutor
from flask_cors import CORS
import os
import json
from utils.format import to_snake_case


app = Flask(__name__)
CORS(app)

@app.route("/workflows", methods=["GET"])
def list_workflows():
    workflows_dir = "workflows/"
    workflows = []

    # Parcours des fichiers dans le dossier
    for filename in os.listdir(workflows_dir):
        if filename.endswith(".json"):
            file_path = os.path.join(workflows_dir, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                try:
                    workflows.append(json.load(f))
                except json.JSONDecodeError:
                    workflows.append({"error": f"Fichier {filename} invalide JSON"})
    
    return jsonify(workflows)

@app.post('/workflows')
def create_workflow():
    data = request.get_json(silent=True)
    SAVE_FOLDER = "workflows"

    if not data or "name" not in data:
        return jsonify({"error": "Missing workflow name"}), 400
    
    

    if data["name"] == "":
        return jsonify({'error': "Veuillez donner un nom de workflow"}), 500
    
    name = to_snake_case(data["name"])

    file_name = name + ".json"
    file_path = os.path.join(SAVE_FOLDER, file_name)

    with open(file_path, "w") as f:
        json.dump(data, f)

    return jsonify({"message": "Workflow created", "file": file_name}), 201

@app.route("/run/<workflow_name>", methods=["GET"])
def run_workflow(workflow_name):
    workflows_dir = "workflows/"
    matched_file = None

    # On cherche le fichier qui contient le workflow au bon nom
    for filename in os.listdir(workflows_dir):
        if filename.endswith(".json"):
            file_path = os.path.join(workflows_dir, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                try:
                    wf = json.load(f)
                    if wf.get("name") == workflow_name:
                        matched_file = file_path
                        break
                except json.JSONDecodeError:
                    continue

    if not matched_file:
        return jsonify({"error": f"Workflow '{workflow_name}' not found"}), 404

    # Exécuter avec le WorkflowExecutor
    executor = WorkflowExecutor(matched_file)
    result = executor.run()
    return jsonify(result)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
