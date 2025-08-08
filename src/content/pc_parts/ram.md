---
title: "RAM (Memory)"
description: "The PC's short-term memory - forgets everything when you turn it off"
---

## 🧠 1. Qu’est-ce que la RAM ?

**RAM** signifie **Random Access Memory** (mémoire à accès aléatoire).  
C’est une mémoire **rapide**, **volatile**, qui sert à stocker **temporairement** les données nécessaires au fonctionnement de l’ordinateur pendant qu’il est allumé.

- **Volatile** = son contenu est effacé dès que l'ordinateur s’éteint.
    
- **Accès aléatoire** = on peut accéder directement à n’importe quelle adresse mémoire, sans devoir parcourir la mémoire séquentiellement.
    

---

## 🎯 2. À quoi sert la RAM ?

La RAM est utilisée pour stocker :

- le **système d’exploitation** en cours d’exécution
    
- les **programmes ouverts** (navigateur, éditeur de texte…)
    
- les **données temporaires** manipulées par ces programmes
    
- les **buffers** pour les périphériques (carte graphique, disque, etc.)
    

> **Analogie :**  
> Disque dur = bibliothèque entière (lente mais énorme)  
> RAM = bureau de travail (rapide, mais limité)  
> Tu copies des livres sur ton bureau pour les lire rapidement, mais tu ne peux pas tout y mettre.

---

## ⚙️ 3. Comment fonctionne-t-elle techniquement ?

### a) Stockage de données

La RAM est composée de **cellules** (transistors + condensateurs) organisées en **lignes** et **colonnes**. Chaque cellule contient un **bit** (`0` ou `1`).

### b) Accès aux données

- Le **contrôleur mémoire** (souvent intégré au CPU) envoie une **adresse** à la RAM via le **bus d’adresse**.
    
- La RAM renvoie la **valeur** stockée à cette adresse via le **bus de données**.
    
- Tout cela se fait en **quelques nanosecondes**.
    

### c) Rafraîchissement (DRAM)

La majorité des RAM sont de type **DRAM** (Dynamic RAM), qui doivent être **rafraîchies** des milliers de fois par seconde car les cellules perdent leur charge (et donc l’information).

---

## 🧩 4. Rôle de la RAM dans l’exécution d’un programme

Voici le **chemin typique** d’un programme :

1. Tu ouvres une application → le programme est lu depuis le **disque dur** (lent)
    
2. Il est **copié en RAM**
    
3. Le **CPU lit les instructions et les données directement en RAM**
    
4. Les résultats intermédiaires sont stockés aussi en RAM
    
5. Quand tu fermes le programme → la RAM est libérée
    

> Tout programme exécuté doit être **chargé en RAM**, car le CPU ne peut **pas exécuter directement** du code depuis le disque dur.

## 📏 5. Caractéristiques importantes de la RAM

|Élément|Description|
|---|---|
|**Capacité**|Quantité totale (ex: 8 Go, 16 Go, 32 Go…)|
|**Fréquence**|Vitesse d'accès (ex: 3200 MHz, 5600 MHz…)|
|**Latence (CL)**|Délai pour accéder aux données|
|**Type**|DDR4, DDR5 (générations)|
|**Canaux**|Single / Dual / Quad Channel (parallélisme)|

---

## 💡 6. Ce qui se passe si tu n’as pas assez de RAM

- Le système utilise alors le **swap** (fichier ou partition sur le disque dur).
    
- Le disque est **des milliers de fois plus lent** que la RAM.
    
- Résultat : ton ordi **rame** ou **freeze** car il "swappe" trop.
