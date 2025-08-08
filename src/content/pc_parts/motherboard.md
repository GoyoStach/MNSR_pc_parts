---
title: "Motherboard"
description: "The PC's nervous system - connects everything and judges your cable management"
id: 619
---

## 🧩 **Rôle principal de la carte mère**

La carte mère (ou **motherboard**) est une **plaque de circuits imprimés** qui :

1. **Connecte** tous les composants (CPU, RAM, GPU, SSD, etc.)
    
2. **Distribue l’alimentation électrique**
    
3. **Permet la communication entre les composants** via différents **bus**
    
4. Contient des **circuits de contrôle**, **firmwares**, et parfois des **périphériques intégrés**
    

---

## ⚡ Fournit-elle l’électricité ?

### ✅ **Elle distribue l’électricité**

- La **source d’alimentation (PSU)** est **externe à la carte mère**.
    
- Le **PSU** se connecte à la carte mère via des **connecteurs 24 pins (ATX)** et **CPU 8 pins**.
    
- La carte mère **redirige cette électricité** vers les composants (CPU, RAM, ventilateurs, etc.) via des **régulateurs de tension** appelés **VRM (Voltage Regulator Module)**.
    

### ⚠️ Mais :

> **Elle ne génère pas elle-même le courant**. Elle agit comme un **distributeur et régulateur**.

---

## 🔧 Fonctions principales détaillées

### 1. **Distribution d’énergie**

- Via des pistes en cuivre + VRMs :
    
    - CPU : reçoit une tension régulée (ex : 1.2V, 1.4V…)
        
    - RAM, chipset, ports PCIe, etc. reçoivent ce qu’ils demandent.
        
- Gère les **protections électriques** (surtension, court-circuit).
    

---

### 2. **Connexion physique des composants**

- Prises (sockets) pour :
    
    - **CPU** (ex : LGA 1700)
        
    - **RAM** (slots DIMM)
        
    - **Cartes d’extension** (PCIe pour GPU, cartes son, etc.)
        
    - **Stockage** (SATA, NVMe)
        
    - **Alimentation** (24-pin, 8-pin CPU, etc.)
        

---

### 3. **Communication via des bus**

- **Bus mémoire** : CPU ↔ RAM
    
- **Bus PCI Express (PCIe)** : CPU ↔ GPU, SSD, cartes d’extension
    
- **SATA / NVMe** : CPU/chipset ↔ SSD/HDD
    
- **USB / Ethernet / Audio** : Périphériques ↔ chipset
    

> La carte mère agit comme un **hub** qui connecte et synchronise tout cela.


## 🧬**Bonus :Comment le CPU communique avec la RAM et les périphériques à bas niveau**

Voici le niveau le plus bas, le **cœur du fonctionnement d’un ordinateur**. À ce stade, on parle de **transferts de données binaires** entre les composants par des **bus physiques**, des **registres**, et des **interruptions**.

---

### 🛣️ A. **Les Bus**

Un **bus** est une ligne de communication entre composants. Il transporte des **bits** entre le CPU et les autres éléments.

|Bus|Rôle|
|---|---|
|**Bus de données**|Transfère les valeurs (ex : une instruction, un nombre)|
|**Bus d'adresses**|Indique **où** lire ou écrire en mémoire (adresse)|
|**Bus de contrôle**|Signale le type d'opération (lecture, écriture, etc.)|

#### 🧠 Exemple : Lecture d’une valeur en RAM

1. Le CPU place une **adresse mémoire** sur le **bus d’adresses**.
    
2. Il active une ligne de contrôle pour signaler une **lecture**.
    
3. La RAM place la donnée demandée sur le **bus de données**.
    
4. Le CPU lit la valeur du bus et la stocke dans un **registre**.
    

---

### 📦 B. **Les registres**

Ce sont des **petites mémoires internes** au CPU. Ils servent à :

- **Stager les données** pour les opérations (calculs, lectures, comparaisons…)
    
- **Contrôler le flux d’exécution** (ex : registre d’instruction, pointeur de pile…)
    

Types de registres :

- `AX`, `BX`, `CX`… : généraux
    
- `IP` : pointeur d’instruction
    
- `SP` : pointeur de pile
    
- `CR0`, `CR3`… : registres de contrôle pour la gestion mémoire, protection, etc.
    

---

### 🖥️ C. **Accès aux périphériques**

#### 1. Par **I/O Mapped Memory** (Port-mapping)

- Chaque périphérique a une **plage d’adresses spéciale** dans l’espace I/O.
    
- Le CPU utilise des instructions comme `IN`, `OUT` pour lire/écrire dans ces adresses.
    

#### 2. Par **Memory-Mapped I/O (MMIO)**

- Le périphérique **répond comme de la RAM** sur une plage d’adresse spéciale.
    
- Le CPU accède à ces plages avec de simples lectures/écritures mémoire.
    
- C’est la méthode la plus utilisée aujourd’hui (PCIe, GPU, cartes réseau…).
    

---

### 🚨 D. **Interruptions matérielles (hardware interrupts)**

Un périphérique peut **envoyer un signal au CPU** pour dire :

> “J’ai terminé une tâche, viens traiter ça !”

Par exemple :

- Un disque a fini de lire des données
    
- Une touche a été pressée
    
- Un paquet réseau est arrivé
    

Le CPU **interrompt** son exécution normale, saute à une **routine d’interruption (ISR)**, traite la demande, puis revient.

Ces interruptions passent via le **contrôleur d’interruptions** (ex : **APIC**, **PIC**) intégré au chipset.

---

### 📋 Résumé visuel :

`[CPU] ⇄ [Bus de données / adresses / contrôle] ⇄ [RAM]         ⇄ [Périphériques via PCIe/MMIO]         ⇄ [Contrôleur d’interruptions] ← [Clavier, Disque, Réseau...]`

---

### 4. **Contrôle et configuration**

- Intègre un **chipset** (Intel PCH, AMD Fusion Controller Hub, etc.) qui :
    
    - Gère les ports USB, le réseau, l’audio, les disques…
        
    - Fournit des interfaces pour le BIOS/UEFI.
        
- Contient une puce **ROM** avec le **BIOS ou UEFI**.
    
- Peut inclure un **RTC (Real Time Clock)** + pile CMOS pour l’heure et la configuration.
    

---

### 5. **Intégration de composants supplémentaires**

- Audio intégré (puce Realtek, etc.)
    
- Réseau Ethernet ou Wi-Fi
    
- Contrôleurs supplémentaires (ventilos, LED RGB, etc.)