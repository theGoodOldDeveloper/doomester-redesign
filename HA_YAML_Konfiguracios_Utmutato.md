# Home Assistant YAML Konfigurációs Útmutató
### Átfogó referencia full stack fejlesztőknek

> **Verzió:** 2026. május — HA Core 2025.x / 2026.x alapján  
> **Összeállította:** Hermes Agent — Végh Tibor részére

---

## Tartalomjegyzék

1. [Bevezetés — Miért és mikor használj YAML-t?](#1-bevezetés--miért-és-mikor-használj-yaml-t)
2. [YAML Szintaxis Alapok](#2-yaml-szintaxis-alapok-javascript-fejlesztőknek)
3. [A `configuration.yaml` — Központi konfigurációs fájl](#3-a-configurationyaml--a-központi-konfigurációs-fájl)
4. [YAML Fájlok és Fájlszervezés](#4-yaml-fájlok-és-fájlszervezés)
5. [`secrets.yaml` — Titkok tárolása](#5-secretsyaml--titkok-tárolása)
6. [Entity Customization](#6-entity-customization)
7. [Packages (Csomagok)](#7-packages-csomagok)
8. [Automatizációk YAML-ben](#8-automatizációk-yaml-ben)
9. [Feltételek (Conditions)](#9-feltételek-conditions)
10. [Script-ek YAML-ben](#10-script-ek-yaml-ben)
11. [Szcénák (Scenes) YAML-ben](#11-szcénák-scenes-yaml-ben)
12. [Template Sensor-ok YAML-ben](#12-template-sensor-ok-yaml-ben)
13. [Gyakori YAML Integráció Példák](#13-gyakori-yaml-integráció-példák)
14. [Hibakeresés és Validáció](#14-hibakeresés-és-validáció)
15. [YAML Eszközök és Validátorok](#15-yaml-eszközök-és-validátorok)
16. [YAML vs UI — Döntési Mátrix](#16-yaml-vs-ui--döntési-mátrix)
17. [Fontos Linkek](#17-fontos-linkek)
18. [Zárszó — Best Practices](#18-zárszó--best-practices)

---

## 1. Bevezetés — Miért és mikor használj YAML-t?

A Home Assistant kétféle konfigurációs módot támogat: grafikus felhasználói felület (UI) és kézi YAML szerkesztés.

### ✅ Mikor használj YAML-t (manuális szerkesztés)

| Eset | Magyarázat |
|------|-----------|
| **Speciális integrációk** | `template sensor`, `template binary_sensor`, `customize`, `mqtt` egyedi eszközök |
| **Komplex automatizációk** | Mélyen egymásba ágyazott `choose`, `repeat`, `parallel` blokkok |
| **Szcenáriók (scenes)** | Határozottan gyorsabb YAML-ben megírni |
| **Csomagok (packages)** | Logikusan elkülönített eszközcsoportok |
| **`input_*` helperek** | Batch-szerű deklarálás |
| **Verziókezelés** | YAML fájlok tárolhatók Git-ben |
| **Template-ek (Jinja2)** | Csak `configuration.yaml`-ből érhetők el teljes körűen |
| **Secrets kezelés** | Jelszavak/API kulcsok elrejtése `secrets.yaml`-ben |

### ❌ Mikor kerüld a YAML-t

- **Beépített integrációk** — amiket a UI *Settings → Integrations* alatt támogat (UI-ból karbantarthatók)
- **Egyszerű automatizációk** — (1 trigger + 1 action): a UI automata generálja az `automations.yaml`-t, kézzel ne nyúlj hozzá
- **UI által menedzselt fájlok** — `automations.yaml`, `scenes.yaml`, `scripts.yaml` — ezeket a UI írja/felülírja

---

## 2. YAML Szintaxis Alapok (JavaScript fejlesztőknek)

### Fogalmak párhuzamba állítva

| JavaScript | YAML megfelelője |
|------------|-----------------|
| `{ kulcs: ertek }` | `kulcs: ertek` — mapping |
| `[ elem1, elem2 ]` | `- elem1` / `- elem2` — list/sequence |
| `{ a: { b: c } }` | `a:` + `  b: c` — beljebb húzva |
| `// komment` | `# komment` |
| indentáció (bármi) | **2 space** — TILOS a TAB! |

### Kritikus szabályok

```yaml
# ✅ HELYES — 2 space indentáció
sensor:
  - platform: mqtt
    state_topic: "sensor/topic"

# ❌ HELYTELEN — TAB használata
sensor:
	- platform: mqtt    # ← HIBA: "found character '\t'"
```

### Booleans — A leggyakoribb buktató

YAML automatikusan értelmezi ezeket **`true`-ként:**
`yes` · `Y` · `true` · `True` · `on` · `On` · `ON`

YAML automatikusan értelmezi ezeket **`false`-ként:**
`no` · `N` · `false` · `False` · `off` · `Off` · `OFF`

> **Ha stringként akarod az `"on"` / `"off"` szavakat (pl. entity state), kötelező idézőjel!**

```yaml
# ✅ HELYES — stringként kezelődik
state: "on"

# ❌ HELYTELEN — YAML true-ként értelmezi
state: on
```

### Duplikált kulcsok

Ha ugyanaz a kulcs kétszer szerepel, **az utolsó nyer** — nincs merge!

```yaml
sensor:
  - platform: template
sensor:       # ← FELÜLÍRJA az előzőt!
  - platform: mqtt
```

### Case sensitivity

A HA case-sensitive: `light.Living_Room` ≠ `light.living_room`.  
A pontos nevet a *Developer Tools → States* alatt ellenőrizd.

---

## 3. A `configuration.yaml` — A központi konfigurációs fájl

### Helye

| HA telepítési típus | Útvonal |
|---------------------|---------|
| HA OS (Raspberry Pi) | `/config/configuration.yaml` |
| HA Core (manuális) | a HA config mappában |
| HA Container | `/config/configuration.yaml` |

### Minimális struktúra

```yaml
# ── Alap beállítások ─────────────────────────────────────────
homeassistant:
  name: "Otthon"
  latitude: 47.8
  longitude: 19.9
  elevation: 200
  unit_system: metric          # vagy: us_customary
  time_zone: "Europe/Budapest"
  currency: HUF
  country: HU

# ── Integrációk betöltése ────────────────────────────────────
default_config:                # Betölti az összes alap integrációt

# ── UI által menedzselt fájlok (ne szerkeszd kézzel!) ────────
automation: !include automations.yaml
script:      !include scripts.yaml
scene:       !include scenes.yaml

# ── Saját YAML fájlok ────────────────────────────────────────
sensor:        !include sensors.yaml
binary_sensor: !include binary_sensors.yaml
switch:        !include switches.yaml
light:         !include lights.yaml
template:      !include templates.yaml
```

### A `homeassistant:` blokk kulcsai

| Kulcs | Típus | Leírás |
|-------|-------|--------|
| `name` | string | Az instance neve |
| `latitude` / `longitude` | float | Hely koordináták (naplemente/hajnal számításhoz) |
| `elevation` | integer | Tengerszint feletti magasság (méter/láb) |
| `unit_system` | `metric` / `us_customary` | Mértékegység rendszer |
| `time_zone` | string | IANA timezone (pl. `Europe/Budapest`) |
| `currency` | string | Pénznem ISO kód (pl. `HUF`) |
| `country` | string | Országkód ISO 3166-1 alpha-2 (pl. `HU`) |
| `customize` | map | Entity specifikus beállítások |
| `customize_domain` | map | Domain-wide beállítások |
| `packages` | map | [Lásd: 7. fejezet](#7-packages-csomagok) |
| `allowlist_external_dirs` | list | Engedélyezett külső mappák |
| `allowlist_external_urls` | list | Engedélyezett külső URL-ek |
| `media_dirs` | map | Média mappák aliassal |

---

## 4. YAML Fájlok és Fájlszervezés

### `!include` — Egyetlen fájl betöltése

```yaml
# configuration.yaml
sensor: !include sensors.yaml
```

```yaml
# sensors.yaml — NE ismételd a szülő kulcsot!
- platform: template
  sensors:
    heti_nap:
      value_template: "{{ now().strftime('%A') }}"
```

> **Fontos:** A `!include` a **tartalmat** helyettesíti be — a szülő kulcsot ne ismételd az include-olt fájlban.

---

### `!include_dir_list` — Mappa betöltése listaként

Minden `.yaml` fájl a mappában egy **listaelem** lesz.

```yaml
automation: !include_dir_list automations/
```

```
/config/automations/
├── welcome_home.yaml
├── night_mode.yaml
└── away_mode.yaml
```

---

### `!include_dir_named` — Mappa betöltése név-érték párokként

A fájlnév lesz a kulcs, a tartalom az érték. **Legtöbbször ezt érdemes használni.**

```yaml
input_boolean: !include_dir_named input_booleans/
```

```
/config/input_booleans/
├── guest_mode.yaml   →  kulcs: guest_mode
└── cleaning.yaml     →  kulcs: cleaning
```

---

### `!include_dir_merge_list` — Mappa listáinak összefésülése

Minden fájl egy-egy listát tartalmaz — az összes összefésülődik.

```yaml
automation manual: !include_dir_merge_list automations/
automation ui:     !include automations.yaml   # UI által kezelt is mehet mellé
```

---

### `!include_dir_merge_named` — Mappa mappingjeinek összefésülése

Minden fájl kulcs-érték párokat tartalmaz — mind összeolvad egy nagy mappingbe.

> **Tipp:** Az `!include_dir_named` a leggyakoribb és legáttekinthetőbb választás. A fájlok mozgathatók anélkül, hogy a tartalmat módosítani kellene.

---

## 5. `secrets.yaml` — Titkok tárolása

> ⚠️ Soha ne írj jelszavakat, API kulcsokat közvetlenül a `configuration.yaml`-be!

```yaml
# secrets.yaml
wifi_ssid: "MyWiFi"
wifi_password: "SuperSecret123"
mqtt_broker: 192.168.1.100
mqtt_password: "mqtt_secret"
```

```yaml
# configuration.yaml — hivatkozás !secret-tel
sensor:
  - platform: mqtt
    broker:   !secret mqtt_broker
    password: !secret mqtt_password
```

**Secrets feloldási sorrend:**
1. A hivatkozó fájl melletti `secrets.yaml`
2. A `configuration.yaml` melletti `secrets.yaml`
3. A gyökér mappában lévő `secrets.yaml`

**Debug:** Add hozzá a `logger: debug`-t a `secrets.yaml` tetejére — így látod, hol töltődnek be a titkok (az értékek nem kerülnek a logba).

---

## 6. Entity Customization

Entity-ek megjelenésének, nevének, ikonjának testreszabása:

```yaml
homeassistant:
  customize:
    light.nappali_fo:
      friendly_name: "Nappali fővilágítás"
      icon: mdi:ceiling-light
      assumed_state: false

    sensor.kulso_homerseklet:
      friendly_name: "Külső hőmérséklet"
      unit_of_measurement: "°C"
      icon: mdi:thermometer

  customize_domain:
    light:
      icon: mdi:lightbulb
    switch:
      icon: mdi:toggle-switch
```

### Elérhető customize kulcsok

| Kulcs | Leírás |
|-------|--------|
| `friendly_name` | Emberi olvasható megjelenítési név |
| `icon` | MDI ikon (pl. `mdi:thermometer`) |
| `picture` | Kép URL az entity-hez |
| `assumed_state` | `true` → a UI nem jelzi a bizonytalan állapotot |
| `unit_of_measurement` | Mértékegység felülírása |
| `device_class` | Eszközosztály (pl. `temperature`, `humidity`, `motion`) |
| `entity_picture` | Entity képének URL-je |

---

## 7. Packages (Csomagok)

**Egy csomag = egy eszköz/logikai egység teljes konfigurációja** — sensorok, switchek, automatizációk, scriptek egy helyen.

### Alapszintaxis

```yaml
# configuration.yaml
homeassistant:
  packages:
    nappali_vilagitas:
      switch:
        - platform: mqtt
          name: "Nappali főkapcsoló"
          command_topic: "nappali/fokapcsolo/set"
      automation:
        - alias: "Nappali világítás este"
          triggers:
            - trigger: sun
              event: sunset
          actions:
            - action: switch.turn_on
              target:
                entity_id: switch.nappali_fokapcsolo
```

### Packages mappa — ajánlott módszer

```yaml
# configuration.yaml
homeassistant:
  packages: !include_dir_named packages/
```

```
/config/packages/
├── nappali_vilagitas.yaml
├── halo_vilagitas.yaml
├── kert_loccs.yaml
├── garazs_kapu.yaml
└── riaszto.yaml
```

```yaml
# packages/nappali_vilagitas.yaml — teljes egység egy fájlban
switch:
  - platform: mqtt
    name: "Nappali főkapcsoló"
    command_topic: "..."

sensor:
  - platform: mqtt
    name: "Nappali fényerő"
    state_topic: "..."

automation:
  - alias: "Nappali este be"
    triggers: [...]
    actions:  [...]
```

### Merge szabályok

| Típus | Merge-elhető? | Megjegyzés |
|-------|:------------:|------------|
| Platform-alapú (`light:`, `switch:`, `sensor:`) | ✅ Igen | Lista szinten merge-elve |
| Entity ID-s (`input_boolean:`, `input_number:`) | ✅ Igen, ha unique ID | Kulcsok nem ütközhetnek |
| Egyéb dictionary-k | ⚠️ Csak ha unique | Egy kulcs csak egyszer szerepelhet |

> ⚠️ `auth_providers` **nem** lehet package-ben — azt a HA a packages betöltése előtt dolgozza fel.

---

## 8. Automatizációk YAML-ben

### Alapstruktúra

```yaml
automation:
  - alias: "Felkapcsolás naplementekor"
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  # UUID a debug trace-ekhez
    description: "Ha lenyugszik a nap és itthon vagyunk"
    initial_state: true
    mode: single                 # single | restart | queued | parallel
    max: 10                      # csak queued/parallel módban
    max_exceeded: warning        # warning | silent

    triggers:
      - trigger: sun
        event: sunset
        offset: "-01:00:00"
      - trigger: state
        entity_id: person.tibor
        to: "home"

    conditions:
      - condition: state
        entity_id: person.tibor
        state: "home"
      - condition: time
        after: "16:00:00"
        before: "23:00:00"

    actions:
      - action: light.turn_on
        target:
          entity_id: group.nappali_vilagitas
```

### Automatizáció módok

| Mode | Viselkedés |
|------|-----------|
| `single` | Ha már fut, az új triggert eldobja (warning) |
| `restart` | Megállítja a futót, elindítja az újat |
| `queued` | Sorba állítja, egyesével futnak le (`max: N`) |
| `parallel` | Párhuzamosan futhat több példány (`max: N`) |

### Összes trigger típus

| Trigger | Leírás |
|---------|--------|
| `trigger: state` | Entity állapotváltozásra (`from:`, `to:`, `for:`) |
| `trigger: mqtt` | MQTT topic-ra érkező üzenetre |
| `trigger: time` | Adott időpontban (`at: "16:30:00"`) |
| `trigger: time_pattern` | Ismétlődő időzítés (pl. minden 5 perc) |
| `trigger: homeassistant` | HA eseményekre (`start`, `stop`) |
| `trigger: event` | Egyedi eseményre (`event_type: my_custom_event`) |
| `trigger: sun` | Nap eseményre (`sunset`, `sunrise` + offset) |
| `trigger: zone` | Zóna belépés/kilépés |
| `trigger: tag` | NFC tag scannelés |
| `trigger: conversation` | Assist hangparancsra |
| `trigger: numeric_state` | Numerikus állapot küszöbértékre |
| `trigger: calendar` | Naptár eseményre |
| `trigger: geo_location` | Geolokációs eseményre |
| `trigger: persistent_notification` | Értesítés megjelenésekor |
| `trigger: template` | Jinja2 template `true` értékére |
| `trigger: webhook` | Webhook hívásra |
| `trigger: device` | UI-ból konfigurált device trigger |

### Trigger ID-k — melyik váltotta ki?

A trigger lista **OR** kapcsolatban van (bármelyik kiváltja). Az `id` mezővel azonosítható, melyik trigger volt az.

```yaml
triggers:
  - trigger: state
    entity_id: binary_sensor.mozgas
    to: "on"
    id: mozgas_ert        # ← hivatkozás conditions/actions-ban

  - trigger: state
    entity_id: binary_sensor.ajto
    to: "on"
    id: ajto_nyilt
```

---

## 9. Feltételek (Conditions)

A conditions lista alapértelmezésben **AND** kapcsolatban van.

### Összes condition típus

| Condition | Leírás | Példa |
|-----------|--------|-------|
| `condition: state` | Entity állapotának ellenőrzése | `state: "on"` |
| `condition: numeric_state` | Numerikus érték vizsgálata | `below: 25` |
| `condition: time` | Időablak (`after:`, `before:`, `weekday:`) | `after: "08:00"` |
| `condition: template` | Jinja2 template | `{{ ... \|int < 20 }}` |
| `condition: sun` | Nap állása | `after: sunset` |
| `condition: zone` | Zóna ellenőrzés | `zone: zone.home` |
| `condition: trigger` | Trigger ID ellenőrzés | `id: mozgas_ert` |
| `condition: and` | Logikai AND csoport | `conditions: [...]` |
| `condition: or` | Logikai OR csoport | `conditions: [...]` |
| `condition: not` | Logikai NOT | `conditions: [...]` |

### Logikai feltételek kombinálása

```yaml
conditions:
  - condition: and
    conditions:
      - condition: state
        entity_id: binary_sensor.mozgas
        state: "on"
      - condition: or
        conditions:
          - condition: state
            entity_id: light.nappali
            state: "off"
          - condition: numeric_state
            entity_id: sensor.fenyero
            below: 50
```

### Shorthand template condition

```yaml
conditions:
  - "{{ is_state('device_tracker.iphone', 'home') }}"
```

---

## 10. Script-ek YAML-ben

> **Script vs. automatizáció:** automatizáció = trigger hatására indul önmagától; script = meghívásra indul.

```yaml
script:
  jotekony_vilagitas:
    alias: "Jó éjszakát világítás"
    icon: mdi:weather-night
    description: "Lassan lehalványítja a lámpákat"

    fields:                        # bemenő paraméterek
      sebesseg:
        name: "Sebesség"
        description: "Hány másodperc alatt halványuljon"
        required: false
        default: 30
        selector:
          number:
            min: 5
            max: 120

    variables:
      lepes_ido: "{{ sebesseg | int // 10 }}"

    sequence:
      - action: light.turn_on
        target:
          entity_id: light.halo_fo
        data:
          brightness_pct: 50

      - delay:
          seconds: "{{ lepes_ido }}"

      - action: light.turn_on
        target:
          entity_id: light.halo_fo
        data:
          brightness_pct: 20

      - delay:
          seconds: "{{ lepes_ido }}"

      - action: light.turn_off
        target:
          entity_id: light.halo_fo
```

### Script action típusok

| Action | Leírás |
|--------|--------|
| `action:` | Service hívás (`target`, `data`, `data_template`) |
| `delay:` | Várakozás (`seconds`, `HH:MM:SS`, vagy kulcs: érték) |
| `wait_template:` | Várakozás amíg egy template `true` nem lesz |
| `wait_for_trigger:` | Várakozás amíg egy trigger be nem következik |
| `variables:` | Változók beállítása |
| `if:` / `then:` / `else:` | Feltételes végrehajtás |
| `choose:` / `default:` | Többágú feltétel (switch/case) |
| `repeat:` | Ciklus (`while`, `until`, `count`) |
| `parallel:` | Párhuzamos action-ök |
| `event:` | Esemény kiváltása |
| `scene:` | Scene aktiválása (rövidítés) |
| `stop:` | Script leállítása (`reason:`, `error: true/false`) |

### Choose (switch/case)

```yaml
- choose:
    - conditions:
        - condition: sun
          after: sunset
      sequence:
        - action: light.turn_on
          data: {}
  default:
    - action: light.turn_off
      data: {}
```

### Repeat (loop)

```yaml
- repeat:
    count: 4
    sequence:
      - action: light.turn_on
        target:
          entity_id: "{{ 'light.lampa_' ~ repeat.index }}"
```

---

## 11. Szcénák (Scenes) YAML-ben

A scene = entity-ek előre beállított állapotainak halmaza.

```yaml
# scenes.yaml
- id: "szcena_esti"
  name: "Esti hangulat"
  icon: mdi:weather-night
  entities:
    light.nappali_fo:
      state: "on"
      brightness: 60
      color_temp: 350
    light.halo_fo:
      state: "off"
    cover.nappali_fuggony:
      state: "on"           # "on" = zárt (cover domain)
    light.etkezo:
      state: "on"
      brightness: 40
      rgb_color: [255, 120, 50]
```

---

## 12. Template Sensor-ok YAML-ben

### Trigger-alapú template sensor

```yaml
# templates.yaml
- trigger:
    - trigger: time_pattern
      hours: "*"
      minutes: "*"
    - trigger: homeassistant
      event: start

  sensor:
    - name: "Kinti idő összefoglaló"
      unique_id: kinti_ido_osszefoglalo
      state: >
        {% set temp = states('sensor.kulso_homerseklet') %}
        {% set hum  = states('sensor.kulso_paratartalom') %}
        Kint {{ temp }}°C, páratartalom {{ hum }}%
      attributes:
        temperature:  "{{ states('sensor.kulso_homerseklet') }}"
        humidity:     "{{ states('sensor.kulso_paratartalom') }}"
        last_updated: "{{ now() }}"
```

### Adatvezérelt (nem trigger-alapú) template sensor

```yaml
- sensor:
    - name: "Nappali fény + hőmérséklet"
      unique_id: nappali_feny_homerseklet
      state: >
        {% set temp = states('sensor.nappali_homerseklet') | float %}
        {% set lux  = states('sensor.nappali_fenyero') | float %}
        {% if   lux <  10 %}🌙 Sötét
        {% elif lux < 100 %}🌆 Szürkület
        {% elif lux < 500 %}☀️ Napos
        {% else            %}☀️ Nagyon napos
        {% endif %} | {{ '%.1f' | format(temp) }}°C
```

### Template Binary Sensor

```yaml
- binary_sensor:
    - name: "Ajtó nyitva"
      unique_id: ajto_nyitva
      device_class: door
      state: >
        {{ is_state('binary_sensor.bejarati_ajto_kontakt', 'on') }}
```

### Elérhető Jinja2 template függvények

| Függvény | Leírás |
|----------|--------|
| `states('entity_id')` | Entity állapotának lekérése (string) |
| `states.entity_id` | Ugyanaz, rövidebb formában |
| `is_state('entity_id', 'state')` | Boolean ellenőrzés |
| `state_attr('entity_id', 'attr_name')` | Attribute lekérése |
| `float()`, `int()` | Típuskonverzió |
| `now()`, `utcnow()` | Aktuális dátum/idő |
| `as_timestamp()` | Dátum → Unix timestamp |
| `timestamp_custom()` | Timestamp formázás |
| `relative_time()` | Relatív idő (pl. `"2 hours ago"`) |
| `expand()` | Group-ok kibontása tagokra |
| `area_id()`, `area_name()` | Terület információk |
| `device_id()`, `device_attr()` | Eszköz információk |
| `iif(cond, if_true, if_false)` | Inline if/else |
| `regex_match()`, `regex_replace()` | Regex műveletek |
| `strptime()` | String → datetime parse |

---

## 13. Gyakori YAML Integráció Példák

### MQTT sensor

```yaml
sensor:
  - platform: mqtt
    name: "Kültéri hőmérséklet"
    state_topic: "sensor/kulter/homerseklet"
    unit_of_measurement: "°C"
    device_class: temperature
    value_template: "{{ value_json.temperature }}"
```

### MQTT switch

```yaml
switch:
  - platform: mqtt
    name: "Garázs főkapcsoló"
    command_topic: "garazs/fokapcsolo/set"
    state_topic:   "garazs/fokapcsolo/state"
    payload_on:  "ON"
    payload_off: "OFF"
    optimistic: false
    qos: 1
    retain: true
```

### REST sensor

```yaml
sensor:
  - platform: rest
    name: "Árfolyam"
    resource: "https://api.example.com/arfolyam"
    method: GET
    headers:
      Authorization: "Bearer !secret api_key"
    value_template: "{{ value_json.rate }}"
    scan_interval: 3600
```

---

## 14. Hibakeresés és Validáció

### Config check parancsok

```bash
# HA OS / Container:
ha core check

# HA Core (manuális telepítés):
python -m homeassistant --config /path/to/config --check-config

# UI-ból:
# Developer Tools → YAML → Check Configuration
```

### Log figyelés

```bash
# HA OS:
ha logs --follow

# HA Core (systemd):
journalctl -u home-assistant@homeassistant -f

# UI-ból:
# Settings → System → Logs
```

### Gyakori hibák és megoldások

| Hibaüzenet | Ok | Megoldás |
|-----------|----|---------|
| `found character '\t'` | TAB karakter | Cseréld 2 space-re |
| `not a valid value for dictionary value` | Boolean probléma | Idézőjelezd az `"on"`/`"off"` értékeket |
| `Config invalid: key X is not a valid key` | Rossz kulcsnév | Ellenőrizd a dokumentációt |
| `Platform error sensor.X` | Integráció hiba | Nézd a logot részletesen |
| `Duplicate key: Y` | Dupla kulcs | Töröld vagy merge-eld |
| `Package Y is not valid` | Package szintaxis hiba | Ellenőrizd az indentációt |

---

## 15. YAML Eszközök és Validátorok

| Eszköz | Elérhetőség | Leírás |
|--------|------------|--------|
| **Online YAML Validator** | yamllint.com | Gyors szintaxis ellenőrzés böngészőből |
| **VS Code YAML extension** | Red Hat YAML ext. | IntelliSense + valós idejű validáció |
| **yamllint (CLI)** | `pip install yamllint` | Lokális lint, CI-ba is integrálható |
| **CodeBeauty (Android)** | Play Store | YAML szerkesztés mobilon |
| **HA Add-on: Studio Code Server** | Beépített add-on | Teljes VS Code HA-ban, YAML támogatással |
| **HA Add-on: File Editor** | Beépített add-on | Egyszerű beépített szerkesztő |

---

## 16. YAML vs UI — Döntési Mátrix

| Mit akarsz | UI *(Settings)* | YAML |
|-----------|:---------------:|:----:|
| Egyszerű automatizáció | ✅ | ✅ |
| Komplex automatizáció (`choose`, `repeat`, `parallel`) | ⚠️ | ✅ |
| Egyszerű sensor (MQTT, REST) | ✅ | ✅ |
| Template sensor / binary_sensor | ❌ | ✅ |
| Scene | ✅ | ✅ |
| Script paraméterekkel (`fields`) | ❌ | ✅ |
| Egyéni entity customize | ✅ | ✅ |
| Packages (logikai csoportosítás) | ❌ | ✅ |
| Verziókezelés (Git) | ❌ | ✅ |
| Secrets kezelés | — | ✅ |
| Blueprint import | ✅ | ✅ |

---

## 17. Fontos Linkek

| Téma | URL |
|------|-----|
| Configuration.yaml főoldal | https://www.home-assistant.io/docs/configuration/ |
| YAML szintaxis (hivatalos) | https://www.home-assistant.io/docs/configuration/yaml/ |
| Konfiguráció szétbontása | https://www.home-assistant.io/docs/configuration/splitting_configuration/ |
| Packages dokumentáció | https://www.home-assistant.io/docs/configuration/packages/ |
| Secrets kezelés | https://www.home-assistant.io/docs/configuration/secrets/ |
| Automatizáció YAML-ben | https://www.home-assistant.io/docs/automation/yaml/ |
| Script szintaxis | https://www.home-assistant.io/docs/scripts/ |
| Conditions (feltételek) | https://www.home-assistant.io/docs/scripts/conditions/ |
| Template (Jinja2) referencia | https://www.home-assistant.io/docs/configuration/templating/ |
| Blueprints | https://www.home-assistant.io/docs/blueprint/ |
| Elérhető integrációk listája | https://www.home-assistant.io/integrations/ |
| YAML style guide (fejlesztőknek) | https://developers.home-assistant.io/docs/documenting/yaml-style-guide/ |
| HA Community Forum | https://community.home-assistant.io/ |
| HA Discord | https://discord.gg/home-assistant |
| HA GitHub (példa konfigurációk) | https://github.com/search?q=topic%3Ahome-assistant-config&type=repositories |

---

## 18. Zárszó — Best Practices

1. **Legyél konzisztens** — 2 space indentáció, logikus mappastruktúra minden fájlban
2. **Használj packages-t** — minden eszközcsoportnak saját fájl a `packages/` mappában
3. **Secrets mindenre** — jelszó, API kulcs soha nem kerülhet ki GitHub-ra
4. **Git repo** — verziókövesd a teljes `/config` mappát; `.gitignore`-ba kerüljön a `secrets.yaml`
5. **Unique ID** — minden entity/adatbázisba kerülő dolog kapjon egyedi azonosítót
6. **`alias` mező** — minden automatizációnak és scriptnek legyen emberi olvasható neve
7. **Teszteld** — futtass `Check Configuration`-t minden változtatás után
8. **Fokozatosság** — kis lépésekben haladj, ne egyszerre változtass 100 sort
9. **Backup** — mentsd le a konfigurációt nagyobb módosítás előtt
10. **Dokumentálj** — kommenteld a nem triviális részeket `#`-tel a YAML-ben

---

*Remélem ez az útmutató segít magabiztosan használni a HA YAML konfigurációt. Ha bármi kérdésed van, szólj bátran!*

*— Hermes Agent, 2026. május*
