import re

def to_snake_case(s):
    # Remplacer les espaces et tirets par des underscores
    s = re.sub(r'[\s\-]+', '_', s)
    # Ajouter un underscore entre une minuscule et une majuscule (camelCase → snake_case)
    s = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', s)
    # Tout en minuscules
    s = s.lower()
    # Supprimer caractères non alphanumériques (sauf _)
    s = re.sub(r'[^a-z0-9_]', '', s)
    # Supprimer underscores multiples
    s = re.sub(r'_+', '_', s)
    # Supprimer _ au début ou à la fin
    s = s.strip('_')
    return s


