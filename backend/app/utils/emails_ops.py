import smtplib
from email.message import EmailMessage
import os

def send_email(to, subject, body, attachments=[],
               smtp_server="localhost", smtp_port=1025):

    msg = EmailMessage()
    msg["From"] = "no-reply@example.com"
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    # Ajouter les pièces jointes
    for filepath in attachments:
        if os.path.exists(filepath):
            with open(filepath, "rb") as f:
                data = f.read()
                filename = os.path.basename(filepath)
                msg.add_attachment(data, maintype="application", subtype="zip", filename=filename)

    # Envoyer le mail
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.send_message(msg)

    print(f"Mail envoyé à {to}")
