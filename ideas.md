# CME Control Motion Electronics – Website Design Brainstorming

Basierend auf der Unternehmenspräsentation entwickeln wir drei unterschiedliche Designansätze, die jeweils eine eigene visuelle Philosophie verfolgen. Jeder Ansatz integriert die charakteristischen **Rauten-Bildelemente** aus der Präsentation und setzt auf **Framer Motion Scroll-Animationen** für ein modernes, dynamisches Nutzererlebnis.

---

<response>
<text>
## Ansatz 1: **Techno-Industrial Precision**

**Design Movement:** Neo-Brutalism trifft auf High-Tech Engineering – inspiriert von industriellen Steuerungssystemen, Oszilloskopen und Leiterplatten-Ästhetik.

**Core Principles:**
- **Funktionale Klarheit:** Jedes Element hat einen erkennbaren Zweck, keine dekorativen Ablenkungen
- **Technische Authentizität:** Design-Elemente erinnern an Schaltpläne, Messgeräte und Produktionsumgebungen
- **Asymmetrische Präzision:** Bewusst ungleiche Layouts mit technischer Strenge
- **Daten-Visualisierung als Gestaltungselement:** Diagramme, Prozessflüsse und technische Grafiken als visuelle Anker

**Color Philosophy:**
- **Primärfarbe:** CME-Blau (#2196D3) als technisches Signal – präzise, kühl, vertrauenswürdig
- **Akzentfarbe:** Elektrisches Cyan (#00E5FF) für interaktive Elemente und Highlights
- **Neutralpalette:** Dunkelgrau (#1A1A1A), Mittelgrau (#4A4A4A), Hellgrau (#E0E0E0) – industrielle Reinheit
- **Kontrast:** Weiß (#FFFFFF) für Textflächen, Schwarz (#000000) für Tiefe
- **Emotionale Intention:** Präzision, technische Exzellenz, keine Kompromisse

**Layout Paradigm:**
- **Asymmetrisches Grid-System:** Ungleiche Spaltenbreiten (z.B. 60/40, 70/30) statt symmetrischer 50/50-Layouts
- **Rauten-Container:** Bilder und Content-Boxen in 45°-gedrehten Rauten (clip-path: polygon) – direkt aus der Präsentation übernommen
- **Layering:** Überlappende Sektionen mit z-index-Hierarchie für räumliche Tiefe
- **Technische Raster:** Sichtbare Hilfslinien und Konstruktionsraster als Designelement

**Signature Elements:**
- **Diagonal Cuts:** Sektionsübergänge mit schrägen Schnitten (clip-path) statt horizontaler Trennungen
- **Circuit-Board-Patterns:** Subtile Leiterbahnen-Muster als Hintergrundtextur in Hero-Sektionen
- **Rauten-Bildmasken:** Alle Hero-Bilder und Produktfotos in 45°-Rauten mit weißem/grauem Schatten

**Interaction Philosophy:**
- **Präzise Feedback-Loops:** Hover-States mit exakten Transformationen (scale, translate) ohne Elastizität
- **Technische Übergänge:** Fade-ins mit linearen Easing-Funktionen (keine Bounce-Effekte)
- **Scroll-Triggered Reveals:** Elemente erscheinen beim Scrollen mit stagger-Effekten (Framer Motion `useInView`)

**Animation:**
- **Scroll-Parallax:** Hintergrundbilder bewegen sich langsamer als Vordergrund (parallax-Effekt)
- **Staggered Entry:** Listen und Karten erscheinen nacheinander mit 100ms Verzögerung
- **Slide-In-Directions:** Elemente von links/rechts/oben – abhängig von der Leserichtung
- **Micro-Interactions:** Buttons mit subtilen scale-Effekten (1.0 → 1.05), keine übertriebenen Animationen

**Typography System:**
- **Display Font:** **Rajdhani Bold** (Google Fonts) – technisch, geometrisch, präzise für Headlines
- **Body Font:** **Inter Regular/Medium** (Google Fonts) – hochlesbar, neutral, professionell
- **Hierarchy:** H1 (48px/3rem), H2 (36px/2.25rem), H3 (24px/1.5rem), Body (16px/1rem), Small (14px/0.875rem)
- **Line-Height:** Eng für Headlines (1.1), großzügig für Body (1.6)
- **Font-Weight-Kontraste:** Bold (700) für Headlines, Regular (400) für Body, Medium (500) für Subheadlines
</text>
<probability>0.08</probability>
</response>

---

<response>
<text>
## Ansatz 2: **Fluid Modernism**

**Design Movement:** Liquid Design trifft auf Corporate Modernism – inspiriert von skandinavischem Design, Automotive-Interfaces und Premium-Elektronikmarken.

**Core Principles:**
- **Organische Geometrie:** Weiche Kurven treffen auf technische Präzision
- **Atmende Layouts:** Großzügiger Weißraum als aktives Gestaltungselement
- **Premium-Minimalismus:** Weniger ist mehr, aber jedes Element ist hochwertig
- **Emotionale Technik:** Technologie wird zugänglich und menschlich

**Color Philosophy:**
- **Primärfarbe:** CME-Blau (#2196D3) als Vertrauensanker – aber weicher eingesetzt als in Ansatz 1
- **Akzentfarbe:** Warmes Gold (#FFB300) für Call-to-Actions und Highlights – Premium-Gefühl
- **Neutralpalette:** Soft White (#F8F9FA), Light Gray (#E9ECEF), Medium Gray (#6C757D), Deep Charcoal (#212529)
- **Gradients:** Subtile Blau-zu-Weiß-Verläufe für Hero-Sektionen
- **Emotionale Intention:** Vertrauen, Zugänglichkeit, Premium-Qualität ohne Arroganz

**Layout Paradigm:**
- **Fluid Grid:** Flexible Container mit max-width: 1280px, aber Hintergründe full-width
- **Rauten als Akzente:** Nicht alle Bilder in Rauten, sondern gezielt als visuelle Highlights (z.B. nur Hero-Bild)
- **Wechselnde Sektionen:** Hell-Dunkel-Wechsel (Weiß → Hellgrau → Weiß) für visuelle Rhythmik
- **Centered Content mit Offset-Elementen:** Zentrierte Texte, aber Bilder/Grafiken asymmetrisch platziert

**Signature Elements:**
- **Soft Shadows:** Box-shadows mit großem Blur-Radius (0 10px 40px rgba(0,0,0,0.08))
- **Rounded Corners:** Konsistente border-radius: 16px für Cards, 24px für große Container
- **Rauten-Overlays:** Bilder in Rauten mit sanften Schatten und leichtem Glow-Effekt

**Interaction Philosophy:**
- **Smooth Transitions:** Alle Übergänge mit ease-in-out (cubic-bezier)
- **Hover-Lifts:** Cards heben sich beim Hover (translateY: -8px) mit Schatten-Verstärkung
- **Scroll-Reveals:** Elemente faden ein mit leichtem translateY (20px → 0px)

**Animation:**
- **Fade-In-Up:** Standard-Einblendung für Texte und Cards (opacity: 0 → 1, translateY: 20px → 0)
- **Scale-On-Scroll:** Bilder skalieren beim Scrollen (scale: 0.95 → 1.0)
- **Staggered Grids:** Grid-Items erscheinen nacheinander (50ms delay)
- **Smooth Parallax:** Hintergrundbilder mit subtiler Parallax-Bewegung (0.3x Scroll-Speed)

**Typography System:**
- **Display Font:** **Poppins SemiBold** (Google Fonts) – modern, freundlich, geometrisch für Headlines
- **Body Font:** **Inter Regular** (Google Fonts) – neutral, hochlesbar
- **Hierarchy:** H1 (56px/3.5rem), H2 (40px/2.5rem), H3 (28px/1.75rem), Body (18px/1.125rem), Small (16px/1rem)
- **Line-Height:** Großzügig für alle Elemente (1.5 für Headlines, 1.7 für Body)
- **Font-Weight-Kontraste:** SemiBold (600) für Headlines, Regular (400) für Body
</text>
<probability>0.07</probability>
</response>

---

<response>
<text>
## Ansatz 3: **Kinetic Engineering**

**Design Movement:** Kinetische Typografie trifft auf Swiss Design – inspiriert von Motorsport-Telemetrie, Aerospace-Dashboards und High-Performance-Visualisierungen.

**Core Principles:**
- **Bewegung als Information:** Animationen vermitteln Prozesse und technische Abläufe
- **Typografische Dominanz:** Text als primäres Gestaltungselement, nicht nur Informationsträger
- **Technische Transparenz:** Prozesse und Strukturen werden sichtbar gemacht
- **Performance-Ästhetik:** Schnelligkeit und Effizienz als visuelle Werte

**Color Philosophy:**
- **Primärfarbe:** CME-Blau (#2196D3) als Leitfarbe – intensiv und dominant
- **Akzentfarbe:** Neon-Grün (#00FF88) für Statusanzeigen und interaktive Elemente – Signal-Charakter
- **Neutralpalette:** Reines Schwarz (#000000), Dunkelgrau (#1C1C1C), Hellgrau (#CCCCCC), Weiß (#FFFFFF)
- **Kontrast-Strategie:** Hohe Kontraste (Schwarz-Weiß, Blau-Schwarz) für maximale Lesbarkeit
- **Emotionale Intention:** Geschwindigkeit, Präzision, technische Überlegenheit

**Layout Paradigm:**
- **Modular Grid:** Streng geometrisches 12-Spalten-Grid mit sichtbaren Hilfslinien
- **Full-Bleed-Sektionen:** Sektionen ohne seitliche Abstände, Content in Container
- **Rauten als Strukturelemente:** Rauten nicht nur für Bilder, sondern auch für Text-Container und Icons
- **Diagonal Composition:** Diagonale Linien und Schnitte als Leitlinien durch die Seite

**Signature Elements:**
- **Animated Grid Lines:** Subtile animierte Rasterlinien im Hintergrund (CSS Grid mit opacity-Animationen)
- **Rauten-Cluster:** Mehrere kleine Rauten gruppiert (z.B. für Icon-Sets oder Referenzen)
- **Typografische Overlays:** Große, halbtransparente Schriftzüge als Hintergrundgrafik

**Interaction Philosophy:**
- **Instant Feedback:** Sofortige visuelle Reaktion auf Interaktionen (0ms delay)
- **Kinetic Transitions:** Schnelle, präzise Animationen (150ms duration)
- **Scroll-Velocity-Responsive:** Animationsgeschwindigkeit passt sich der Scroll-Geschwindigkeit an

**Animation:**
- **Reveal-On-Scroll:** Elemente "schieben" sich ins Bild (translateX: -100px → 0 für links, +100px → 0 für rechts)
- **Counter-Animations:** Zahlen zählen beim Scrollen hoch (z.B. "15+ Jahre Erfahrung")
- **Parallax-Layers:** Mehrere Ebenen mit unterschiedlichen Scroll-Geschwindigkeiten
- **Hover-Glitch:** Subtiler Glitch-Effekt bei Hover (kurze translate-Shifts)

**Typography System:**
- **Display Font:** **Bebas Neue Bold** (Google Fonts) – komprimiert, kraftvoll, technisch für Headlines
- **Body Font:** **Roboto Regular/Medium** (Google Fonts) – neutral, technisch, hochlesbar
- **Hierarchy:** H1 (64px/4rem), H2 (48px/3rem), H3 (32px/2rem), Body (16px/1rem), Small (14px/0.875rem)
- **Line-Height:** Sehr eng für Headlines (1.0), normal für Body (1.5)
- **Font-Weight-Kontraste:** Bold (700) für Headlines, Regular (400) für Body, Medium (500) für Subheadlines
- **Letter-Spacing:** Weit für Headlines (0.05em), normal für Body
</text>
<probability>0.09</probability>
</response>

---

## Entscheidung

Nach Abwägung aller drei Ansätze wähle ich **Ansatz 1: Techno-Industrial Precision** als Grundlage für die CME-Website.

**Begründung:**
- Authentische Repräsentation der technischen Expertise von CME (Leistungselektronik, Simulation, EMV)
- Die asymmetrischen Layouts und Rauten-Elemente spiegeln die Präsentation wider, ohne generisch zu wirken
- Klare Differenzierung von typischen B2B-Websites durch Neo-Brutalism-Elemente
- Technische Zielgruppe (Automotive, Industrie, Medizintechnik) erwartet präzise, funktionale Ästhetik
- Framer Motion Animationen mit linearen Easing-Funktionen unterstreichen die technische Positionierung
