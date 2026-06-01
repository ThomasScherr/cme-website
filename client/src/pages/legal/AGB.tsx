import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';

export default function AGB() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SEO
        titleDE="Allgemeine Geschäftsbedingungen"
        titleEN="Terms and Conditions"
        descriptionDE="Allgemeine Geschäftsbedingungen (AGB) der CME Control Motion Electronics GmbH für Elektronikentwicklung und EMS-Fertigungsleistungen. Stand: 01.10.2016."
        descriptionEN="General terms and conditions of CME Control Motion Electronics GmbH for electronics development and EMS manufacturing services. As of: 01.10.2016."
        path="/agb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'AGB', url: '/agb' },
        ]}
      />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="text-3xl font-bold text-cme-dark">
              {isDE ? 'Allgemeine Geschäftsbedingungen' : 'Terms and Conditions'}
            </h1>
            <p className="text-gray-500 fluid-small mb-8">
              {isDE
                ? 'CME Control Motion Electronics GmbH – Stand: 01.10.2016'
                : 'CME Control Motion Electronics GmbH – As of: 01.10.2016'}
            </p>

            {/* § 1 Geltungsbereich */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 1 Geltungsbereich</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Diese Bedingungen gelten, soweit nicht schriftlich etwas anderes vereinbart ist; entgegenstehende oder abweichende Bedingungen des Kunden sind für uns unverbindlich, auch wenn wir ihnen nicht ausdrücklich widersprochen oder die Lieferung rügelos ausgeführt haben. Sie gelten damit auch für alle künftigen Geschäfte dieser Art; auch wenn sie nicht nochmals ausdrücklich vereinbart werden.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Unsere Geschäftsbedingungen gelten ausschließlich. Entgegenstehende oder abweichende Bedingungen des Auftraggebers erkennen wir nicht an, es sei denn, wir hätten ihrer Geltung ausdrücklich schriftlich zugestimmt. Unsere Geschäftsbedingungen gelten auch dann, wenn wir in Kenntnis entgegenstehender oder abweichender Bedingungen des Auftraggebers den Vertrag vorbehaltlos durchführen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Soweit sich aus diesen Geschäftsbedingungen nichts anderes ergibt, gelten die Begriffe und Definitionen der INCOTERMS 2010.
            </p>

            {/* § 2 Vertragsabschluss - Schriftform */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 2 Vertragsabschluss – Schriftform</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Unsere Angebote sind freibleibend, es sei denn, es ist etwas anderes schriftlich vorgesehen. Eine Bestellung gilt erst dann als angenommen, wenn wir sie schriftlich bestätigt haben. Ebenso sind technische Beschreibungen und sonstige Angaben in Angeboten, Prospekten und sonstigen Informationen zunächst unverbindlich.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Alle Vereinbarungen, Erklärungen und sonstige Angaben bedürfen zu ihrer Gültigkeit der Schriftform; Telefonate sind schriftlich zu bestätigen. Für die Wahrung der Schriftform reicht eine Fax-Bestätigung aus.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Unsere Mitarbeiter sind nicht bevollmächtigt, mündliche Abreden zu treffen, die über den Inhalt des schriftlichen Vertrages hinausgehen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (4) Gegenstand des Vertrages ist das durch die Bestellung und unsere Auftragsbestätigung beschriebene Vorhaben. Einzelheiten ergeben sich aus dem Pflichtenheft, sofern dieses mit uns verbindlich und schriftlich vereinbart ist. Dem Inhalt und der Natur von Forschungs-, Entwicklungs- und Dienstleistungsverträgen entsprechend findet auf unser Rechtsverhältnis zum Auftraggeber, soweit nachfolgend oder einzelvertraglich und ausdrücklich nichts Abweichendes bestimmt ist, das Dienstvertragsrecht Anwendung.
            </p>

            {/* § 3 Umfang der Lieferungen und Leistungen */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 3 Umfang der Lieferungen und Leistungen</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Die unserem Angebot beigefügten Unterlagen, Zeichnungen, Gewichtsangaben, Muster, etc. sind nur annäherungsweise maßgebend, sofern sich aus dem Angebot nichts Gegenteiliges ergibt.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Änderungen der Konstruktion, der Auslegung, der Werkstoffwahl und der Fabrikation bleiben auch nach Absenden der Auftragsbestätigung ausdrücklich vorbehalten, solange dadurch nicht der Preis und/oder die wesentlichen Funktionsdaten oder die Lieferzeit verändert werden und dies dem Kunden zumutbar ist.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Für den Umfang unserer Leistungspflicht ist unsere schriftliche Auftragsbestätigung, ggf. in Verbindung mit dem Pflichtenheft, wenn dieses von uns schriftlich akzeptiert wurde, maßgebend.
            </p>

            {/* § 4 Lieferfristen */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 4 Lieferfristen</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Die von uns in der Auftragsbestätigung angegebene Lieferzeit ist unverbindlich, sofern nichts anderes schriftlich vereinbart ist. Richtige und rechtzeitige Selbstbelieferung bleibt ausdrücklich vorbehalten. Die Lieferfrist beginnt mit dem Absendedatum unserer Auftragsbestätigung, nicht jedoch vor vollständiger Klärung aller technischen Detailfragen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Verzögert sich der Versand auf Wunsch des Kunden oder aus anderen, von uns nicht zu vertretenden Gründen, so trägt der Kunde die dadurch entstandenen Mehrkosten sowie die Gefahr des zufälligen Untergangs oder der zufälligen Verschlechterung der Lieferware ab Meldung der Versandbereitschaft.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Bei Lagerung in unserem Werk (oder bei unseren Bevollmächtigten) sind wir berechtigt, für jeden begonnenen Monat Lagerung mindestens 0,5 % des Preises der Lieferung zu berechnen. Weitere Ansprüche bleiben vorbehalten.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (4) Teillieferungen und vorzeitige Lieferungen bleiben grundsätzlich vorbehalten.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (5) Im Falle eines von uns zu vertretenden Lieferverzugs ist der Kunde berechtigt, pro vollendete Woche Verzug als Verzugsentschädigung Schadenersatz bis zu 0,5 % des Lieferwertes, maximal jedoch 5 %, geltend zu machen. Setzt uns der Kunde im Fall des Lieferverzugs eine den Umständen nach angemessene Frist und verstreicht diese erfolglos, so ist der Kunde berechtigt, vom Vertrag zurückzutreten. Die gesetzte Nachfrist muss bei Entwicklungsleistungen mindestens 15 Werktage betragen. Nach ihrem fruchtlosen Ablauf ist er berechtigt, schriftlich vom Vertrag zurückzutreten. Der Schadensersatz statt der Leistung ist auf 50% des eingetretenen Schadens begrenzt; berücksichtigt wird hierbei jedoch ausschließlich der vertragstypische und vorhersehbare Schaden. Die vorstehenden Regelungen gelten entsprechend, wenn wir die Leistung nur teilweise bewirken. Voraussetzung für das Verlangen nach Schadenersatz statt der Erfüllung ist, dass die von uns zu vertretende Pflichtverletzung nicht unerheblich ist.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (6) Vorstehende Regelung gilt nicht, sofern der Vertrag ein Fixgeschäft im Sinne von § 376 HGB ist. Gleiches gilt dann, wenn als Folge des Verzugs das Interesse des Kunden in Fortfall geraten ist.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (7) Die Einhaltung der Lieferfrist durch uns setzt die rechtzeitige und ordnungsgemäße Erfüllung der Vertragspflichten des Kunden, insbesondere seiner Zahlungspflichten, voraus.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (8) Sind Teilleistungen für den Auftraggeber zumutbar und bleiben sie letztlich ohne Einfluss auf den vorgesehenen Leistungsumfang und die vorgesehene Leistungsfrist, können diese erfolgen und in Rechnung gestellt werden.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (9) Für die Durchführung von Entwicklungsarbeiten gilt der in der Auftragsbestätigung vereinbarte Zeitplan. Dem Entwicklungscharakter der Vorhaben entsprechend sind die im Zeitplan vereinbarten Termine und Fristen nur Richtwerte, sofern das Gegenteil nicht ausdrücklich schriftlich vereinbart ist. In jedem Fall erfolgt die Angabe von Leistungsfristen und Terminen unter dem Vorbehalt vertragsgemäßer Mitwirkung des Auftraggebers. Vom Auftraggeber werden in jedem Fall folgende Mitwirkungshandlungen geschuldet:
            </p>
            <ul className="text-gray-600 leading-relaxed fluid-small list-disc pl-6">
              <li>(a) Er benennt, wie wir auch, spätestens beim Start des Vorhabens einen mit allen erforderlichen Kompetenzen ausgestatteten Ansprechpartner.</li>
              <li>(b) Er stellt sicher, dass wir, soweit sachlich und zeitlich für die Durchführung des Vorhabens erforderlich, zu seinen Entwicklungsbereichen Zugang haben.</li>
              <li>(c) Er stellt uns für den Daten- und Informationsaustausch für den Zeitraum der Durchführung des Vorhabens ein geeignetes Email-Konto zur Verfügung.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed fluid-small">
              Die Einhaltung unserer Leistungsverpflichtung setzt die rechtzeitige und ordnungsgemäße Erfüllung der Verpflichtungen des Auftraggebers voraus. Ist der Auftraggeber mit der Bezahlung einer früheren Leistung in Verzug, sind wir berechtigt, unsere Leistungen zurückzuhalten. Aus der berechtigten Zurückhaltung kann der Auftraggeber keine Rechte herleiten.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (10) Werden wir selbst nicht richtig oder rechtzeitig beliefert, obwohl wir bei zuverlässigen Lieferanten ausreichende Bestellungen aufgegeben haben, werden wir von unserer Leistungspflicht frei und können unmittelbar vom Vertrag zurücktreten.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (11) Kann eine vereinbarte Frist infolge von uns nicht zu vertretender, vorübergehender Leistungshindernisse (z.B. unzureichende Selbstbelieferung, höhere Gewalt, Energie- und Rohstoffmangel, Arbeitskampf, Verkehrsstörung, Krankheit) bei uns oder unseren Zulieferern nicht eingehalten werden, so verlängert sie sich angemessen. Über einen solchen Fall werden wir den Auftraggeber umgehend unterrichten. Dauern die behindernden Umstände einen Monat nach Ablauf der vereinbarten Frist immer noch an, kann jede Seite vom Vertrag schriftlich zurücktreten. Weitergehende Ansprüche wegen von uns nicht verschuldeter Überschreitung der Leistungsfrist sind ausgeschlossen. Die vorstehende Regelung gilt entsprechend, wenn die benannten Leistungshindernisse während eines bereits vorliegenden Verzuges entstehen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (12) Ansprüche des Auftraggebers wegen des Ausschlusses der Leistungspflicht und wegen eines Leistungshindernisses bei Vertragsschluss sind auf 50% des eingetretenen Schadens bzw. Aufwandes begrenzt; berücksichtigt wird hierbei jedoch ausschließlich der vertragstypische vorhersehbare Schaden bzw. Aufwand. Entsprechendes gilt, wenn wir die Leistung nur teilweise bewirken.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (13) Die gesetzliche Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer von uns zu vertretenden Pflichtverletzung beruhen, für sonstige Schäden, falls die Pflichtverletzung auf Vorsatz oder grober Fahrlässigkeit beruht. Unsere Haftung ist auf den vertragstypischen vorhersehbaren Schaden begrenzt, falls die Pflichtverletzung die Verletzung einer wesentlichen Vertragspflicht darstellt.
            </p>

            {/* § 5 Gefahrenübergang, Versand, Verpackung */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 5 Gefahrenübergang, Versand, Verpackung</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Die Gefahr geht ab unserem Werk bzw. ab unserem Auslieferungslager (EXW nach INCOTERMS 2010) auf den Kunden über, und zwar auch insoweit, als Teillieferungen vorgenommen werden.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Der Versand erfolgt auf Rechnung und Gefahr des Kunden; sofern keine Versandvorschriften vom Kunden gegeben werden, wählen wir das billigste Transportmittel und den billigsten Transportweg.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Die Kosten der Verpackung werden zu Selbstkosten berechnet, falls nichts anderes vereinbart ist.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (4) Wir behalten uns das Recht vor, eine Transportversicherung abzuschließen. Im Falle eines Transportschadens erfolgt die Regulierung nach Maßgabe unserer Versicherungsbedingungen gegen Vorlage folgender Unterlagen: a) Tatbestandsaufnahme des Transportinstituts (z.B. Spediteurquittung), b) Originalfrachtbrief, c) Übertragung der Ansprüche aus dem entstandenen Schaden.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (5) Der Kunde ist verpflichtet, uns von einem eingetretenen Transportschaden innerhalb von 8 Tagen nach Erhalt der Sendung schriftlich Nachricht zu geben. Die schadhaften Teile sind frei unserem Werk oder frei unserem jeweiligen Auslieferungslager zurück zu senden.
            </p>

            {/* § 6 Preise, Zahlungsbedingungen, Sicherheiten */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 6 Preise, Zahlungsbedingungen, Sicherheiten</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Unsere Preise verstehen sich in Euro jeweils zuzüglich gesondert auszuweisender Mehrwertsteuer in der jeweiligen gesetzlichen Höhe sowie, im Fall der Lieferung ab Werk der CME Control Motion Electronics GmbH, ausschließlich Verpackung, Transport und Versicherung.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Unsere Preise beruhen auf den zum Zeitpunkt der Abgabe des Angebots (Auftragsbestätigung) maßgebenden Kostenfaktoren. Ändern sich diese zwischen dem Zeitpunkt des Vertragsabschlusses und dem der Auslieferung der Ware, so behalten wir uns das Recht vor, den Preis in angemessenem Verhältnis zu den gestiegenen Kosten zu ändern.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Sämtliche Zahlungen des Kunden sind ohne jeden Abzug frei unserer Bankverbindung per Überweisung ohne Abzug zu den angegebenen Terminen zu leisten. Aufrechnungsrechte stehen dem Kunden nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zu; in diesen Fällen ist der Kunde auch zur Zurückbehaltung befugt. Er ist weiter zur Zurückbehaltung befugt, wenn der Grund des Zurückbehaltungsrechts in einem von uns zu vertretenden Mangel der Lieferung liegt; in diesen Fällen darf das Zurückbehaltungsrecht nur verhältnismäßig zum Mangel ausgeübt werden.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (4) Treten in den wirtschaftlichen Verhältnissen des Kunden nach dem Absendedatum unserer Auftragsbestätigung Veränderungen ein, die geeignet sind, die Erfüllung der Zahlungsverpflichtungen in Frage zu stellen, so sind wir berechtigt, die Auslieferung der Ware zurückzubehalten oder Sicherheit zu verlangen; kommt der Kunde nicht innerhalb einer Frist von 10 Werktagen unserem Verlangen nach Sicherheitsleistung nach, so sind wir berechtigt, vom Vertrag zurückzutreten und können neben der Vergütung für alle bislang erbrachten Leistungen einen Bereithaltungskostenersatz in Höhe einer nach dem Durchschnitt der letzten 3 Monate berechneten monatlichen Durchschnittsvergütung verlangen. Lief das Vorhaben noch nicht 3 Monate, berechnet sich die monatliche Durchschnittsvergütung nach der kürzeren Laufzeit des Vorhabens. Die Geltendmachung eines höheren Schadens ist hierdurch nicht ausgeschlossen. Dem Auftraggeber ist der Nachweis gestattet, ein Aufwand bzw. Schaden sei überhaupt nicht entstanden oder wesentlich geringer als die Pauschale.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (5) Unsere Vertreter und Reisende sind nicht befugt, Zahlungen oder Zahlungsmittel entgegenzunehmen, es sei denn, sie besitzen Inkassovollmacht.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (7) Andere Zahlungsformen als Überweisungen bedürfen besonderer schriftlicher Vereinbarung. Dadurch auf beiden Seiten entstehende Kosten trägt der Auftraggeber.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (8) Kommt der Kunde in Zahlungsverzug, sind wir berechtigt, Verzugszinsen in Höhe von 5 % über dem jeweiligen Basiszinssatz geltend zu machen.
            </p>

            {/* § 7 Mängelgewährleistung */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 7 Mängelgewährleistung</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Im Fall eines Mangels haften wir, indem wir Fehler in der Konstruktion, der Fabrikation, der Farbe, der Qualität oder in der sonstigen Ausführung nach unserer Wahl unentgeltlich innerhalb angemessener Frist ausbessern, sei es durch kostenlose Mangelbeseitigung oder durch Lieferung einer mangelfreien Sache. Etwa ersetzte Teile sind uns auf Wunsch zurückzusenden; es gelten insoweit die Rücktrittsregeln. Ersetzte Teile werden unser Eigentum.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Für aufgetretene und rechtzeitig gerügte Mängel bei den nach Ausfall- und Freigabemuster gelieferten Waren und Teilen haften wir nur dann, wenn die gelieferten Teile von denen dem Kunden vorgelegten und für gut befundenen Ausfall- und Freigabemuster abweichen. Mangelnde oder nicht ausreichende Funktionskontrolle dieses Musters durch den Kunden geht zu seinen Lasten und entbindet uns von der Mängelhaftung sowie von jeder sonstigen Haftung.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Unsere Mängelhaftung setzt voraus, dass der Kunde erkennbare Mängel gemäß § 377 HGB innerhalb einer Frist von 10 Tagen nach Empfang der Ware schriftlich spezifiziert gerügt hat. Später auftretende Mängel sind innerhalb der gleichen Frist, gerechnet ab Entdeckung, schriftlich spezifiziert zu rügen. Bei Entwicklungsvorhaben werden wir unsere Leistungen stets auf der Grundlage der allgemein anerkannten Regeln der Technik und dem uns bei Ausführung des Vorhabens bekannten Stand der Technik sowie unter Beachtung der branchenüblichen Sorgfalt erbringen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (4) Unsere Mängelhaftung setzt weiter voraus, dass die Ware einwandfrei montiert, in Betrieb genommen und unter genauer Beachtung unserer Betriebsanweisung verwendet wurde.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (5) Sofern die Nacherfüllung fehlschlägt, ist der Auftraggeber unter den gesetzlichen Voraussetzungen berechtigt: (a) wenn unsere Dienstleistung Vertragsgegenstand war, Herabsetzung der Vergütung (Minderung) zu verlangen, (b) wenn ausnahmsweise unsere Werkleistung Vertragsgegenstand war, nach seiner Wahl vom Vertrag zurückzutreten oder Minderung zu verlangen. Die Fristsetzung sowie die Ausübung des Rücktritts- bzw. Minderungsrechtes setzen jeweils eine schriftliche Erklärung voraus.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (6) Soweit sich nachstehend nichts anderes ergibt, sind weitergehende Ansprüche des Auftraggebers – gleich aus welchen Rechtsgründen – ausgeschlossen. Wir haften daher nicht für Schäden, die nicht an der Liefersache selbst entstanden sind; insbesondere haften wir nicht für entgangenen Gewinn oder sonstige Vermögensschäden des Auftraggebers.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (7) Die vorstehende Haftungsbeschränkung gilt nicht, soweit die Schadensursache auf Vorsatz oder grober Fahrlässigkeit beruht. Sie gilt ferner nicht, wenn der Auftraggeber Ansprüche aus der Verletzung des Lebens, des Körpers oder der Gesundheit geltend macht, die auf einer von uns zu vertretenden Pflichtverletzung beruhen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (8) Sofern wir fahrlässig eine wesentliche Vertragspflicht verletzen, ist unsere Ersatzpflicht auf den vertragstypischen, vorhersehbaren Schaden begrenzt, es sei denn, es handelt sich um Ansprüche des Auftraggebers aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (9) Die Gewährleistungsfrist beträgt ein Jahr ab Lieferung. Dies gilt nicht, soweit das Gesetz längere Fristen zwingend vorschreibt.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (10) Die Absätze 6 bis 9 gelten entsprechend für eine Pflichtverletzung durch unseren gesetzlichen Vertreter oder Erfüllungsgehilfen.
            </p>

            {/* § 8 Beistellware */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 8 Beistellware</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Alle vom Kunden beigestellten Materialien werden kostenfrei angeliefert. Bei unserer Wareneingangsprüfung prüfen wir hinsichtlich Quantität sowie Transportschäden. Eine qualitative Prüfung der Bauteile findet nicht statt. Die Bauteile werden, soweit keine detaillierten Unterlagen bezüglich Handhabung vom Kunden zur Verfügung gestellt werden, wie eigenes Material gehandelt. Insoweit verzichtet der Kunde auf das Erfordernis einer Wareneingangskontrolle gemäß § 377 HGB; wir gehen davon aus, dass der Kunde eine entsprechende Warenausgangskontrolle durchführt. Gleichzeitig stellt der Kunde sicher, dass seine Haftpflicht- bzw. Produkthaftpflichtversicherer insoweit der Deckungsausschluss gemäß §7 AHB 2015 abbedingt.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Schäden, welche mittelbar oder unmittelbar durch die Beistellware hervorgerufen werden, gehen nicht zu unseren Lasten; unberührt bleibt die Bestimmung von § 7 Abs. (6).
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Sollte der Kunde uns detaillierte technische Unterlagen bezüglich der Beistellware zur Verfügung stellen, werden wir diese in unserer Materialwirtschaft mit berücksichtigen.
            </p>

            {/* § 9 Sonstige Ansprüche */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 9 Sonstige Ansprüche</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Weitergehende Schadenersatzansprüche als in § 7 geregelt, stehen dem Kunden nicht zu. Dies gilt ohne Rücksicht auf die Rechtsnatur des geltend gemachten Anspruchs. Ansprüche aus dem Produkthaftungsgesetz bleiben unberührt.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Etwaige Ansprüche aufgrund von Abs. (1) verjähren in der Frist von § 7 Abs. (9).
            </p>

            {/* § 10 Eigentumsvorbehalt */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 10 Eigentumsvorbehalt</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Wir behalten uns das Eigentum an der Ware bis zum Eingang aller Zahlungen aus diesem Liefervertrag, einschließlich aller anderen Verträge, die bis zum Zeitpunkt des Abschlusses dieses Vertrages zwischen dem Kunden und uns abgeschlossen worden sind, vor. Der Kunde darf die Vorbehaltsware im ordentlichen Geschäftsgang weiter verkaufen. Er tritt jedoch uns bereits jetzt alle Forderungen in Höhe des jeweiligen Fakturenwertes ab, die ihm aus der Weiterveräußerung gegen den Abnehmer oder gegen Dritte erwachsen. Zur Einziehung dieser Forderungen ist der Kunde auch nach deren Abtretung ermächtigt. Unsere Befugnis, die Forderung selbst einzuziehen, bleibt hiervon unberührt. Wir können insbesondere verlangen, dass der Kunde uns die abgetretene Forderung, deren Bestand und deren Schuldner bekannt gibt, alle zum Einzug erforderlichen Angaben macht und dazu gehörigen Unterlagen uns unverzüglich aushändigt sowie dem Schuldner die Abtretung schriftlich mitteilt.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Der Kunde ist nicht berechtigt, die Vorbehaltsware zu verpfänden oder Dritten zur Sicherheit zu übereignen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Bei vertragswidrigem Verhalten des Kunden, insbesondere bei Zahlungsverzug, sind wir berechtigt, die Ware zurückzunehmen. In der Zurücknahme sowie in der Pfändung der Ware durch uns liegt keine Erklärung des Rücktritts, dies gilt vielmehr nur dann, wenn wir dies ausdrücklich schriftlich erklären.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (4) Bei Pfändungen oder sonstigen Eingriffen Dritter hat der Kunde uns unverzüglich hiervon zu benachrichtigen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (5) Wird die Ware mit anderen Waren, die uns nicht gehören, weiter verkauft, so gilt die Forderung des Kunden gegen den Abnehmer in Höhe des zwischen uns und dem Kunden vereinbarten Lieferpreises mit Vertragsabschluss als abgetreten.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (6) Geht unser Eigentum infolge Einbaus unter, so tritt der Kunde den ihm entstehenden Ersatzanspruch ab.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (7) Die Be- und Verarbeitung der Vorbehaltsware durch den Kunden geschieht stets für uns.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (8) Auf Verlangen des Kunden sind wir verpflichtet, Sicherheiten nach unserer Wahl freizugeben, als der realisierbare Wert der zu sichernden Forderungen unsere Forderung um mehr als 10 % übersteigt.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (9) An Abbildungen, Zeichnungen, Kalkulationen und sonstigen Unterlagen, welche wir dem Auftraggeber zur Verfügung gestellt haben, behalten wir uns Eigentums- und Urheberrechte vor. Sie dürfen Dritten nicht zugänglich gemacht werden; dies gilt auch für alle seit Aufnahme der Vertragsverhandlungen erhaltenen Informationen in Bezug auf unsere Tätigkeit, Leistung und Ware. Vor einer Weitergabe an Dritte bedarf der Auftraggeber unserer ausdrücklichen schriftlichen Zustimmung.
            </p>

            {/* § 11 Kündigung */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 11 Kündigung</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Der Auftraggeber ist berechtigt, einen Auftrag zu kündigen, wenn er das Entwicklungsziel für nicht mehr oder nur mit unverhältnismäßigem Zusatzaufwand erreichbar hält oder dieser aus sonstigen Gründen auf die Weiterverfolgung des Entwicklungsvorhabens verzichten will. Bei einer vorzeitigen Kündigung des Vertrages ist der Auftraggeber verpflichtet, uns die bis zur Vertragsbeendigung nachweislich entstandenen und unmittelbar aus diesem Vertrag resultierenden Kosten, einschließlich der Kosten, die aus nicht mehr lösbaren Verpflichtungen resultieren, zu ersetzen. Darüber hinaus werden wir versuchen, freiwerdende Kapazitäten anderweitig zu nutzen; insbesondere ist der Auftraggeber berechtigt, hierfür einen entsprechenden Ersatzauftrag zu erteilen. Soweit dies nicht möglich ist, können wir einen Bereithaltungskostenersatz in Höhe einer nach dem Durchschnitt der letzten 3 Monate berechneten monatlichen Durchschnittsvergütung verlangen. Lief das Vorhaben noch nicht 3 Monate, berechnet sich die monatliche Durchschnittsvergütung nach der kürzeren Laufzeit des Vorhabens.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Bei Beendigung des Auftrages übergeben wir gegen Zahlung der Vergütung, etwaiger Bereithaltungskosten und aller sonstiger uns zustehender Leistungen das bis dahin erzielte Entwicklungsergebnis an den Auftraggeber.
            </p>

            {/* § 12 Erfüllungsort - Gerichtsstand - Geltungsbereich */}
            <h2 className="text-xl font-bold text-cme-dark mt-10">§ 12 Erfüllungsort – Gerichtsstand – Geltungsbereich</h2>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (1) Die Rechte des Auftraggebers sind nicht übertragbar.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (2) Erfüllungsort für alle Verpflichtungen aus diesem Vertrag, einschließlich eines Anspruchs auf Rücktritt, ist Dortmund.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3) Gerichtsstand ist Dortmund. Dies gilt auch für Wechsel- und Scheckklagen, insbesondere für Ansprüche aus dem Mahnverfahren. Solange ein Gerichtsverfahren gegen uns jedoch noch nicht anhängig ist, sind wir berechtigt, den Kunden auch an dem für seinen Wohnsitz zuständigen Gericht zu verklagen.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (3b) Diese Verkaufs-, Lieferungs- und Zahlungsbedingungen gelten nur gegenüber Unternehmern im Sinn von § 14 BGB.
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (4) Für diese Geschäftsbedingungen und die gesamte Rechtsbeziehung zu dem Auftraggeber gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
            </p>
            <p className="text-gray-600 leading-relaxed fluid-small">
              (5) Falls einzelne Bestimmungen unwirksam sein sollten oder die Geschäftsbedingungen Lücken enthalten, so wird dadurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. Anstelle der unwirksamen Bestimmung gilt diejenige wirksame Bestimmung als vereinbart, die dem Sinn und Zweck der unwirksamen Bestimmung entspricht. Im Falle von Lücken gilt diejenige Bestimmung als vereinbart, die dem entspricht, was nach Sinn und Zweck der Geschäftsbedingungen vernünftigerweise vereinbart worden wäre, hätten die Parteien die Angelegenheit von vorneherein bedacht.
            </p>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-400 fluid-xs">
                CME Control Motion Electronics GmbH, Alter Hellweg 48, 44379 Dortmund<br />
                Geschäftsführer: Waldemar Stephan · Amtsgericht Dortmund HRB26236
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
