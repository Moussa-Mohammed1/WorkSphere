# 🏢 WorkSphere - Gestion Interactive du Personnel

Une application web moderne et intuitive pour la gestion visuelle et interactive du personnel sur un plan d'étage en temps réel.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 À Propos

WorkSphere est une solution innovante développée pour faciliter la gestion et l'organisation du personnel au sein des espaces de travail. L'application offre une interface graphique interactive permettant de visualiser et gérer la répartition des employés sur un plan d'étage, tout en respectant les contraintes liées aux rôles et zones autorisées.

### Contexte du Projet

Ce projet répond aux besoins des entreprises qui souhaite disposer d'un outil de gestion visuelle du personnel intégrant :
- La gestion en temps réel des affectations
- Le respect des règles de sécurité et d'accès
- Une expérience utilisateur fluide et responsive
- La centralisation des données du personnel

## ✨ Fonctionnalités

### Gestion du Personnel
- ✅ **Ajout d'employés** avec formulaire complet (nom, rôle, photo, email, téléphone)
- ✅ **Gestion des expériences professionnelles** avec formulaire dynamique
- ✅ **Prévisualisation de photo** dans la modale d'ajout
- ✅ **Profils détaillés** avec historique professionnel complet
- ✅ **Validation des données** avec regex pour email, téléphone et dates

### Plan d'Étage Interactif
L'application gère 6 zones distinctes :
- 🏛️ **Salle de conférence** (capacité : 8 personnes)
- 📞 **Réception** (capacité : 12 personnes)
- 💻 **Salle des serveurs** (capacité : 6 personnes)
- 🔒 **Salle de sécurité** (capacité : 6 personnes)
- 👥 **Salle du personnel** (capacité : 6 personnes)
- 📦 **Salle d'archives** (capacité : 3 personnes)

### Fonctionnalités Avancées
- 🎯 **Affectation intelligente** : bouton "+" dans chaque zone pour assigner un employé éligible
- 🔄 **Désaffectation rapide** : bouton "X" pour retirer un employé d'une zone
- 📊 **Filtrage par rôle** : tri des employés non assignés par rôle
- 🚨 **Alertes visuelles** : zones vides obligatoires en rouge pâle avec animation
- 📱 **Design responsive** : adapté pour desktop, tablette et mobile
- 💾 **Persistance des données** : utilisation de localStorage
- ✨ **Animations CSS** : transitions fluides et animations subtiles
- 🔔 **Notifications** : retours visuels pour les actions utilisateur

## 🛠 Technologies Utilisées

- **HTML5** : Structure sémantique de l'application
- **CSS3** : Stylisation moderne avec animations
- **TailwindCSS** : Framework CSS utility-first
- **JavaScript ES6+** : Logique métier et interactions
- **LocalStorage API** : Persistance des données
- **Font Awesome** : Bibliothèque d'icônes
- **Git** : Gestion de version

## 💻 Utilisation

### Ajouter un Employé

1. Cliquer sur le bouton **"Add New Worker"**
2. Remplir le formulaire avec les informations requises
3. Cliquer sur **"Save"** pour valider

### Affecter un Employé à une Zone

1. Cliquer sur le bouton **"+"** dans la zone souhaitée
2. Sélectionner un employé parmi ceux éligibles
3. Cliquer sur **"Assign"** pour confirmer

### Consulter un Profil

- **Employé non assigné** : Cliquer sur la carte dans la liste latérale
- **Employé assigné** : Cliquer sur l'avatar dans la zone

### Désaffecter un Employé

1. Cliquer sur l'avatar de l'employé dans sa zone
2. Cliquer sur le bouton **"X"** en haut à droite du profil

## 🏗 Architecture

```
worksphere/
│
├── index.html              # Structure HTML principale
├── style.css               # Styles personnalisés
├── app.js               # Logique JavaScript
├── images/wood.jpg              # Image du plan d'étage
└── README.md              # Documentation
```

### Structure des Données

```javascript
{
  id: timestamp,
  nom: string,
  role: string,
  image: url,
  email: string,
  phone: string,
  currentStatus: "assigned" | "unassigned",
  currentRoom: string,
  possibleRoom: array,
  experiences: [
    {
      title: string,
      company: string,
      startDate: year,
      endDate: year | "present",
      description: string
    }
  ]
}
```

## 📜 Règles Métier

### Restrictions d'Accès par Rôle

| Rôle | Zones Autorisées |
|------|------------------|
| **Réceptionniste** | Réception uniquement |
| **Technicien IT** | Salle des serveurs uniquement |
| **Agent de sécurité** | Salle de sécurité uniquement |
| **Manager** | Toutes les zones |
| **Nettoyage** | Toutes sauf Salle d'archives |
| **Autres rôles** | Salle de conférence, Salle du personnel, Salle d'archives |

### Capacités Maximum

- Réception : 12 personnes
- Salle de conférence : 8 personnes
- Salle des serveurs : 6 personnes
- Salle de sécurité : 6 personnes
- Salle du personnel : 6 personnes
- Salle d'archives : 3 personnes

### Zones Obligatoires

Les zones suivantes doivent être occupées (indication visuelle rouge si vides) :
- Réception
- Salle des serveurs
- Salle de sécurité
- Salle d'archives

## 📸 Captures d'Écran
<img width="1919" height="1079" alt="Capture" src="https://github.com/user-attachments/assets/33bc87f0-5b1d-4ecb-bc89-b35a13ec7ca7" />


## 📝 Validation

Le code a été validé avec :
- ✅ [W3C HTML Validator](https://validator.w3.org/)

## 👨‍💻 Auteur

**Moussa Mohammed**
- GitHub: [Moussa-Mohammed1](https://github.com/Moussa-Mohammed1)
- LinkedIn: [Moussa Mohammed](https://www.linkedin.com/in/mohammed-moussa-1baa36358)



