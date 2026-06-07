# ⏱️ Developer Productivity Dashboard (CRA Architecture)

Ένα σύγχρονο, component-driven React Dashboard για τη διαχείριση εργασιών και live καταγραφή χρόνου (Time Tracking), αναπτυγμένο με **Create React App (CRA)** και **NPM**.

---

## 🏗️ Αρχιτεκτονική Εφαρμογής (Component Tree)

Η εφαρμογή έχει διασπαστεί σε αυτόνομα, επαναχρησιμοποιήσιμα components με δικά τους scoped styles:

* **`App.js`**: Το κεντρικό component που διαχειρίζεται το Global State (`tasks`, `theme`), τα Lifecycle Effects (`useEffect` για localstorage & global timer interval) και τις βασικές συναρτήσεις χειρισμού.
* **`Analytics Component`**: Υπεύθυνο για την απεικόνιση των real-time στατιστικών (συνολικά tasks και responsive υπολογισμός ωρών εργασίας μέσω props).
* **`TaskItem Component`**: Αυτόνομο component αναπαράστασης του κάθε task, το οποίο δέχεται callbacks ως props για τον έλεγχο των timers (start/pause), την ολοκλήρωση και τη διαγραφή.

---

## 🛠️ Τεχνικά Χαρακτηριστικά

* **State Management:** Hooks (`useState`, `useEffect`) για απόλυτο συγχρονισμό δεδομένων και persistence μέσω `localStorage`.
* **Single Global Timer:** Χρηση ενός global `setInterval` με σωστό cleanup (`clearInterval`) για την αποφυγή memory leaks.
* **CSS Variables & Themes:** Δυναμική εναλλαγή Light/Dark mode με injection των global classes στο `document.body`.
* **Dependency Management:** Πλήρης έλεγχος πακέτων μέσω του `package.json`.
