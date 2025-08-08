---
title: "BIOS/UEFI"
description: "The PC's first impression - wakes up before coffee and judges your hardware choices"
---

## 🧠 1. **Le rôle du BIOS (ou UEFI)**

Le **BIOS** (Basic Input/Output System) ou **UEFI** (Unified Extensible Firmware Interface) est stocké dans une **puce ROM** ou **flash** sur la carte mère. Le BIOS n’est pas un processeur : c’est un **programme dans une puce**.

### 🎯 Objectifs principaux du BIOS :

#### 1.1 Initialiser le matériel

- Active le CPU, configure les horloges, initialise la RAM, configure les ports (USB, SATA…).
    
- Configure le **chipset** qui interconnecte CPU ↔ RAM ↔ périphériques.
    

#### 1.2 Effectuer un POST (Power-On Self Test)

- Vérifie que les composants minimums sont présents et fonctionnels :
    
    - RAM (écriture/lecture simple)
        
    - CPU (réponse à une instruction)
        
    - GPU (capacité à afficher un écran)
        
    - Clavier (présence/connexion)
        
- Si un problème est détecté, il émet des **bips** selon un code d’erreur.
    

#### 1.3 Offrir une interface de configuration (UEFI Setup)

- Permet à l'utilisateur de configurer :
    
    - L’ordre de boot
        
    - Le mode de démarrage (Legacy/UEFI)
        
    - L’activation de certaines fonctionnalités (virtualisation, secure boot, overclocking…)
        

#### 1.4 Localiser un périphérique de démarrage

- Le BIOS lit les **secteurs de boot** (MBR ou GPT) de chaque disque dans l’ordre défini.
    
- Si un secteur valide est trouvé, il charge le **bootloader** en mémoire RAM.