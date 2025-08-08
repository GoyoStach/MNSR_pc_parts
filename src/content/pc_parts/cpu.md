---
title: "CPU (Processor)"
description: "The brain of your PC - thinks faster than you, complains less"
id: 142
---

### 🧱 **Allumage électrique : le CPU se réveille**
    
- Le **CPU reçoit le signal RESET** → il entre en **mode réel** (16 bits, comme un 8086).
    
- Il commence automatiquement à exécuter le code situé à **l’adresse mémoire `0xFFFF0`** (tout en haut des 1 Mo).
    

📍 Cette adresse est **mappée vers la ROM du BIOS** (physiquement connectée à la carte mère).

---

⚠️ C’est **toujours le CPU** qui exécute tout le code, **instruction par instruction**.

---

### ⚙️  **Le CPU exécute le noyau du système d’exploitation**

- Le noyau prend totalement le contrôle.
    
- Le CPU passe en **mode protégé (32 bits)** puis souvent **long mode (64 bits)**.
    
- Le système d’exploitation démarre.
    


---

## 🧠 En résumé

- **Le CPU exécute tout**, depuis l’allumage.
    
- La **transition se fait via des instructions assembleur simples** (`JMP`, `CALL`) qui redirigent l'exécution.
    
- Les différentes puces ne font que se "passer la main"→ toujours exécuté par **le même CPU**, qui lit simplement **un nouveau programme en mémoire**.