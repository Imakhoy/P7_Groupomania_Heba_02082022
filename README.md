Projet 7
Javascript full-stack.
Création d'un réseau social d'entreprise : Groupomania.
Backend config :
    
    Ouvrez un premier terminal
    Installez les dépendances :
    cd backend 
    npm install
    nodemon server.js

    Créez le fichier .env dans backend/ avec les données suivantes
    CLIENT_URL='http://localhost:3000'
    DB_CLUSTER='xxxxxxxxxxxxxxxxxxxx'
    DB_USERNAME='xxxxxxxxxx'
    DB_PASSWORD='xxxxxxxxxxx'
    DB_NAME='xxxxxxx'
    PORT=xxxx
    SECRET_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    SALT=xx 
    
    Et pour le frontend :
    REACT_APP_API_URL=http://localhost:5000/    
        
        Démarrer le server :
        npm start
        
        Frontend config :
        Ouvrez un deuxième terminal
        Installez les dépendances :
        cd frontend
        npm install
        npm start


    Fonctionnement global du site
    
    Les utilisateurs peuvent s’inscrire et/ou se connecter.

    Ils peuvent créer des posts avec un titre, un texte et une image (facultative). Seul l’utilisateur ayant créé le post peut le modifier ou le supprimer.

    Il y a également un système de like.

    Il faut être connecté en tant qu’administrateur pour avoir accès à la modification et la suppression de tous les posts.
