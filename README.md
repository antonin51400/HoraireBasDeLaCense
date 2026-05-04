# Pointeuse connectée — SCEA du Bas de la CENSE

Application web statique déployable sur GitHub Pages, connectée à Firebase Authentication et Cloud Firestore.

## Fonctions incluses

### Salarié
- Connexion sécurisée par email / mot de passe.
- Création de compte uniquement si l'email a été invité par l'administrateur.
- Pointage arrivée / départ.
- Déduction de pause en minutes.
- Déclaration manuelle d'une journée.
- Demande de congés avec calcul automatique des jours ouvrés lundi-vendredi.
- Consultation des congés disponibles, pris et en attente.
- Consultation de l'historique des heures.

### Administrateur
- Création d'invitations salariés.
- Tableau des salariés actifs.
- Modification des compteurs de congés, heures hebdomadaires et statut actif/inactif.
- Lecture des pointages.
- Validation ou réouverture des heures.
- Acceptation ou refus des congés.
- Mise à jour automatique des compteurs lors de l'acceptation d'un congé.
- Export CSV des heures.

## Architecture

```text
GitHub Pages
  └── index.html / CSS / JS
        ├── Firebase Authentication : comptes utilisateurs
        └── Cloud Firestore : heures, congés, profils, invitations
```

## Déploiement Firebase

### 1. Créer le projet Firebase

1. Aller sur Firebase Console.
2. Créer un projet, par exemple `scea-bas-cense-pointeuse`.
3. Ajouter une application Web.
4. Copier la configuration Firebase.
5. Remplacer les valeurs dans `assets/firebase-config.js`.

### 2. Activer l'authentification

Dans Firebase :

```text
Build > Authentication > Sign-in method > Email/Password > Enable
```

### 3. Créer la base Firestore

Dans Firebase :

```text
Build > Firestore Database > Create database
```

Choisir une région européenne si possible pour une exploitation française.

### 4. Créer le premier administrateur

Comme un site statique GitHub Pages ne peut pas utiliser Firebase Admin SDK, le premier admin doit être créé manuellement.

1. Dans `Authentication > Users`, ajouter un utilisateur avec votre email et un mot de passe.
2. Copier son `UID`.
3. Dans `Firestore Database`, créer la collection `users`.
4. Créer un document dont l'ID est exactement le `UID`.
5. Ajouter les champs suivants :

| Champ | Type | Valeur exemple |
|---|---:|---|
| `active` | boolean | `true` |
| `role` | string | `admin` |
| `email` | string | `votre.email@email.fr` |
| `displayName` | string | `Administrateur` |
| `companyId` | string | `main` |
| `weeklyHours` | number | `0` |
| `leaveBalanceDays` | number | `0` |
| `leaveTakenDays` | number | `0` |

### 5. Publier les règles Firestore

1. Ouvrir `firestore.rules`.
2. Copier le contenu.
3. Firebase Console > Firestore Database > Rules.
4. Coller les règles.
5. Cliquer sur `Publish`.

## Déploiement GitHub Pages

1. Créer un dépôt GitHub, par exemple `pointeuse-scea-bas-cense`.
2. Envoyer tous les fichiers du dossier dans le dépôt.
3. Aller dans `Settings > Pages`.
4. Source : `Deploy from a branch`.
5. Branch : `main`.
6. Folder : `/root`.
7. Attendre l'URL GitHub Pages.

## Utilisation

### Ajouter un salarié

1. Se connecter avec le compte administrateur.
2. Dans `Inviter un salarié`, saisir :
   - nom complet ;
   - email ;
   - heures/semaine ;
   - solde initial de congés.
3. Le salarié va sur le site.
4. Il clique sur `Créer mon accès salarié` avec exactement le même email.

### Valider les heures

1. Le salarié pointe ou déclare une journée.
2. Le pointage passe en statut `À valider`.
3. L'administrateur clique sur `Valider`.

### Gérer les congés

1. Le salarié fait une demande de congé.
2. L'administrateur accepte ou refuse.
3. Si accepté, le compteur de congés disponibles diminue automatiquement et les congés pris augmentent.

## Limites à connaître

- Le calcul des congés compte les jours ouvrés du lundi au vendredi, sans intégrer les jours fériés français.
- L'application ne remplace pas une validation juridique, paie ou convention collective.
- Pour une utilisation officielle, il faut vérifier la conformité RGPD, la conservation des données, la traçabilité et les obligations liées au droit du travail.
- GitHub Pages héberge uniquement les fichiers statiques. La sécurité réelle est assurée par Firebase Auth et les règles Firestore.

## Fichiers

```text
index.html                       Interface principale
assets/styles.css                Design
assets/app.js                    Logique applicative Firebase
assets/firebase-config.js        Configuration Firebase à compléter
firestore.rules                  Règles de sécurité Firestore
.nojekyll                        Désactive le build Jekyll GitHub Pages
```
