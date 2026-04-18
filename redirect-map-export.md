# Vollständige 301-Redirect-Map: control-motion.de

Alle alten URLs, die Google noch indexiert hat, werden per 301 (Permanent Redirect) auf die neuen Pendants umgeleitet. Die Redirects sind auf drei Ebenen implementiert:

1. **Express-Middleware** (`server/legacyRedirects.ts`) – für direkte Server-Requests
2. **Pre-Render-Middleware** (`server/prerenderMiddleware.ts`) – für Crawler-Requests
3. **Client-Side React** (`client/src/components/LegacyRedirects.tsx`) – für CDN-served SPA-Shell

## Canonical Domain

Cloudflare erzwingt `www.control-motion.de → control-motion.de` per 301. Zusätzlich ist eine Express-Middleware (`wwwRedirectMiddleware.ts`) aktiv, die alle www-Varianten auf non-www umleitet.

## Redirect-Tabelle

| Alte URL | Neue URL | Typ |
|----------|----------|-----|
| `/elektronikentwicklung` | `/entwicklung` | 301 |
| `/elektronikentwicklung/hardware-software` | `/entwicklung/hardware-software` | 301 |
| `/elektronikentwicklung/simulation` | `/entwicklung/simulation` | 301 |
| `/elektronikentwicklung/test-verifikation` | `/entwicklung/test-verifikation` | 301 |
| `/elektronikfertigung` | `/fertigung` | 301 |
| `/elektronikfertigung/leiterplatten` | `/fertigung/leiterplatten` | 301 |
| `/elektronikfertigung/leiterplatten-bestuecken` | `/fertigung/leiterplatten` | 301 |
| `/elektronikfertigung/baugruppen` | `/fertigung/baugruppen` | 301 |
| `/elektronikfertigung/qualitaetsmanagement` | `/fertigung/qualitaet` | 301 |
| `/elektronikfertigung/qs-qm` | `/fertigung/qualitaet` | 301 |
| `/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten` | `/fertigung/leiterplatten` | 301 |
| `/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht` | `/fertigung/leiterplatten` | 301 |
| `/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen` | `/fertigung/baugruppen` | 301 |
| `/smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm` | `/fertigung/qualitaet` | 301 |
| `/smd-fragen-entwurf` | `/fertigung` | 301 |
| `/datenschutzerklaerung` | `/datenschutz` | 301 |
| `/jobs` | `/karriere` | 301 |
| `/en/electronics-manufacturing` | `/en/manufacturing` | 301 |
| `/en/electronics-manufacturing/assembling-printed-circuit-boards` | `/en/manufacturing/printed-circuit-boards` | 301 |
| `/en/electronics-manufacturing/electronic-assemblies` | `/en/manufacturing/assemblies` | 301 |
| `/en/electronics-manufacturing/qa-qm` | `/en/manufacturing/quality` | 301 |
| `/en/electronics-development` | `/en/development` | 301 |
| `/en/electronics-development/hardware-software` | `/en/development/hardware-software` | 301 |
| `/en/electronics-development/simulation` | `/en/development/simulation` | 301 |
| `/en/electronics-development/test-verification` | `/en/development/test-verification` | 301 |
| `/en/jobs` | `/en/careers` | 301 |

## .htaccess (Apache)

```apache
# Canonical domain: www → non-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.control-motion\.de$ [NC]
RewriteRule ^(.*)$ https://control-motion.de/$1 [R=301,L]

# Legacy URL redirects (DE)
Redirect 301 /elektronikentwicklung /entwicklung
Redirect 301 /elektronikentwicklung/hardware-software /entwicklung/hardware-software
Redirect 301 /elektronikentwicklung/simulation /entwicklung/simulation
Redirect 301 /elektronikentwicklung/test-verifikation /entwicklung/test-verifikation
Redirect 301 /elektronikfertigung /fertigung
Redirect 301 /elektronikfertigung/leiterplatten /fertigung/leiterplatten
Redirect 301 /elektronikfertigung/leiterplatten-bestuecken /fertigung/leiterplatten
Redirect 301 /elektronikfertigung/baugruppen /fertigung/baugruppen
Redirect 301 /elektronikfertigung/qualitaetsmanagement /fertigung/qualitaet
Redirect 301 /elektronikfertigung/qs-qm /fertigung/qualitaet
Redirect 301 /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten /fertigung/leiterplatten
Redirect 301 /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht /fertigung/leiterplatten
Redirect 301 /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen /fertigung/baugruppen
Redirect 301 /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm /fertigung/qualitaet
Redirect 301 /smd-fragen-entwurf /fertigung
Redirect 301 /datenschutzerklaerung /datenschutz
Redirect 301 /jobs /karriere

# Legacy URL redirects (EN)
Redirect 301 /en/electronics-manufacturing /en/manufacturing
Redirect 301 /en/electronics-manufacturing/assembling-printed-circuit-boards /en/manufacturing/printed-circuit-boards
Redirect 301 /en/electronics-manufacturing/electronic-assemblies /en/manufacturing/assemblies
Redirect 301 /en/electronics-manufacturing/qa-qm /en/manufacturing/quality
Redirect 301 /en/electronics-development /en/development
Redirect 301 /en/electronics-development/hardware-software /en/development/hardware-software
Redirect 301 /en/electronics-development/simulation /en/development/simulation
Redirect 301 /en/electronics-development/test-verification /en/development/test-verification
Redirect 301 /en/jobs /en/careers
```

## Nginx Config

```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name www.control-motion.de;
    return 301 https://control-motion.de$request_uri;
}

server {
    listen 443 ssl;
    server_name control-motion.de;

    # Legacy URL redirects (DE)
    location = /elektronikentwicklung { return 301 /entwicklung; }
    location = /elektronikentwicklung/hardware-software { return 301 /entwicklung/hardware-software; }
    location = /elektronikentwicklung/simulation { return 301 /entwicklung/simulation; }
    location = /elektronikentwicklung/test-verifikation { return 301 /entwicklung/test-verifikation; }
    location = /elektronikfertigung { return 301 /fertigung; }
    location = /elektronikfertigung/leiterplatten { return 301 /fertigung/leiterplatten; }
    location = /elektronikfertigung/leiterplatten-bestuecken { return 301 /fertigung/leiterplatten; }
    location = /elektronikfertigung/baugruppen { return 301 /fertigung/baugruppen; }
    location = /elektronikfertigung/qualitaetsmanagement { return 301 /fertigung/qualitaet; }
    location = /elektronikfertigung/qs-qm { return 301 /fertigung/qualitaet; }
    location = /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten { return 301 /fertigung/leiterplatten; }
    location = /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/leiterplatten-bestuecken-smd-und-tht { return 301 /fertigung/leiterplatten; }
    location = /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/baugruppen { return 301 /fertigung/baugruppen; }
    location = /smd-und-tht-bestueckung-von-leiterplatten-leiterkarten/qs-qm { return 301 /fertigung/qualitaet; }
    location = /smd-fragen-entwurf { return 301 /fertigung; }
    location = /datenschutzerklaerung { return 301 /datenschutz; }
    location = /jobs { return 301 /karriere; }

    # Legacy URL redirects (EN)
    location = /en/electronics-manufacturing { return 301 /en/manufacturing; }
    location = /en/electronics-manufacturing/assembling-printed-circuit-boards { return 301 /en/manufacturing/printed-circuit-boards; }
    location = /en/electronics-manufacturing/electronic-assemblies { return 301 /en/manufacturing/assemblies; }
    location = /en/electronics-manufacturing/qa-qm { return 301 /en/manufacturing/quality; }
    location = /en/electronics-development { return 301 /en/development; }
    location = /en/electronics-development/hardware-software { return 301 /en/development/hardware-software; }
    location = /en/electronics-development/simulation { return 301 /en/development/simulation; }
    location = /en/electronics-development/test-verification { return 301 /en/development/test-verification; }
    location = /en/jobs { return 301 /en/careers; }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
