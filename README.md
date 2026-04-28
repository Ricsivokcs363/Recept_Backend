# 🍳 Recept_Backend

Ez a projekt egy **REST API backend**, amely egy receptes webalkalmazást szolgál ki.  
Lehetővé teszi felhasználók kezelését, receptek létrehozását, keresését és kedvencek kezelését.

---

## 🖼️ Adatbázis diagram

<img width="1182" height="669" alt="image" src="https://github.com/user-attachments/assets/7cd4c5f4-0ebe-4d32-8113-d9903c8a0d83" />


---

## 🧱 Adatbázis felépítése

A rendszer három fő táblából áll:

### 👤 users
- user_id (PK)
- username
- email
- password

### 🍽️ recipes
- recipe_id (PK)
- title
- description
- ingredients
- image_url
- created_at
- user_id (FK)

### ❤️ fav
- user_id (FK)
- recipe_id (FK)

### 🔗 Kapcsolatok
- Egy felhasználó több receptet hozhat létre (1:N)
- Egy recept több felhasználó kedvence lehet (N:M)
- A `fav` tábla kapcsolótábla

---

## 🚀 Funkciók

- 🔐 Felhasználó regisztráció
- 🔑 Bejelentkezés (JWT + cookie)
- 📄 Receptek lekérdezése
- 👤 Saját receptek
- 🔍 Keresés
- ❤️ Kedvencek kezelése
- 🖼️ Kép feltöltés

---
## 🔐 Biztonság

- JWT token alapú hitelesítés
- Jelszavak bcryptjs segítségével hashelve vannak
- Middleware szinten történik az authentikáció
- A .env fájl tartalmaz minden érzékeny adatot.
⚠️ Ne oszd meg publikusan!

## ⚙️ Telepítés és indítás
```bash
npm install
npm start
```

## 🛠️ Technológiák

### Backend
- Node.js
- Express

### Adatbázis
- MySQL (mysql2)

### Biztonság
- JWT (jsonwebtoken)
- bcryptjs

### Egyéb
- multer (file upload)
- cookie-parser
- cors
- dotenv

---
## 📡 API végpontok
### 👤 Users
- POST /users/register
- POST /users/login
- GET /users/whoami
### 🍽️ Recipes
- GET /recipe
- GET /recipe/my
- GET /recipe/search?search=
- POST /recipe
- DELETE /recipe/:id
### ❤️ Favorites
- POST /fav/:id
- DELETE /fav/:id

### Mappa struktúra
```markdown
├── BACKEND/
│   ├── config/
│       └── dotenvConfig.js
│   ├── controllers/
│       └── favController.js
│       └── recipeController.js
│       └── userController.js
│   ├── db/
│       └── db.js
│   ├── middleware/
│       └── isAdminMiddleware.js
│       └── recipeUpload.js
│       └── userMiddleware.js
│   ├── models/
│       └── favModel.js
│       └── recipeModel.js
│       └── userModel.js
│   ├── routes/
│       └── favRoutes.js
│       └── recipeRoutes.js
│       └── userRoutes.js
│   ├── uploads/
│   ├── package.json
│   ├── backend.js
│   ├── server.js
```

## 📦 Használt package-ek

```json
{
  "bcryptjs": "^3.0.3",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "multer": "^2.0.2",
  "mysql2": "^3.16.0"
}
```
---
## 🧪 Tesztelés
### Sikeres regisztráció!

<img width="1495" height="624" alt="image" src="https://github.com/user-attachments/assets/77dc9857-611e-45bf-840a-74e665a7186c" />

---

### Sikeres bejelentkezés!

<img width="1472" height="682" alt="image" src="https://github.com/user-attachments/assets/323b1a39-9ecf-4484-98d3-46a2559db689" />

---

## Használt eszközök
- VS code
- NPM
- Postman
- DrawSQL
- W3Schools
- StackOverflow
- ChatGPT
- GitHub
- Google Drive
- PhpMyAdmin
## 👨‍💻 Készítette
### Kiss Richárd
