FORUM GROUPOMANIA

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Ils veulent que les employés écrivent et /ou partagent des articles avec leurs collègues sur des sujets qui les interréssent.

 - le client utilise une base de données relationnelles qui se manipule avec le langage SQL pour le stockage de données.
 - faire en sorte que la web app puisse se connecter et se déconnecter à l’application et que la session de l’utilisateur persiste pendant qu’il est connecté.
 - le projet doit être codé en Javascript, donc n'utilise pas le framework Symfony. Enfin, tes pages devront respecter les standards WCAG.


FABRIQUE AVEC

Le projet est développé avec HTML, CSS, Javascript, React, Node.js, MySQL.


PRE-REQUIS

`NodeJs` `Gestionnaire de base de données`

Exemples: `WampServer` https://www.wampserver.com/#wampserver-64-bits-php-5-6-25-php-7 ou `Mamp` https://downloads.mamp.info/MAMP-PRO/releases/5.7/MAMP_MAMP_PRO_5.7.pkg

INSTALLATION DE LA BASE DE DONNEE

Créer une base de donnée vierge avec les droits de créations de l'utilisateur qui sera enregistrer dans le fichier de configuration database/mysql.js

Modifier le fichier database/mysql.js 

    host: "adresse de la base de donnée"
    user: "User de la base de donnée"
    password: "Mot de passe de connection de la base de donnée"
    database: "Nom de la base de donnée"
    connectionLimit: "Temps impartis pour la durée de connection"
    port: "port d'ecoute de la base de donnée" (par défaut 3306 sur phpMyAdmin)

Pour ajouter un administrateur mettre 1 dans la colonne users_admin sur la ligne de l'utilisateur concerné


INSTALLATION

- ouvrer le dossier téléchargé dans votre IDE

Dans votre terminal :

- aller dans le dossier backend avec la commande `cd backend` 
- installer le node package manager avec la commande `npm install` (cela installera les dependences utilisés pour le projet)
- aller dans le dossier frontend/groupomania avec la commande `cd frontend/groupomania`
- installer le node package manager avec la commande `npm install` (cela installera les dependences utilisés pour le projet)


DEMARRAGE

Dans votre terminal :

- Lancer votre base de donnée
- Dans le dossier backend lancer la commande `npm run dev`
- Dans le dossier frontend/groupomania lancer la commande `npm start`
