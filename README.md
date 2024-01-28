**Notes TP 1**

**Étape 1 :**

J’ai rajouté des consoles log :

1/pour le post pour vérifier s’il fait bien la requête post

2 / pour le get pour vérifier s’il fait bien la requête get

**Etape 2 :**

J’ai créé un dossier data dans lequel j’ai mis un fichier blockchain.json qui contient des données

après j’ai fait la fonction find blocks qui permettent de lire le fichier json et afficher son contenu avec la requête get

**Étape 3 :**

j’ai créé les fonctions createblock qui permet d’ajouter des blocs dans le fichier json avec la requête post et getdate qui récupère et affiche la date du jour.

**Étape 4 :**

J’ai créé avec node crypto la fonction qui permet de faire le hachage et j’ai modifié la fonction createblock pour ajouter le champ “hash”. J’ai aussi créé la fonction findlastblock qui permet de trouver le dernier bloc qui a été ajouté.

**Pour aller plus loin :**


J’ai commencé par faire la fonction verifyblock qui permet de vérifier l’intégralité d’une chaîne. Mais elle ne marche pas correctement, je ne sais pas pourquoi.

J’ai également créé la fonction findblock(block id) qui permet de retourner un bloc à partir de son id Si le bloc n’est plus fiable, un retour Json affichant cet état doit être retourné.

J’ai ajouté aussi deux cases dans le fichier server.js sous forme de requête get pour pouvoir tester si ces deux fonctions marchent correctement ou pas.

**Difficultés rencontrées :**


concernant l’étape d’aller plus loin j’ai créé la fonction verifyblocks mais je n’ai pas compris pourquoi à chaque fois, j’ai un false qui s’affiche comme résultat dans tous les cas.

J’ai eu des difficultés aussi avec le hachage vu que je ne savais pas comment marchait le module crypto de node, mais avec la documentation j’ai pu comprendre et créer la fonction “generateSHA256”.


**Compétences acquises :**

Ayant déjà utilisé Node js dans mon stage de l’année dernière et la sae de cette année je connais déjà plusieurs notions telles que les promesses mais j’ai pu en découvrir d’autre il s’agit du module crypto de node que je connaissais pas auparavant. 
