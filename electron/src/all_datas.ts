import { Data } from "./types/data";

export const allDatas: Data[] = [
  {
    category: "Communication",
    steps: [
      {
        name: "Envoyer un email",
        type: "steps",
        key: "email",
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
        key: "zip",
        params: [
          {
            key: "input_folder",
            label: "Dossier à zipper",
            type: "folder"
          },
          {
            label: "Dossier de destination",
            key: "output_file",
            type: "folder"
          }
        ]
      },
      {
        name: "Déplacer un dossier",
        type: "steps",
        key: "move_folder",
        params: [
          {
            key: "input_folder",
            label: "Dossier source",
            component: "FolderSelector"
          },
          {
            label: "Dossier de destination",
            key: "output_folder",
            component: "FolderSelector"
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
        key: "web",
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
