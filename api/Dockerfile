# Utiliser une image de base avec Python
FROM python:3.11

# Créer le répertoire de travail
WORKDIR /api

# Copier les fichiers nécessaires pour l'installation des dépendances
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code source dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'API écoute
EXPOSE 3000

# Commande par défaut pour démarrer l'API
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "3000"]
