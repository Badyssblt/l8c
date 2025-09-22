from flask import Flask, jsonify
from executor import WorkflowExecutor

app = Flask(__name__)

@app.route("/workflows", methods=["GET"])
def list_workflows():
    import os
    return jsonify(os.listdir("workflows/"))

@app.route("/run/<workflow_name>", methods=["GET"])
def run_workflow(workflow_name):
    executor = WorkflowExecutor(f"workflows/{workflow_name}")
    result = executor.run()
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5000)  # serveur sur localhost:5000
