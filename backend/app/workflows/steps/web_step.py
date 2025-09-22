import requests

class WebStep:

    def __init__(self, url: str, method: str = "GET", headers: dict = None, body: dict = None):
        self.url = url
        self.method = method
        self.headers = headers
        self.body = body


    def run(self, data=None):
        """
        Exécute la requête HTTP
        data : peut contenir des informations d'un step précédent (optionnel)
        """
        try:
            if self.method == "GET":
                response = requests.get(self.url, headers=self.headers)
            elif self.method == "POST":
                response = requests.post(self.url, headers=self.headers, json=self.body)
            else:
                print(f"Méthode HTTP non supportée: {self.method}")
                return {"status": "error", "message": f"Unsupported method {self.method}"}

            response.raise_for_status()  # déclenche une exception si erreur HTTP
            result = response.json() if "application/json" in response.headers.get("Content-Type", "") else response.text
            print(f"Requête HTTP réussie: {self.url}")
            return {"status": "ok", "result": result}

        except Exception as e:
            print(f"Erreur dans WebStep: {e}")
            return {"status": "error", "message": str(e)}