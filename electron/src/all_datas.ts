import { Data } from "./types/data";

export const allDatas: Data[] = [
  {
    category: "Communication",
    steps: [
      {
        name: "Envoyer un email",
        type: "steps",
        params: [
          {
            key: "to",
            label: "Destinataire",
            type: "text"
          },
          {
            key: "subject",
            label: "Sujet",
            type: "text"
          },
          {
            key: "body",
            label: "Contenu du mail",
            component: "MailComponent"
          },
          {
            key: "attachments",
            type: "file"
          }
        ]
      },
    ],
  },
  {
    category: "Fichiers & Données",
    steps: [
      {
        name: "Zipper un dossier",
        type: "steps",
        params: [
          {
            key: "input_folder",
            label: "Dossier à zipper",
            type: "text"
          },
          {
            label: "Dossier de destination",
            key: "output_file",
            type: "text"
          }
        ]
      },
    ],
  },
  {
    category: "Web & API",
    steps: [
      {
        name: "Appeler une API",
        type: "steps",
        params: [
          {
            label: "URL",
            key: "url",
            type: "text"
          },
          {
            label: "Méthode",
            key: "method",
            type: "text"
          },
          {
            label: "Body",
            key: "body",
            type: "text"
          }
        ]
      },
    ],
  },
];
