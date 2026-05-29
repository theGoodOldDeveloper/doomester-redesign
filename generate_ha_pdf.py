#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, Preformatted, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ── Color palette ──────────────────────────────────────────────
HA_BLUE       = colors.HexColor("#1565C0")
HA_BLUE_LIGHT = colors.HexColor("#1E88E5")
HA_BLUE_BG    = colors.HexColor("#E3F2FD")
HA_TEAL       = colors.HexColor("#00838F")
CODE_BG       = colors.HexColor("#1E1E2E")
CODE_FG       = colors.HexColor("#CDD6F4")
CODE_COMMENT  = colors.HexColor("#6C7086")
WARN_BG       = colors.HexColor("#FFF8E1")
WARN_BORDER   = colors.HexColor("#FFA000")
TABLE_HEADER  = colors.HexColor("#1565C0")
TABLE_ALT     = colors.HexColor("#F5F9FF")
TABLE_BORDER  = colors.HexColor("#BBDEFB")
HEADING_LINE  = colors.HexColor("#1E88E5")
TEXT_DARK     = colors.HexColor("#212121")
TEXT_MUTED    = colors.HexColor("#546E7A")
SUCCESS_GREEN = colors.HexColor("#2E7D32")
ERROR_RED     = colors.HexColor("#C62828")
PAGE_BG       = colors.white

W, H = A4

# ── Font setup ─────────────────────────────────────────────────
FONT_DIRS = [
    "/usr/share/fonts/truetype/dejavu/",
    "/usr/share/fonts/truetype/liberation/",
    "/usr/share/fonts/truetype/freefont/",
    "/usr/share/fonts/",
]

def find_font(candidates):
    for d in FONT_DIRS:
        for c in candidates:
            p = os.path.join(d, c)
            if os.path.exists(p):
                return p
    return None

sans_r  = find_font(["LiberationSans-Regular.ttf",   "DejaVuSans.ttf",           "FreeSans.ttf"])
sans_b  = find_font(["LiberationSans-Bold.ttf",       "DejaVuSans-Bold.ttf",      "FreeSansBold.ttf"])
sans_i  = find_font(["LiberationSans-Italic.ttf",     "DejaVuSans-Oblique.ttf",   "FreeSansOblique.ttf"])
mono_r  = find_font(["LiberationMono-Regular.ttf",    "DejaVuSansMono.ttf",       "FreeMono.ttf"])
mono_b  = find_font(["LiberationMono-Bold.ttf",       "DejaVuSansMono-Bold.ttf",  "FreeMonoBold.ttf"])

USE_CUSTOM = bool(sans_r and sans_b and mono_r)
if USE_CUSTOM:
    pdfmetrics.registerFont(TTFont("Sans",      sans_r))
    pdfmetrics.registerFont(TTFont("Sans-Bold", sans_b))
    if sans_i:
        pdfmetrics.registerFont(TTFont("Sans-Italic", sans_i))
    pdfmetrics.registerFont(TTFont("Mono",      mono_r))
    if mono_b:
        pdfmetrics.registerFont(TTFont("Mono-Bold",  mono_b))

F_SANS      = "Sans"      if USE_CUSTOM else "Helvetica"
F_SANS_B    = "Sans-Bold" if USE_CUSTOM else "Helvetica-Bold"
F_SANS_I    = "Sans-Italic" if (USE_CUSTOM and sans_i) else "Helvetica-Oblique"
F_MONO      = "Mono"      if USE_CUSTOM else "Courier"
F_MONO_B    = "Mono-Bold" if (USE_CUSTOM and mono_b) else "Courier-Bold"

# ── Styles ─────────────────────────────────────────────────────
def make_styles():
    base = getSampleStyleSheet()

    def ps(name, **kw):
        return ParagraphStyle(name, **kw)

    return {
        "cover_title": ps("cover_title",
            fontName=F_SANS_B, fontSize=26, textColor=colors.white,
            alignment=TA_CENTER, spaceAfter=8, leading=32),
        "cover_sub": ps("cover_sub",
            fontName=F_SANS_I, fontSize=13, textColor=colors.HexColor("#B3E5FC"),
            alignment=TA_CENTER, spaceAfter=6, leading=18),
        "cover_meta": ps("cover_meta",
            fontName=F_SANS, fontSize=10, textColor=colors.HexColor("#90CAF9"),
            alignment=TA_CENTER, spaceAfter=4),

        "h1": ps("h1",
            fontName=F_SANS_B, fontSize=17, textColor=HA_BLUE,
            spaceBefore=18, spaceAfter=6, leading=22, keepWithNext=1),
        "h2": ps("h2",
            fontName=F_SANS_B, fontSize=13, textColor=HA_TEAL,
            spaceBefore=14, spaceAfter=4, leading=17, keepWithNext=1),
        "h3": ps("h3",
            fontName=F_SANS_B, fontSize=11, textColor=TEXT_DARK,
            spaceBefore=10, spaceAfter=3, leading=15, keepWithNext=1),

        "body": ps("body",
            fontName=F_SANS, fontSize=9.5, textColor=TEXT_DARK,
            spaceAfter=5, leading=14, alignment=TA_JUSTIFY),
        "body_bold": ps("body_bold",
            fontName=F_SANS_B, fontSize=9.5, textColor=TEXT_DARK,
            spaceAfter=5, leading=14),
        "bullet": ps("bullet",
            fontName=F_SANS, fontSize=9.5, textColor=TEXT_DARK,
            leftIndent=14, spaceAfter=3, leading=14, bulletIndent=4),
        "note": ps("note",
            fontName=F_SANS_I, fontSize=9, textColor=TEXT_MUTED,
            spaceAfter=5, leading=13),
        "toc_title": ps("toc_title",
            fontName=F_SANS_B, fontSize=14, textColor=HA_BLUE,
            spaceBefore=0, spaceAfter=12, alignment=TA_CENTER),
        "toc_item": ps("toc_item",
            fontName=F_SANS, fontSize=9.5, textColor=TEXT_DARK,
            spaceAfter=3, leading=14),
        "footer": ps("footer",
            fontName=F_SANS, fontSize=8, textColor=TEXT_MUTED,
            alignment=TA_CENTER),
        "inline_code": ps("inline_code",
            fontName=F_MONO, fontSize=8.5, textColor=HA_TEAL,
            spaceAfter=4, leading=12),
        "table_header": ps("table_header",
            fontName=F_SANS_B, fontSize=8.5, textColor=colors.white,
            alignment=TA_LEFT, leading=11),
        "table_cell": ps("table_cell",
            fontName=F_SANS, fontSize=8.5, textColor=TEXT_DARK,
            alignment=TA_LEFT, leading=11),
        "table_code": ps("table_code",
            fontName=F_MONO, fontSize=7.5, textColor=HA_TEAL,
            alignment=TA_LEFT, leading=10),
        "warning_text": ps("warning_text",
            fontName=F_SANS, fontSize=9, textColor=colors.HexColor("#5D4037"),
            spaceAfter=4, leading=13, leftIndent=10),
    }

ST = make_styles()

# ── Page template ──────────────────────────────────────────────
MARGIN = 1.8*cm

def on_page(canvas, doc):
    canvas.saveState()
    # thin blue top bar
    canvas.setFillColor(HA_BLUE)
    canvas.rect(0, H - 6*mm, W, 6*mm, fill=1, stroke=0)
    # footer
    canvas.setFont(F_SANS, 7.5)
    canvas.setFillColor(TEXT_MUTED)
    footer = "Home Assistant YAML Konfigurációs Útmutató  •  Végh Tibor"
    canvas.drawCentredString(W/2, 12*mm, footer)
    canvas.setFillColor(HA_BLUE)
    canvas.drawRightString(W - MARGIN, 12*mm, f"{doc.page}")
    # thin bottom line
    canvas.setStrokeColor(TABLE_BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 18*mm, W - MARGIN, 18*mm)
    canvas.restoreState()

def on_first_page(canvas, doc):
    canvas.saveState()
    # Full blue gradient background for cover
    canvas.setFillColor(HA_BLUE)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Decorative circles
    canvas.setFillColor(colors.HexColor("#1976D2"))
    canvas.circle(W - 2*cm, H - 3*cm, 3*cm, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#0D47A1"))
    canvas.circle(2*cm, 3*cm, 2*cm, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#1565C0"))
    canvas.circle(W/2, H*0.38, 8*cm, fill=1, stroke=0)
    canvas.restoreState()

# ── Helper flowables ───────────────────────────────────────────
def heading_rule():
    return HRFlowable(width="100%", thickness=1.5, color=HEADING_LINE,
                      spaceAfter=4, spaceBefore=0, lineCap='round')

def section_spacer():
    return Spacer(1, 6)

def code_block(text, title=None):
    """Render a dark-background code block."""
    items = []
    if title:
        items.append(Paragraph(f'<font name="{F_SANS_I}" size="8" color="#90A4AE">{title}</font>',
                               ST["note"]))
    lines = text.rstrip()
    pre = Preformatted(lines, ParagraphStyle("code",
        fontName=F_MONO, fontSize=7.8, textColor=CODE_FG,
        backColor=CODE_BG, borderPadding=(6,8,6,8),
        leading=12, spaceAfter=8))
    items.append(pre)
    return items

def info_box(text, style="info"):
    bg = WARN_BG if style == "warn" else HA_BLUE_BG
    border = WARN_BORDER if style == "warn" else HA_BLUE_LIGHT
    icon = "⚠" if style == "warn" else "ℹ"
    data = [[Paragraph(f'{icon}  {text}', ST["warning_text"])]]
    t = Table(data, colWidths=[W - 2*MARGIN - 0.4*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,-1), bg),
        ("LEFTPADDING",  (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("TOPPADDING",   (0,0), (-1,-1), 6),
        ("BOTTOMPADDING",(0,0), (-1,-1), 6),
        ("LINEAFTER",    (0,0), (0,-1), 3, border),
        ("ROUNDEDCORNERS", [4]),
    ]))
    return [t, Spacer(1, 4)]

def make_table(headers, rows, col_widths=None):
    usable = W - 2*MARGIN - 0.4*cm
    if col_widths is None:
        col_widths = [usable / len(headers)] * len(headers)
    else:
        # normalize
        total = sum(col_widths)
        col_widths = [usable * w / total for w in col_widths]

    header_row = [Paragraph(h, ST["table_header"]) for h in headers]
    data = [header_row]
    for i, row in enumerate(rows):
        cells = []
        for j, cell in enumerate(row):
            if isinstance(cell, str):
                # detect code-like content
                if cell.startswith('`') and cell.endswith('`'):
                    cells.append(Paragraph(cell[1:-1], ST["table_code"]))
                else:
                    cells.append(Paragraph(cell, ST["table_cell"]))
            else:
                cells.append(cell)
        data.append(cells)

    ts = TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0),  TABLE_HEADER),
        ("TEXTCOLOR",     (0, 0), (-1, 0),  colors.white),
        ("FONTNAME",      (0, 0), (-1, 0),  F_SANS_B),
        ("FONTSIZE",      (0, 0), (-1,-1),  8.5),
        ("ROWBACKGROUNDS",(0, 1), (-1,-1),  [colors.white, TABLE_ALT]),
        ("GRID",          (0, 0), (-1,-1),  0.4, TABLE_BORDER),
        ("LINEBELOW",     (0, 0), (-1, 0),  1.5, HA_BLUE),
        ("LEFTPADDING",   (0, 0), (-1,-1),  6),
        ("RIGHTPADDING",  (0, 0), (-1,-1),  6),
        ("TOPPADDING",    (0, 0), (-1,-1),  5),
        ("BOTTOMPADDING", (0, 0), (-1,-1),  5),
        ("VALIGN",        (0, 0), (-1,-1),  "MIDDLE"),
    ])
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(ts)
    return t

def bullet(text):
    import re
    # Replace **bold** markers (paired)
    def replace_bold(t):
        result = []
        parts = t.split("**")
        for i, part in enumerate(parts):
            if i % 2 == 1:
                result.append(f"<b>{part}</b>")
            else:
                result.append(part)
        return "".join(result)
    text = replace_bold(text)
    # Replace `code` with colored mono
    text = re.sub(r'`([^`]+)`',
                  lambda m: f'<font name="{F_MONO}" color="#00838F" size="8">{m.group(1)}</font>',
                  text)
    text = text.replace("→", "&#8594;")
    return Paragraph(f"&#8226;  {text}", ST["bullet"])

def inline(text):
    """Body paragraph with basic markdown-ish inline formatting."""
    import re
    def replace_bold(t):
        result = []
        parts = t.split("**")
        for i, part in enumerate(parts):
            if i % 2 == 1:
                result.append(f"<b>{part}</b>")
            else:
                result.append(part)
        return "".join(result)
    text = replace_bold(text)
    text = re.sub(r'`([^`]+)`',
                  lambda m: f'<font name="{F_MONO}" color="#00838F" size="8">{m.group(1)}</font>',
                  text)
    text = text.replace("→", "&#8594;")
    return Paragraph(text, ST["body"])

# ══════════════════════════════════════════════════════════════════
# Document content builder
# ══════════════════════════════════════════════════════════════════
def build_content():
    story = []

    # ── COVER PAGE ─────────────────────────────────────────────
    story.append(Spacer(1, 5*cm))
    story.append(Paragraph("🏠  Home Assistant", ST["cover_title"]))
    story.append(Paragraph("YAML Konfigurációs Útmutató", ST["cover_title"]))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("Átfogó referencia full stack fejlesztőknek", ST["cover_sub"]))
    story.append(Spacer(1, 0.8*cm))
    story.append(Paragraph("Verzió: 2026. május", ST["cover_meta"]))
    story.append(Paragraph("HA Core 2025.x / 2026.x alapján", ST["cover_meta"]))
    story.append(Spacer(1, 0.4*cm))
    story.append(Paragraph("Összeállította: Hermes Agent — Végh Tibor részére", ST["cover_meta"]))
    story.append(PageBreak())

    # ── TABLE OF CONTENTS ──────────────────────────────────────
    story.append(Paragraph("Tartalomjegyzék", ST["toc_title"]))
    story.append(heading_rule())
    story.append(Spacer(1, 4))

    toc_entries = [
        ("1.", "Bevezetés — Miért és mikor használj YAML-t?"),
        ("2.", "YAML Szintaxis Alapok (JavaScript fejlesztőknek)"),
        ("3.", "A configuration.yaml — A központi konfigurációs fájl"),
        ("4.", "YAML Fájlok és Fájlszervezés"),
        ("5.", "secrets.yaml — Titkok tárolása"),
        ("6.", "Entity Customization"),
        ("7.", "Packages (Csomagok)"),
        ("8.", "Automatizációk YAML-ben"),
        ("9.", "Feltételek (Conditions)"),
        ("10.","Script-ek YAML-ben"),
        ("11.","Szcénák (Scenes) YAML-ben"),
        ("12.","Template Sensor-ok YAML-ben"),
        ("13.","Gyakori YAML Integráció Példák"),
        ("14.","Hibakeresés és Validáció"),
        ("15.","YAML Eszközök és Validátorok"),
        ("16.","YAML vs UI — Döntési Mátrix"),
        ("17.","Fontos Linkek"),
        ("18.","Zárszó — Best Practices"),
    ]
    for num, title in toc_entries:
        row = [
            Paragraph(f'<font name="{F_SANS_B}" color="#1565C0">{num}</font>', ST["toc_item"]),
            Paragraph(title, ST["toc_item"]),
        ]
        t = Table([row], colWidths=[1.2*cm, W - 2*MARGIN - 1.6*cm])
        t.setStyle(TableStyle([
            ("LEFTPADDING",  (0,0), (-1,-1), 0),
            ("RIGHTPADDING", (0,0), (-1,-1), 0),
            ("TOPPADDING",   (0,0), (-1,-1), 2),
            ("BOTTOMPADDING",(0,0), (-1,-1), 2),
        ]))
        story.append(t)
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 1. BEVEZETÉS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("1. Bevezetés — Miért és mikor használj YAML-t?", ST["h1"]))
    story.append(heading_rule())
    story.append(inline("A Home Assistant kétféle konfigurációs módot támogat: grafikus felhasználói felület (UI) és kézi YAML szerkesztés. Mindkettőnek megvan a maga helye — az alábbiakban összefoglaljuk, mikor érdemes melyiket választani."))
    story.append(Spacer(1, 6))

    story.append(Paragraph("✅  Mikor használj YAML-t:", ST["h2"]))
    for text in [
        "**Speciális, nem UI-barát integrációk** — pl. `template sensor`, `template binary_sensor`, `customize`, `mqtt` egyedi eszközök",
        "**Komplex automatizációk** amik UI-ban túl körülményesek (pl. mélyen egymásba ágyazott `choose`, `repeat`, `parallel`)",
        "**Szcenáriók (scenes)** — határozottan gyorsabb YAML-ben megírni",
        "**Csomagok (packages)** — logikusan elkülönített eszközcsoportok",
        "**Egyedi `input_*` helperek deklarálása** batch-szerűen",
        "**Verziókezelés** — YAML fájlokat lehet Git-ben tárolni",
        "**Template-ek (Jinja2)** a `configuration.yaml`-ben — csak YAML-ből érhetők el teljes körűen",
        "**Secrets kezelés** — a `secrets.yaml` fájlba rejthetők a jelszavak/API kulcsok",
    ]:
        story.append(bullet(text))

    story.append(Spacer(1, 6))
    story.append(Paragraph("❌  Mikor kerüld a YAML-t:", ST["h2"]))
    for text in [
        "**Beépített integrációk** amiket a UI Settings → Integrations alatt támogat (ezek UI-ból karbantarthatók)",
        "**Egyszerű automatizációk** (1 trigger + 1 action) — a UI automata generálja az `automations.yaml`-t, kézzel ne nyúlj hozzá",
        "**UI által menedzselt fájlok** — `automations.yaml`, `scenes.yaml`, `scripts.yaml` — ezeket a UI írja/felülírja",
    ]:
        story.append(bullet(text))

    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 2. YAML SZINTAXIS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("2. YAML Szintaxis Alapok (JavaScript fejlesztőknek)", ST["h1"]))
    story.append(heading_rule())

    story.append(Paragraph("Alapfogalmak", ST["h2"]))
    story.append(make_table(
        ["JavaScript", "YAML megfelelője"],
        [
            ["`{ kulcs: ertek }`",  "kulcs: ertek  (mapping)"],
            ["`[ elem1, elem2 ]`",  "- elem1 / - elem2  (list/sequence)"],
            ["`{ a: { b: c } }`",   "a: / ..b: c  (beljebb húzva, 2 space)"],
            ["`// komment`",        "# komment"],
            ["indentáció (bármi)",  "2 space — TILOS a TAB!"],
        ],
        col_widths=[4, 6]
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("Kritikus szabályok", ST["h2"]))
    story += code_block(
        "# HELYES — 2 space indentáció:\n"
        "sensor:\n"
        "  - platform: mqtt\n"
        "    state_topic: \"sensor/topic\"\n\n"
        "# HELYTELEN — TAB használata:\n"
        "sensor:\n"
        "\t- platform: mqtt    # ← HIBA: \"found character '\\t'\""
    )

    story.append(Paragraph("Booleans — A leggyakoribb buktató", ST["h2"]))
    story.append(inline(
        "YAML automatikusan értelmezi ezeket <b>true</b>-ként: `yes`, `Y`, `true`, `True`, `on`, `On`, `ON` — "
        "és <b>false</b>-ként: `no`, `N`, `false`, `False`, `off`, `Off`, `OFF`"
    ))
    story.append(inline("Ha stringként akarod az \"on\" vagy \"off\" szavakat (pl. entity state), <b>IDÉZŐJELEZD!</b>"))
    story += code_block(
        "# HELYES — stringként kezelődik\n"
        "state: \"on\"\n\n"
        "# HELYTELEN — YAML true-ként értelmezi\n"
        "state: on"
    )

    story.append(Paragraph("Duplikált kulcsok", ST["h2"]))
    story.append(inline("Ha ugyanaz a kulcs kétszer szerepel, <b>az utolsó nyer</b> — nincs merge!"))
    story += code_block(
        "sensor:\n"
        "  - platform: template\n"
        "sensor:       # ← FELÜLÍRJA az előzőt!\n"
        "  - platform: mqtt"
    )
    story += info_box(
        "A HA case-sensitive: light.Living_Room ≠ light.living_room. "
        "A pontos nevet a Developer Tools → States-ban ellenőrizd.", "warn"
    )
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 3. CONFIGURATION.YAML
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("3. A configuration.yaml — A központi konfigurációs fájl", ST["h1"]))
    story.append(heading_rule())

    story.append(Paragraph("Helye:", ST["h2"]))
    for text in [
        "**HA OS (Raspberry Pi):** `/config/configuration.yaml`",
        "**HA Core (manuális):** a HA config mappában",
        "**HA Container:** `/config/configuration.yaml`",
    ]:
        story.append(bullet(text))

    story.append(Paragraph("Minimális struktúra:", ST["h2"]))
    story += code_block(
        "homeassistant:\n"
        "  name: \"Otthon\"\n"
        "  latitude: 47.8\n"
        "  longitude: 19.9\n"
        "  elevation: 200\n"
        "  unit_system: metric        # vagy: us_customary\n"
        "  time_zone: \"Europe/Budapest\"\n"
        "  currency: HUF\n"
        "  country: HU\n\n"
        "default_config:              # Betölti az összes alap integrációt\n\n"
        "automation: !include automations.yaml\n"
        "script:     !include scripts.yaml\n"
        "scene:      !include scenes.yaml\n\n"
        "sensor:        !include sensors.yaml\n"
        "binary_sensor: !include binary_sensors.yaml\n"
        "switch:        !include switches.yaml\n"
        "light:         !include lights.yaml\n"
        "template:      !include templates.yaml"
    )

    story.append(Paragraph("A homeassistant: blokk kulcsai:", ST["h2"]))
    story.append(make_table(
        ["Kulcs", "Típus", "Leírás"],
        [
            ["`name`",                    "string",                "Az instance neve"],
            ["`latitude` / `longitude`",  "float",                 "Hely koordináták (naplemente/hajnal számításhoz)"],
            ["`elevation`",               "integer",               "Tengerszint feletti magasság (méter/láb)"],
            ["`unit_system`",             "metric / us_customary", "Mértékegység rendszer"],
            ["`time_zone`",               "string",                "IANA timezone (pl. Europe/Budapest)"],
            ["`currency`",                "string",                "Pénznem ISO kód (pl. HUF)"],
            ["`country`",                 "string",                "Országkód (ISO 3166-1 alpha-2)"],
            ["`customize`",               "map",                   "Entity specifikus beállítások"],
            ["`customize_domain`",        "map",                   "Domain-wide beállítások"],
            ["`packages`",                "map",                   "Logikai eszközcsoportok (lásd 7. fejezet)"],
            ["`allowlist_external_dirs`", "list",                  "Engedélyezett külső mappák"],
            ["`allowlist_external_urls`", "list",                  "Engedélyezett külső URL-ek"],
            ["`media_dirs`",              "map",                   "Média mappák aliassal"],
        ],
        col_widths=[3.5, 3, 7.5]
    ))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 4. FÁJLSZERVEZÉS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("4. YAML Fájlok és Fájlszervezés", ST["h1"]))
    story.append(heading_rule())

    includes = [
        ("!include — Fájl betöltése",
         "# configuration.yaml\nsensor: !include sensors.yaml\n\n"
         "# sensors.yaml\n- platform: template\n  sensors:\n    heti_nap:\n"
         "      value_template: \"{{ now().strftime('%A') }}\"",
         "Az include-olt fájlban NE ismételd a szülő kulcsot — a !include a tartalmat helyettesíti be."),
        ("!include_dir_list — Mappa betöltése listaként",
         "automation: !include_dir_list automations/\n\n"
         "/config/automations/\n├── welcome_home.yaml\n├── night_mode.yaml\n└── away_mode.yaml",
         "Minden .yaml fájl a mappában egy listaelem lesz."),
        ("!include_dir_named — Mappa betöltése név-érték párokként",
         "input_boolean: !include_dir_named input_booleans/\n\n"
         "/config/input_booleans/\n├── guest_mode.yaml   → kulcs: guest_mode\n└── cleaning.yaml     → kulcs: cleaning",
         "A fájlnév lesz a kulcs, a tartalom az érték. Legtöbbet ezt érdemes használni!"),
        ("!include_dir_merge_list — Mappa listáinak összefésülése",
         "automation manual: !include_dir_merge_list automations/\nautomation ui: !include automations.yaml",
         "Minden fájl egy-egy listát tartalmaz, az összes lista összefésülődik."),
        ("!include_dir_merge_named — Mappa mappingjeinek összefésülése",
         None,
         "Minden fájl kulcs-érték párokat tartalmaz, mind összeolvad."),
    ]
    for title, code, note in includes:
        story.append(Paragraph(title, ST["h2"]))
        if code:
            story += code_block(code)
        story.append(inline(note))
        story.append(Spacer(1, 4))

    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 5. SECRETS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("5. secrets.yaml — Titkok tárolása", ST["h1"]))
    story.append(heading_rule())
    story.append(inline("Soha ne írj jelszavakat, API kulcsokat közvetlenül a <b>configuration.yaml</b>-be!"))
    story += code_block(
        "# secrets.yaml\n"
        "wifi_ssid: \"MyWiFi\"\n"
        "wifi_password: \"SuperSecret123\"\n"
        "mqtt_broker: 192.168.1.100\n"
        "mqtt_password: \"mqtt_secret\"\n\n"
        "# configuration.yaml — hivatkozás !secret-tel\n"
        "sensor:\n"
        "  - platform: mqtt\n"
        "    broker: !secret mqtt_broker\n"
        "    password: !secret mqtt_password"
    )
    story += info_box(
        "Secrets feloldási sorrend: A HA először a fájl melletti secrets.yaml-t nézi, "
        "majd a configuration.yaml mellettit, végül a gyökér mappában lévőt."
    )
    story.append(inline(
        "<b>Debug:</b> Add hozzá a `logger: debug`-t a secrets.yaml tetejére, "
        "hogy lásd, hol töltődnek be a titkok (a titok értéke nem kerül a logba)."
    ))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 6. ENTITY CUSTOMIZATION
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("6. Entity Customization", ST["h1"]))
    story.append(heading_rule())
    story.append(inline("Entity-ek megjelenésének, nevének, ikonjának testreszabása:"))
    story += code_block(
        "homeassistant:\n"
        "  customize:\n"
        "    light.nappali_fo:\n"
        "      friendly_name: \"Nappali fővilágítás\"\n"
        "      icon: mdi:ceiling-light\n"
        "      assumed_state: false\n"
        "    sensor.kulso_homerseklet:\n"
        "      friendly_name: \"Külső hőmérséklet\"\n"
        "      unit_of_measurement: \"°C\"\n"
        "      icon: mdi:thermometer\n\n"
        "  customize_domain:\n"
        "    light:\n"
        "      icon: mdi:lightbulb\n"
        "    switch:\n"
        "      icon: mdi:toggle-switch"
    )
    story.append(Paragraph("Elérhető customize kulcsok:", ST["h2"]))
    story.append(make_table(
        ["Kulcs", "Leírás"],
        [
            ["`friendly_name`",        "Emberi olvasható név"],
            ["`icon`",                 "MDI ikon (pl. mdi:thermometer)"],
            ["`picture`",              "Kép URL az entity-hez"],
            ["`assumed_state`",        "Ha true, a UI nem jelzi ha bizonytalan az állapot"],
            ["`unit_of_measurement`",  "Mértékegység felülírása"],
            ["`device_class`",         "Eszközosztály (pl. temperature, humidity, motion)"],
            ["`entity_picture`",       "Entity képének URL-je"],
        ],
        col_widths=[4, 8]
    ))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 7. PACKAGES
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("7. Packages (Csomagok)", ST["h1"]))
    story.append(heading_rule())
    story.append(inline(
        "A packages a legerősebb módja a konfiguráció logikai csoportosításának. "
        "<b>Egy csomag = egy eszköz/logikai egység teljes konfigurációja</b> "
        "(sensorok, switchek, automatizációk, scriptek egy helyen)."
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Alapszintaxis:", ST["h2"]))
    story += code_block(
        "homeassistant:\n"
        "  packages:\n"
        "    nappali_vilagitas:\n"
        "      switch:\n"
        "        - platform: mqtt\n"
        "          name: \"Nappali főkapcsoló\"\n"
        "          command_topic: \"nappali/fokapcsolo/set\"\n"
        "      automation:\n"
        "        - alias: \"Nappali világítás este\"\n"
        "          triggers:\n"
        "            - trigger: sun\n"
        "              event: sunset\n"
        "          actions:\n"
        "            - action: switch.turn_on\n"
        "              target:\n"
        "                entity_id: switch.nappali_fokapcsolo"
    )

    story.append(Paragraph("Packages mappa használata (ajánlott):", ST["h2"]))
    story += code_block(
        "# configuration.yaml\n"
        "homeassistant:\n"
        "  packages: !include_dir_named packages/\n\n"
        "/config/packages/\n"
        "├── nappali_vilagitas.yaml\n"
        "├── halo_vilagitas.yaml\n"
        "├── kert_loccs.yaml\n"
        "├── garazs_kapu.yaml\n"
        "└── riaszto.yaml\n\n"
        "# packages/nappali_vilagitas.yaml\n"
        "switch:\n"
        "  - platform: mqtt\n"
        "    name: \"Nappali főkapcsoló\"\n"
        "    command_topic: \"...\"\n"
        "automation:\n"
        "  - alias: \"Nappali este be\"\n"
        "    triggers: [...]\n"
        "    actions: [...]"
    )

    story.append(Paragraph("Merge szabályok:", ST["h2"]))
    story.append(make_table(
        ["Típus", "Merge-elhető?", "Megjegyzés"],
        [
            ["Platform-alapú (light:, switch:, sensor:)", "✅ Igen",             "Lista szinten merge-elve"],
            ["Entity ID-s (input_boolean:, input_number:)","✅ Igen, ha unique ID","Kulcsok nem ütközhetnek"],
            ["Egyéb dictionary-k",                         "⚠️ Csak ha unique",  "Egy kulcs csak egyszer"],
        ],
        col_widths=[5, 2.5, 5.5]
    ))
    story += info_box(
        "auth_providers NEM lehet package-ben — azt a HA még a packages betöltése előtt feldolgozza.", "warn"
    )
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 8. AUTOMATIZÁCIÓK
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("8. Automatizációk YAML-ben", ST["h1"]))
    story.append(heading_rule())

    story.append(Paragraph("Alapstruktúra:", ST["h2"]))
    story += code_block(
        "automation:\n"
        "  - alias: \"Felkapcsolás naplementekor\"\n"
        "    id: \"a1b2c3d4-e5f6-7890-abcd-ef1234567890\"  # UUID a trace-ekhez\n"
        "    description: \"Ha lenyugszik a nap és itthon vagyunk\"\n"
        "    initial_state: true\n"
        "    mode: single          # single | restart | queued | parallel\n"
        "    max: 10               # csak queued/parallel módban\n"
        "    max_exceeded: warning\n"
        "    triggers:\n"
        "      - trigger: sun\n"
        "        event: sunset\n"
        "        offset: \"-01:00:00\"\n"
        "      - trigger: state\n"
        "        entity_id: person.tibor\n"
        "        to: \"home\"\n"
        "    conditions:\n"
        "      - condition: time\n"
        "        after: \"16:00:00\"\n"
        "        before: \"23:00:00\"\n"
        "    actions:\n"
        "      - action: light.turn_on\n"
        "        target:\n"
        "          entity_id: group.nappali_vilagitas"
    )

    story.append(Paragraph("Automatizáció módok:", ST["h2"]))
    story.append(make_table(
        ["Mode", "Viselkedés"],
        [
            ["`single`",   "Ha már fut, az új triggert eldobja (warning)"],
            ["`restart`",  "Megállítja a futót, elindítja az újat"],
            ["`queued`",   "Sorba állítja, egyesével futnak le (max: N)"],
            ["`parallel`", "Párhuzamosan futhat több példány (max: N)"],
        ],
        col_widths=[3, 9]
    ))

    story.append(Paragraph("Összes trigger típus:", ST["h2"]))
    story.append(make_table(
        ["Trigger", "Leírás"],
        [
            ["`trigger: state`",                  "Entity állapotváltozásra (from:, to:, for:)"],
            ["`trigger: mqtt`",                   "MQTT topic-ra érkező üzenetre"],
            ["`trigger: time`",                   "Adott időpontban (at: \"16:30:00\")"],
            ["`trigger: time_pattern`",           "Ismétlődő időzítés (pl. minden 5 perc)"],
            ["`trigger: homeassistant`",          "HA eseményekre (start, stop)"],
            ["`trigger: event`",                  "Egyedi eseményre (event_type: my_event)"],
            ["`trigger: sun`",                    "Nap eseményre (sunset, sunrise + offset)"],
            ["`trigger: zone`",                   "Zóna belépés/kilépés"],
            ["`trigger: tag`",                    "NFC tag scannelés"],
            ["`trigger: conversation`",           "Assist hangparancsra"],
            ["`trigger: numeric_state`",          "Numerikus állapot küszöbértékre"],
            ["`trigger: calendar`",               "Naptár eseményre"],
            ["`trigger: geo_location`",           "Geolokációs eseményre"],
            ["`trigger: persistent_notification`","Értesítés megjelenésekor"],
            ["`trigger: template`",               "Jinja2 template true értékére"],
            ["`trigger: webhook`",                "Webhook hívásra"],
            ["`trigger: device`",                 "UI-ból konfigurált device trigger"],
        ],
        col_widths=[4.5, 8.5]
    ))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 9. CONDITIONS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("9. Feltételek (Conditions)", ST["h1"]))
    story.append(heading_rule())
    story.append(inline("A conditions lista alapértelmezésben <b>AND</b> kapcsolatban van."))

    story.append(Paragraph("Összes condition típus:", ST["h2"]))
    story.append(make_table(
        ["Condition", "Leírás", "Példa"],
        [
            ["`condition: state`",         "Entity állapotának ellenőrzése",  "state: \"on\""],
            ["`condition: numeric_state`", "Numerikus érték vizsgálata",       "below: 25"],
            ["`condition: time`",          "Időablak vizsgálat",               "after: \"08:00\""],
            ["`condition: template`",      "Jinja2 template",                  "{{ ... |int < 20 }}"],
            ["`condition: sun`",           "Nap állása",                       "after: sunset"],
            ["`condition: zone`",          "Zóna ellenőrzés",                  "zone: zone.home"],
            ["`condition: trigger`",       "Trigger ID ellenőrzés",            "id: mozgas_ert"],
            ["`condition: and`",           "Logikai AND csoport",              "conditions: [...]"],
            ["`condition: or`",            "Logikai OR csoport",               "conditions: [...]"],
            ["`condition: not`",           "Logikai NOT",                      "conditions: [...]"],
        ],
        col_widths=[4, 4, 5]
    ))

    story.append(Paragraph("Logikai feltételek kombinálása:", ST["h2"]))
    story += code_block(
        "conditions:\n"
        "  - condition: and\n"
        "    conditions:\n"
        "      - condition: state\n"
        "        entity_id: binary_sensor.mozgas\n"
        "        state: \"on\"\n"
        "      - condition: or\n"
        "        conditions:\n"
        "          - condition: state\n"
        "            entity_id: light.nappali\n"
        "            state: \"off\"\n"
        "          - condition: numeric_state\n"
        "            entity_id: sensor.fenyero\n"
        "            below: 50\n\n"
        "# Shorthand template condition:\n"
        "conditions:\n"
        "  - \"{{ is_state('device_tracker.iphone', 'home') }}\""
    )
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 10. SCRIPTS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("10. Script-ek YAML-ben", ST["h1"]))
    story.append(heading_rule())
    story.append(inline(
        "A script egy előre meghívható lépéssorozat. Különbség az automatizációtól: "
        "automatizáció = trigger hatására indul, script = meghívásra indul."
    ))
    story += code_block(
        "script:\n"
        "  jotekony_vilagitas:\n"
        "    alias: \"Jó éjszakát világítás\"\n"
        "    icon: mdi:weather-night\n"
        "    description: \"Lassan lehalványítja a lámpákat\"\n"
        "    fields:\n"
        "      sebesseg:\n"
        "        name: \"Sebesség\"\n"
        "        description: \"Hány másodperc alatt halványuljon\"\n"
        "        required: false\n"
        "        default: 30\n"
        "        selector:\n"
        "          number:\n"
        "            min: 5\n"
        "            max: 120\n"
        "    variables:\n"
        "      lepes_ido: \"{{ sebesseg | int // 10 }}\"\n"
        "    sequence:\n"
        "      - action: light.turn_on\n"
        "        target:\n"
        "          entity_id: light.halo_fo\n"
        "        data:\n"
        "          brightness_pct: 50\n"
        "      - delay:\n"
        "          seconds: \"{{ lepes_ido }}\"\n"
        "      - action: light.turn_off\n"
        "        target:\n"
        "          entity_id: light.halo_fo"
    )

    story.append(Paragraph("Script action típusok:", ST["h2"]))
    story.append(make_table(
        ["Action", "Leírás"],
        [
            ["`action:`",            "Service hívás (target, data, data_template)"],
            ["`delay:`",             "Várakozás (seconds, HH:MM:SS, vagy kulcs: érték)"],
            ["`wait_template:`",     "Várakozás amíg egy template true nem lesz"],
            ["`wait_for_trigger:`",  "Várakozás amíg egy trigger be nem következik"],
            ["`variables:`",         "Változók beállítása"],
            ["`if: / then: / else:`","Feltételes végrehajtás"],
            ["`choose: / default:`", "Többágú feltétel (switch/case)"],
            ["`repeat:`",            "Ciklus (while, until, count)"],
            ["`parallel:`",          "Párhuzamos action-ök"],
            ["`event:`",             "Esemény kiváltása"],
            ["`scene:`",             "Scene aktiválása (rövidítés)"],
            ["`stop:`",              "Script leállítása (reason:, error: true/false)"],
        ],
        col_widths=[4, 9]
    ))

    story.append(Paragraph("Choose (switch/case):", ST["h2"]))
    story += code_block(
        "- choose:\n"
        "    - conditions:\n"
        "        - condition: sun\n"
        "          after: sunset\n"
        "      sequence:\n"
        "        - action: light.turn_on\n"
        "          data: {}\n"
        "  default:\n"
        "    - action: light.turn_off\n"
        "      data: {}"
    )

    story.append(Paragraph("Repeat (loop):", ST["h2"]))
    story += code_block(
        "- repeat:\n"
        "    count: 4\n"
        "    sequence:\n"
        "      - action: light.turn_on\n"
        "        target:\n"
        "          entity_id: \"{{ 'light.lampa_' ~ repeat.index }}\""
    )
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 11. SCENES
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("11. Szcénák (Scenes) YAML-ben", ST["h1"]))
    story.append(heading_rule())
    story.append(inline("A scene = entity-ek előre beállított állapotainak halmaza."))
    story += code_block(
        "# scenes.yaml\n"
        "- id: \"szcena_esti\"\n"
        "  name: \"Esti hangulat\"\n"
        "  icon: mdi:weather-night\n"
        "  entities:\n"
        "    light.nappali_fo:\n"
        "      state: \"on\"\n"
        "      brightness: 60\n"
        "      color_temp: 350\n"
        "    light.halo_fo:\n"
        "      state: \"off\"\n"
        "    cover.nappali_fuggony:\n"
        "      state: \"on\"          # \"on\" = zárt (cover domain)\n"
        "    light.etkezo:\n"
        "      state: \"on\"\n"
        "      brightness: 40\n"
        "      rgb_color: [255, 120, 50]"
    )

    # ════════════════════════════════════════════════════════════
    # 12. TEMPLATE SENSORS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("12. Template Sensor-ok YAML-ben", ST["h1"]))
    story.append(heading_rule())
    story.append(inline("Az egyik leghasznosabb YAML-only feature:"))
    story += code_block(
        "# templates.yaml — trigger-alapú:\n"
        "- trigger:\n"
        "    - trigger: time_pattern\n"
        "      hours: \"*\"\n"
        "      minutes: \"*\"\n"
        "    - trigger: homeassistant\n"
        "      event: start\n"
        "  sensor:\n"
        "    - name: \"Kinti idő összefoglaló\"\n"
        "      unique_id: kinti_ido_osszefoglalo\n"
        "      state: >\n"
        "        {% set temp = states('sensor.kulso_homerseklet') %}\n"
        "        {% set hum = states('sensor.kulso_paratartalom') %}\n"
        "        Kint {{ temp }}°C, páratartalom {{ hum }}%\n"
        "      attributes:\n"
        "        temperature: \"{{ states('sensor.kulso_homerseklet') }}\"\n"
        "        last_updated: \"{{ now() }}\"\n\n"
        "# Adatvezérelt template binary sensor:\n"
        "- binary_sensor:\n"
        "    - name: \"Ajtó nyitva\"\n"
        "      unique_id: ajto_nyitva\n"
        "      device_class: door\n"
        "      state: >\n"
        "        {{ is_state('binary_sensor.bejarati_ajto_kontakt', 'on') }}"
    )

    story.append(Paragraph("Elérhető Template függvények (Jinja2):", ST["h2"]))
    story.append(make_table(
        ["Függvény", "Leírás"],
        [
            ["`states('entity_id')`",            "Entity állapotának lekérése (string)"],
            ["`is_state('entity_id', 'state')`", "Boolean ellenőrzés"],
            ["`state_attr('entity_id', 'attr')`","Attribute lekérése"],
            ["`float()`, `int()`",               "Típuskonverzió"],
            ["`now()`, `utcnow()`",              "Aktuális dátum/idő"],
            ["`as_timestamp()`",                 "Dátum → Unix timestamp"],
            ["`relative_time()`",                "Relatív idő (pl. \"2 hours ago\")"],
            ["`expand()`",                       "Group-ok kibontása tagokra"],
            ["`area_id()`, `area_name()`",       "Terület információk"],
            ["`device_id()`, `device_attr()`",   "Eszköz információk"],
            ["`iif(cond, if_true, if_false)`",   "Inline if/else"],
            ["`regex_match()`, `regex_replace()`","Regex műveletek"],
            ["`strptime()`",                     "String → datetime parse"],
        ],
        col_widths=[5.5, 7.5]
    ))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 13. INTEGRÁCIÓS PÉLDÁK
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("13. Gyakori YAML Integráció Példák", ST["h1"]))
    story.append(heading_rule())

    story.append(Paragraph("MQTT sensor:", ST["h2"]))
    story += code_block(
        "sensor:\n"
        "  - platform: mqtt\n"
        "    name: \"Kültéri hőmérséklet\"\n"
        "    state_topic: \"sensor/kulter/homerseklet\"\n"
        "    unit_of_measurement: \"°C\"\n"
        "    device_class: temperature\n"
        "    value_template: \"{{ value_json.temperature }}\""
    )

    story.append(Paragraph("MQTT switch:", ST["h2"]))
    story += code_block(
        "switch:\n"
        "  - platform: mqtt\n"
        "    name: \"Garázs főkapcsoló\"\n"
        "    command_topic: \"garazs/fokapcsolo/set\"\n"
        "    state_topic: \"garazs/fokapcsolo/state\"\n"
        "    payload_on: \"ON\"\n"
        "    payload_off: \"OFF\"\n"
        "    optimistic: false\n"
        "    qos: 1\n"
        "    retain: true"
    )

    story.append(Paragraph("REST sensor:", ST["h2"]))
    story += code_block(
        "sensor:\n"
        "  - platform: rest\n"
        "    name: \"Árfolyam\"\n"
        "    resource: \"https://api.example.com/arfolyam\"\n"
        "    method: GET\n"
        "    headers:\n"
        "      Authorization: \"Bearer !secret api_key\"\n"
        "    value_template: \"{{ value_json.rate }}\"\n"
        "    scan_interval: 3600"
    )
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 14. HIBAKERESÉS
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("14. Hibakeresés és Validáció", ST["h1"]))
    story.append(heading_rule())

    story.append(Paragraph("Config check parancsok:", ST["h2"]))
    story += code_block(
        "# HA OS / Container:\n"
        "ha core check\n\n"
        "# HA Core (manuális):\n"
        "python -m homeassistant --config /path/to/config --check-config\n\n"
        "# UI-ból:\n"
        "# Developer Tools → YAML → Check Configuration\n\n"
        "# Log figyelés:\n"
        "ha logs --follow\n"
        "# vagy: Settings → System → Logs"
    )

    story.append(Paragraph("Gyakori hibák és megoldások:", ST["h2"]))
    story.append(make_table(
        ["Hibaüzenet", "Ok", "Megoldás"],
        [
            ["`found character '\\t'`",               "TAB használata",              "Cseréld 2 space-re"],
            ["`not a valid value for dict value`",    "Boolean probléma",            "Idézőjelezd az \"on\"/\"off\" értékeket"],
            ["`key X is not a valid key`",            "Rossz kulcsnév",              "Ellenőrizd a dokumentációt"],
            ["`Platform error sensor.X`",             "Integráció hiba",             "Nézd a logot részletesen"],
            ["`Duplicate key: Y`",                    "Dupla kulcs",                 "Töröld vagy merge-eld"],
            ["`Package Y is not valid`",              "Package szintaxis hiba",      "Ellenőrizd az indentációt"],
        ],
        col_widths=[4.5, 3.5, 5]
    ))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 15. ESZKÖZÖK
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("15. YAML Eszközök és Validátorok", ST["h1"]))
    story.append(heading_rule())
    story.append(make_table(
        ["Eszköz", "Elérhetőség", "Leírás"],
        [
            ["Online YAML Validator",          "yamllint.com",                 "Gyors szintaxis ellenőrzés online"],
            ["VS Code YAML extension",         "Red Hat YAML ext.",            "IntelliSense + valós idejű validáció"],
            ["yamllint (CLI)",                 "pip install yamllint",         "Lokális YAML lint, CI-ba integrálható"],
            ["CodeBeauty (Android)",           "Play Store",                   "Szerkesztés mobilon"],
            ["HA Add-on: Studio Code Server",  "Beépített HA add-on",         "Teljes VS Code HA-ban YAML támogatással"],
            ["HA Add-on: File Editor",         "Beépített HA add-on",         "Egyszerű beépített szerkesztő"],
        ],
        col_widths=[4, 3, 6]
    ))

    # ════════════════════════════════════════════════════════════
    # 16. DÖNTÉSI MÁTRIX
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("16. YAML vs UI — Döntési Mátrix", ST["h1"]))
    story.append(heading_rule())
    story.append(make_table(
        ["Mit akarsz", "UI", "YAML"],
        [
            ["Egyszerű automatizáció",                          "✅", "✅"],
            ["Komplex automatizáció (choose, repeat, parallel)","⚠️","✅"],
            ["Egyszerű sensor (MQTT, REST)",                    "✅", "✅"],
            ["Template sensor / binary_sensor",                 "❌", "✅"],
            ["Scene",                                           "✅", "✅"],
            ["Script paraméterekkel (fields)",                  "❌", "✅"],
            ["Egyéni entity customize",                         "✅", "✅"],
            ["Packages (logikai csoportosítás)",                "❌", "✅"],
            ["Verziókezelés (Git)",                             "❌", "✅"],
            ["Secrets kezelés",                                 "—",  "✅"],
            ["Blueprint import",                                "✅", "✅"],
        ],
        col_widths=[9, 2, 2]
    ))
    story.append(PageBreak())

    # ════════════════════════════════════════════════════════════
    # 17. LINKEK
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("17. Fontos Linkek", ST["h1"]))
    story.append(heading_rule())
    story.append(make_table(
        ["Téma", "URL"],
        [
            ["Configuration.yaml főoldal",  "home-assistant.io/docs/configuration/"],
            ["YAML szintaxis (hivatalos)",   "home-assistant.io/docs/configuration/yaml/"],
            ["Konfiguráció szétbontása",     "home-assistant.io/docs/configuration/splitting_configuration/"],
            ["Packages dokumentáció",        "home-assistant.io/docs/configuration/packages/"],
            ["Secrets kezelés",             "home-assistant.io/docs/configuration/secrets/"],
            ["Automatizáció YAML-ben",       "home-assistant.io/docs/automation/yaml/"],
            ["Script szintaxis",            "home-assistant.io/docs/scripts/"],
            ["Conditions (feltételek)",      "home-assistant.io/docs/scripts/conditions/"],
            ["Template (Jinja2) referencia", "home-assistant.io/docs/configuration/templating/"],
            ["Blueprints",                  "home-assistant.io/docs/blueprint/"],
            ["Integrációk listája",          "home-assistant.io/integrations/"],
            ["YAML style guide (devs)",      "developers.home-assistant.io/docs/documenting/yaml-style-guide/"],
            ["HA Community Forum",           "community.home-assistant.io/"],
            ["HA Discord",                  "discord.gg/home-assistant"],
            ["HA GitHub (példa konfig-ok)",  "github.com/search?q=topic:home-assistant-config"],
        ],
        col_widths=[5, 8]
    ))

    # ════════════════════════════════════════════════════════════
    # 18. BEST PRACTICES
    # ════════════════════════════════════════════════════════════
    story.append(Paragraph("18. Zárszó — Best Practices", ST["h1"]))
    story.append(heading_rule())
    practices = [
        "**Legyél konzisztens** — 2 space indentáció, logikus mappastruktúra minden fájlban",
        "**Használj packages-t** — minden eszközcsoportnak saját fájl a `packages/` mappában",
        "**Secrets mindenre** — soha nem kerülhet ki GitHub-ra jelszó, API kulcs",
        "**Git repo** — a teljes `/config` mappát verziókövesd, `.gitignore`-ba a secrets.yaml",
        "**Unique ID** — minden entity/adatbázisba kerülő dolog kapjon egyedi ID-t",
        "**`alias` mező** — minden automatizációnak és scriptnek legyen olvasható neve",
        "**Teszteld** — `Check Configuration` minden változtatás előtt és után",
        "**Fokozatosság** — ne egyszerre változtass 100 sort, kis lépésekben haladj",
        "**Backup** — mentsd le a konfigurációt mielőtt nagyot módosítasz",
        "**Dokumentálj** — kommenteld a nem triviális részeket `#`-tel",
    ]
    for i, p in enumerate(practices, 1):
        story.append(bullet(p))

    story.append(Spacer(1, 1*cm))
    story.append(HRFlowable(width="100%", thickness=1, color=TABLE_BORDER))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "<i>Remélem ez az útmutató segít magabiztosan használni a HA YAML konfigurációt. "
        "Ha bármi kérdésed van, szólj bátran!</i>",
        ST["note"]
    ))
    story.append(Paragraph("<i>— Hermes Agent, 2026. május</i>", ST["note"]))

    return story


# ── Build PDF ──────────────────────────────────────────────────
OUTPUT = "/home/user/doomester-redesign/HA_YAML_Konfiguracios_Utmutato.pdf"

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    topMargin=MARGIN + 6*mm,
    bottomMargin=2.5*cm,
    title="Home Assistant YAML Konfigurációs Útmutató",
    author="Hermes Agent — Végh Tibor részére",
    subject="HA YAML referencia 2026",
)

story = build_content()
doc.build(story, onFirstPage=on_first_page, onLaterPages=on_page)
print(f"PDF generated: {OUTPUT}")
