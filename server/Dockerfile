FROM python:3.9-slim

# Mettre à jour les paquets de base
RUN apt-get update && apt-get install -y --no-install-recommends build-essential && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances manuellement
RUN pip install --no-cache-dir pandas fastapi uvicorn numpy textdistance scikit-learn fastparquet

# Copier le reste de l'application
COPY . .

# Copier les données (si nécessaire)
COPY ./data /app/data

# Lancer l'application avec Uvicorn
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--reload"]
