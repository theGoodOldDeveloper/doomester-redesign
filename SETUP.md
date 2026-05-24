# DOOMester.hu - Telepítési útmutató

## 1. Függőségek telepítése

```bash
npm install
```

## 2. Fejlesztői mód indítása

```bash
npm run dev
```

A szerver a **4567-es porton** fut: http://localhost:4567

## 3. Production build

```bash
npm run build
npm start
```

## 4. PM2 használata (Production)

### PM2 telepítése (globálisan)

```bash
npm install -g pm2
```

### PM2 indítás

```bash
pm2 start ecosystem.config.js
```

### PM2 parancsok

```bash
# Állapot ellenőrzés
pm2 status

# Logok megtekintése
pm2 logs doomester

# Újraindítás
pm2 restart doomester

# Leállítás
pm2 stop doomester

# PM2 indítása rendszerindításkor
pm2 startup
pm2 save
```

## 5. Nginx konfiguráció

Hozz létre egy új konfigurációs fájlt: `/etc/nginx/sites-available/doomester`

```nginx
server {
    listen 80;
    server_name doomester.hu www.doomester.hu;

    location / {
        proxy_pass http://localhost:4567;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Nginx aktiválása

```bash
# Szimbolikus link létrehozása
sudo ln -s /etc/nginx/sites-available/doomester /etc/nginx/sites-enabled/

# Konfiguráció tesztelése
sudo nginx -t

# Nginx újraindítása
sudo systemctl restart nginx
```

### SSL tanúsítvány (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d doomester.hu -d www.doomester.hu
```

## 6. Képek és asset-ek feltöltése

### Logo
- Hely: `public/doomlogo.gif`
- Méret: 256x256px (ajánlott)
- Formátum: GIF vagy PNG

### Example képek
- Kártya képek: `public/images/image1.jpg`, `image2.jpg`, stb.
- Modal képek: `public/images/modalimage1.jpg`, `modalimage2.jpg`, stb.
- Ajánlott méret: 800x600px (kártya), 1200x600px (modal)

## 7. Example szöveges fájlok

Az example fájlok a `public/data/` mappában találhatók:
- `example1.txt`, `example2.txt`, stb.

Formátum:
```
name: Példa név
description: Rövid leírás
modaldescription: Hosszabb leírás a modalhoz
```

## 8. Környezeti változók (opcionális)

Hozz létre egy `.env.local` fájlt a projekt gyökerében:

```env
NODE_ENV=production
PORT=4567
```

## 9. Hibakeresés

### Port foglalt hiba
```bash
# Port ellenőrzés
lsof -i :4567

# Folyamat leállítása
kill -9 <PID>
```

### PM2 logok
```bash
pm2 logs doomester --lines 100
```

### Nginx logok
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 10. Frissítés

```bash
# Kód frissítése
git pull

# Függőségek frissítése
npm install

# Build
npm run build

# PM2 újraindítás
pm2 restart doomester
```

## Támogatás

Ha bármilyen probléma merül fel, vedd fel a kapcsolatot:
- 📧 thegoodolddeveloper@gmail.com
- 📞 +36 30 9283 653

