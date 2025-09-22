from flask import Flask, jsonify, request
from workflows.executor import WorkflowExecutor
from flask_cors import CORS
import os
import json
from utils.format import to_snake_case


app = Flask(__name__)
CORS(app)  # ou CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/workflows", methods=["GET"])
def list_workflows():
    return jsonify(os.listdir("workflows/"))

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
    executor = WorkflowExecutor(f"workflows/{workflow_name}")
    result = executor.run()
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
