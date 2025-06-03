# SkillTrack 🥇
**SkillTrack** je napreden sistem za **celovito upravljanje zaposlenih, projektov in znanj**, zasnovan za podjetja, ki želijo povečati učinkovitost svojih ekip, pametno dodeljevati naloge in slediti razvoju svojih članov.
<br/>

## Vizija 🌟
SkillTrack povezuje evidenco delovnega časa, znanj in projektnih nalog v enoten sistem, ki podjetjem omogoča:
- spremljanje uspešnosti in prisotnosti,
- inteligentno dodeljevanje nalog glede na kompetence in kapacitete in
- povezovanje z Jiro za sledenje napredka projektov.
S tem SkillTrack podpira tako operativno delo ekip kot strateške odločitve vodstva.
<br/>

## Ključne funkcionalnosti 🔧
<!--- - spacing -->
  1. **Upravljanje ekip in članov**
      - Uporabniki, vloge (User, Supervisor, Admin), pozicije, ocenjevanje in pregled uspešnosti
  2. **Evidenca delovnega časa in odsotnosti**
      - Sledenje delovnem času, dopustom in bolniškim
  3. **Integracija z Jiro**
      - Povezava ticketov z zaposlenimi, vizualizacija stanja projektov
  4. **Pametno dodeljevanje nalog**
      - Predlog nosilca naloge glede na kapaciteto in znanja
  5. **Poročila**
      - Generiranje stanja projektov
<br/>

### Tehnološki sklad 🛠️

| Frontend      | Backend  | Baza        | Avtentikacija   | DevOps           | Testiranje     |
|---------------|----------|-------------|------------------|-------------------|----------------|
| Remix         | NestJS   | PostgreSQL  | Google OAuth     | Vercel / Render   | Playwright     |
| TypeScript    | REST API |             | JWT              | Docker            |                |

<br/>

## Integracije 🔗

SkillTrack se povezuje z zunanjimi storitvami za izboljšano uporabniško izkušnjo, varnost in avtomatizacijo poslovnih procesov:

| Integracija                      | Namen                                                                 |
|----------------------------------|------------------------------------------------------------------------|
| **Google OAuth**                | Avtentikacija uporabnikov – omogoča varno prijavo in upravljanje dostopov. |
| **Jira REST API**               | Povezava z Jiro za uvoz ticketov, sledenje projektom in dodeljevanje nalog. |
| **Sistem za pošiljanje e-mailov** | Avtomatsko pošiljanje obvestil.         |
<br/>


## Kako zagnati projekt 💻
1. Kloniraj projekt
   ```bash
   git clone https://github.com/anjalecnik/SkillTrack.git
   cd SkillTrack
   ```
2. Backend (API)
    ```bash
   cd api
   npm install
   npm run migration:run
   npm run seed
   nest start
   ```
3. Frontend
    ```bash
    cd web
    npm install
    npm run dev
   ```
4. Playwright testi
     ```bash
     cd playwright-tests
     npx playwright test
     # ali:
     npx playwright test --ui
     ```
<br/>

## `.env` datoteke 🔐
Backend `.env` (`api/.env`)
  ```bash
  APP_HOST = "0.0.0.0"
  APP_PORT = "8080"
  APP_API_PREFIX = "api"
  GLOBAL_PREFIX = "api"
  APP_CORS_ORIGIN = "*"
  APP_CORS_METHODS = "GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS"
  
  POSTGRES_HOST = "127.0.0.1"
  POSTGRES_PORT = "5432"
  POSTGRES_USER = "postgres"
  SECRET_POSTGRES_PASS = "postgres"
  POSTGRES_DB = "skilltrack_db"
  
  JWT_SECRET_KEY = "jwt-secret-key"
  JWT_EXPIRE_TIME = "7d"
  JWT_REFRESH_SECRET_KEY = "jwt-refresh-secret-key"
  JWT_REFRESH_EXPIRE_TIME = "30d"
  
  APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH = "auth:jwt:accessToken"
  APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH = "auth:jwt:refreshToken"
  
  GOOGLE_CLIENT_ID = "google-client-id"
  GOOGLE_CLIENT_SECRET = "google-client-secret"
  GOOGLE_CALLBACK_URL = "http://localhost:8080/api/auth/users/google/redirect"
  
  APP_FEATURE_USER_ACTIVITY_DAILY_EDIT_DAYS_LIMIT = "7"
  
  JIRA_API_TOKEN = "jira-api-token"
  
  MAIL_HOST = "smtp.gmail.com"
  MAIL_USER="mail-user"
  MAIL_PASS="mail-pass"
  
  OPENAI_API_KEY="openai-api-key"
  ```
Frontend `.env` (`web/.env`)
  ```bash
  FIREBASE_API_KEY="firebase-api-key"
  FIREBASE_AUTH_DOMAIN="firebase-auth-domain"
  FIREBASE_PROJECT_ID="firebase-project-id"
  FIREBASE_STORAGE_BUCKET="firebase-storage-bucket"
  FIREBASE_MESSAGING_SENDER_ID="firebase-messaging-sender-id"
  FIREBASE_APP_ID="firebase-app-id"
  
  API_URL=http://localhost:8080
  
  GOOGLE_CLIENT_ID="google-client-id"
  GOOGLE_CLIENT_SECRET="google-client-secret"
  GOOGLE_CALLBACK_URL="http://localhost:8080/auth/users/google/redirect"
  ```
<br/>

## Konkurenčne rešitve in prednosti ✅
| Rešitev   | Omejitve                                                                 |
|-----------|--------------------------------------------------------------------------|
| Jira      | Ne vključuje upravljanja delovnega časa, brez predlogov nosilcev nalog |
| ClickUp   | Brez poročil in povezovanja nalog z znanji              |
| Asana     | Ni sistema za kompetence in pametno dodeljevanje                         |
<br/>

## Omejitve ⚠️
- Aplikacija deluje izključno z Google OAuth (ni podpore za druge načine prijave).
- Omejen dostop po vlogah – sistem razlikuje med uporabniki (User), vodji (Supervisor) in administratorji (Admin).
- API limit za integracijo z Jiro.
- Ob velikem številu podatkov je lahko delovanje počasnejše zaradi uporabe brezplačnih gostovanj (Render, Vercel).
- Ni podpore za plače ali podrobnejše planiranje.
- Potrebna je ročna gradnja backend aplikacije za Render, saj Render v brezplačni različici nima dovolj pomnilnika za samodejno gradnjo.
<br/>

## 🔧 Navodila za ročno gradnjo backend-a pred deployem na Render:
1. Pojdi v mapo `api/`:
   ```bash
   cd api
   ```
2. Izvedi gradnjo aplikacije:
    ```bash
   nest build
   ```
3. Dodaj zgrajeno mapo `dist/` v git (čeprav je običajno ignorirana):
    ```bash
    git add dist -f
   ```
4. Izvedi commit
     ```bash
    git commit -m "Rebuilt"
    git push
     ```
<br/>

## Author
[Anja Lečnik](https://si.linkedin.com/in/anja-lecnik)
