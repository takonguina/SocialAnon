# Utiliser une image de base avec Node
FROM node:20.10

# Créer le répertoire de travail
WORKDIR /frontend

# Copy the app package and package-lock.json file
COPY package*.json ./

# Installer les packages node
RUN npm install

# Copier le reste du code source dans le répertoire de travail
COPY . .

# Exposer le port sur lequel le front écoute
EXPOSE 8000

# Commande par défaut pour démarrer le front
CMD ["npm", "start"]