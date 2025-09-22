from utils.emails_ops import send_email


class EmailStep:
    """
    Step pour envoyer un email avec ou sans pièce jointe
    """

    def __init__(self, to, subject, body, attachments=[],
                 smtp_server="smtp.gmail.com", smtp_port=587,
                 username=None, password=None):
        self.to = to
        self.subject = subject
        self.body = body
        self.attachments = attachments
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.username = username
        self.password = password

    def run(self, data=None):
        try:
            send_email(self.to, self.subject, self.body, self.attachments,
                       self.smtp_server, self.smtp_port)
            print(f"Email envoyé à {self.to}")
            return {"status": "ok"}
        except Exception as e:
            print(f"Erreur EmailStep: {e}")
            return {"status": "error", "message": str(e)}
