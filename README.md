# DOOMester - Digitális Okos Otthon Mester

Modern, reszponzív landing page a Home Assistant szolgáltatások bemutatásához.

## Technológiai stack

- **Next.js 14** - React framework App Router-rel
- **TypeScript** - Típusbiztos fejlesztés
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animációk és motion effektek
- **Lucide React** - Ikonok

## Telepítés

```bash
npm install
```

## Fejlesztés

```bash
npm run dev
```

A fejlesztői szerver a **4567-es porton** fut: http://localhost:4567

## Production build

```bash
npm run build
npm start
```

## PM2 használata

```bash
# Telepítés
npm install -g pm2

# Indítás
pm2 start npm --name "doomester" -- start

# Állapot ellenőrzés
pm2 status

# Logok
pm2 logs doomester

# Leállítás
pm2 stop doomester
```

## Projekt struktúra

```
doomester/
├── app/
│   ├── globals.css       # Globális stílusok
│   ├── layout.tsx        # Fő layout
│   └── page.tsx          # Főoldal
├── components/
│   ├── Header.tsx        # Fejléc komponens
│   ├── Hero.tsx          # Hero szekció
│   ├── Description.tsx   # Leírás szekció
│   ├── Examples.tsx      # Példák szekció
│   ├── ExampleCard.tsx   # Példa kártya
│   ├── ExampleModal.tsx  # Példa modal
│   ├── ContactSection.tsx # Kapcsolat szekció
│   └── Footer.tsx        # Lábléc
├── public/
│   ├── data/             # Example szöveges fájlok
│   │   └── example1.txt, example2.txt, ...
│   ├── images/           # Képek
│   │   ├── image1.jpg, image2.jpg, ...
│   │   └── modalimage1.jpg, modalimage2.jpg, ...
│   └── doomlogo.gif      # Logo
└── package.json
```

## Example fájlok formátuma

Az `public/data/example1.txt`, `example2.txt`, stb. fájlok formátuma:

```
name: Példa név
description: Rövid leírás a kártyához
modaldescription: Hosszabb leírás a modalhoz
```

## Képek

- **Kártya képek**: `public/images/image1.jpg`, `image2.jpg`, stb.
- **Modal képek**: `public/images/modalimage1.jpg`, `modalimage2.jpg`, stb.
- **Logo**: `public/doomlogo.gif`

## Design rendszer

### Színek
- **Primary**: Kék árnyalatok (#0079e6)
- **Cyan**: Cián árnyalatok (#00bcd4)
- **Accent**: Lila-kék átmenet (#a8b8ff)

### Border radius
- **Kártyák**: `rounded-3xl` (1.5rem)
- **Gombok**: `rounded-2xl` (1rem)

### Árnyékok
- **Soft**: `shadow-soft` - Finom árnyék
- **Medium**: `shadow-medium` - Közepes árnyék
- **Large**: `shadow-large` - Nagy árnyék
- **Glow**: `shadow-glow` - Fényeffekt

### Animációk
- Fade in/out
- Slide up
- Scale in/out
- Hover effektek

## Nginx konfiguráció példa

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
        proxy_cache_bypass $http_upgrade;
    }
}
```

## License

© 2025 The Good Old Developer. Minden jog fenntartva.

