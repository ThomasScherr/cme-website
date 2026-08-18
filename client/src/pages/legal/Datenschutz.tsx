import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';

export default function Datenschutz() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SEO
        titleDE="Datenschutzerklärung"
        titleEN="Privacy Policy"
        descriptionDE="Datenschutzerklärung der CME Control Motion Electronics GmbH gemäß DSGVO. Informationen zur Datenverarbeitung, Cookies und Ihren Rechten."
        descriptionEN="Privacy policy of CME Control Motion Electronics GmbH in accordance with GDPR. Information on data processing, cookies and your rights."
        path="/datenschutz"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isDE ? 'Datenschutz' : 'Privacy Policy', url: '/datenschutz' },
        ]}
      />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            {isDE ? <DatenschutzDE /> : <DatenschutzEN />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ─── German Version ─── */
function DatenschutzDE() {
  return (
    <>
      <h1 className="text-3xl font-bold text-cme-dark">Datenschutzerklärung</h1>

      {/* 1. Datenschutz auf einen Blick */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">1. Datenschutz auf einen Blick</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Allgemeine Hinweise</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Datenerfassung auf dieser Website</h3>

      <h4 className="text-base font-semibold text-cme-dark mt-4">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">Wie erfassen wir Ihre Daten?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">Wofür nutzen wir Ihre Daten?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
      </p>

      {/* 2. Hosting */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">2. Hosting und technische Dienstleister</h2>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wir hosten die Inhalte unserer Website bei einem externen Anbieter (Hoster). Für die Auslieferung von Bildern und Videos nutzen wir ein Content Delivery Network, für den Versand von E-Mails einen externen Dienstleister. Alle drei Unternehmen haben ihren Sitz in der Europäischen Union.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Externes Hosting</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Diese Website wird extern gehostet bei der Mittwald CM Service GmbH &amp; Co. KG, Königsberger Straße 4–6, 32339 Espelkamp, Deutschland (nachfolgend „Mittwald“). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf Servern von Mittwald in Deutschland gespeichert. Hierbei kann es sich v.&nbsp;a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z.&nbsp;B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">Auftragsverarbeitung</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wir haben mit Mittwald einen Vertrag über Auftragsverarbeitung (AVV) geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass Mittwald die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Content Delivery Network (bunny.net)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Bilder, Videos und Downloads dieser Website liefern wir über das Content Delivery Network der BunnyWay d.&nbsp;o.&nbsp;o., Dunajska cesta 165, 1000 Ljubljana, Slowenien (nachfolgend „bunny.net“) aus. Dabei wird Ihre IP-Adresse an bunny.net übermittelt, damit die angeforderte Datei an Ihr Endgerät ausgeliefert werden kann. bunny.net speichert dazu technische Zugriffsdaten wie gekürzte IP-Adresse, aufgerufene Adresse, Ländercode und Browserkennung.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Der Einsatz erfolgt im Interesse einer sicheren, schnellen und ressourcenschonenden Auslieferung unserer Inhalte (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG; die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        bunny.net betreibt ein weltweites Netz von Auslieferungsservern. Je nach Ihrem Standort kann Ihre Anfrage daher von einem Server außerhalb der Europäischen Union beantwortet werden. Für diese Fälle ist die Übermittlung auf die Standardvertragsklauseln der EU-Kommission gestützt. Wir haben mit bunny.net einen Vertrag über Auftragsverarbeitung geschlossen.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Weitere Informationen finden Sie in der Datenschutzerklärung von bunny.net:{' '}
        <a href="https://bunny.net/privacy/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://bunny.net/privacy/
        </a>
        .
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">E-Mail-Versand (Brevo)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Für den Versand von E-Mails – insbesondere der Benachrichtigungen aus unseren Kontakt- und NDA-Formularen – nutzen wir den Dienst Brevo der Brevo GmbH, Köpenicker Straße 126, 10179 Berlin, Deutschland (Tochtergesellschaft der Sendinblue SAS, 17 rue de Salneuve, 75017 Paris, Frankreich). Die in den Formularen angegebenen Daten werden dabei an Brevo übermittelt und dort zum Zweck des Versands verarbeitet. Die Verarbeitung findet auf Servern innerhalb der Europäischen Union statt.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Grundlage der Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist, sonst unser berechtigtes Interesse an einem zuverlässigen und nachvollziehbaren E-Mail-Versand (Art. 6 Abs. 1 lit. f DSGVO). Wir haben mit Brevo einen Vertrag über Auftragsverarbeitung geschlossen.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Weitere Informationen finden Sie in der Datenschutzerklärung von Brevo:{' '}
        <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://www.brevo.com/de/legal/privacypolicy/
        </a>
        .
      </p>

      {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">3. Allgemeine Hinweise und Pflichtinformationen</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Datenschutz</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wir weisen darauf hin, dass die Datenübertragung im Internet (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Hinweis zur verantwortlichen Stelle</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        CME Control Motion Electronics GmbH<br />
        Alter Hellweg 48<br />
        44379 Dortmund
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Telefon: +49 231 28 66 76 96-0<br />
        E-Mail: info@control-motion.de
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen, E-Mail-Adressen o.&nbsp;Ä.) entscheidet.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Speicherdauer</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z.&nbsp;B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Empfänger von personenbezogenen Daten</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z.&nbsp;B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small font-semibold uppercase">
        WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small font-semibold uppercase">
        WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Recht auf Datenübertragbarkeit</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Auskunft, Berichtigung und Löschung</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Recht auf Einschränkung der Verarbeitung</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
      </p>
      <ul className="text-gray-600 fluid-small list-disc pl-6 space-y-1">
        <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
        <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
      </ul>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">SSL- bzw. TLS-Verschlüsselung</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
      </p>

      {/* 4. Datenerfassung auf dieser Website */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">4. Datenerfassung auf dieser Website</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Cookies</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z.&nbsp;B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von technisch notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Kontaktformular</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Anfrage per E-Mail, Telefon oder Telefax</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Server-Log-Dateien</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
      </p>
      <ul className="text-gray-600 fluid-small list-disc pl-6 space-y-1">
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Dateien erfasst werden.
      </p>

      {/* 5. Analyse-Tools */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">5. Analyse-Tools und Werbung</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Tag Manager</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Diese Website nutzt den Google Tag Manager (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Der Google Tag Manager ist eine Lösung, mit der wir sog. Website-Tags über eine Oberfläche verwalten können. Der Tag Manager selbst setzt keine Cookies und erfasst keine personenbezogenen Daten. Der Tag Manager löst andere Tags aus, die ihrerseits unter Umständen Daten erfassen. Der Google Tag Manager greift nicht auf diese Daten zu. Wenn auf Domain- oder Cookie-Ebene eine Deaktivierung vorgenommen wurde, bleibt diese für alle Tracking-Tags bestehen, die mit dem Google Tag Manager implementiert werden.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Nutzung des Google Tag Managers erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer schnellen und unkomplizierten Einbindung und Verwaltung verschiedener Tools auf seiner Website.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Analytics</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z.&nbsp;B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft des Nutzers.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Google Analytics verwendet Technologien, die die Wiedererkennung des Nutzers zum Zwecke der Analyse des Nutzerverhaltens ermöglichen (z.&nbsp;B. Cookies oder Device-Fingerprinting). Die von Google erfassten Informationen über die Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier:{' '}
        <a href="https://business.safety.google/adscontrollerterms/sccs/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://business.safety.google/adscontrollerterms/sccs/
        </a>.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        <strong>IP-Anonymisierung:</strong> Wir nutzen Google Analytics mit aktivierter IP-Anonymisierung. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google:{' '}
        <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://support.google.com/analytics/answer/6004245
        </a>.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Ads Conversion-Tracking</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Diese Website nutzt Google Ads Conversion-Tracking (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Mithilfe von Google Ads Conversion-Tracking können wir erkennen, ob der Nutzer bestimmte Aktionen durchgeführt hat. Wir können so die Effektivität unserer Werbemaßnahmen auswerten.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Informationen zu Google Ads Conversion-Tracking finden Sie in der Datenschutzerklärung von Google:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://policies.google.com/privacy
        </a>.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Leadinfo</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Diese Website nutzt den B2B-Analysedienst Leadinfo (Leadinfo B.V., Rivium Quadrant 151, 2909 LC Capelle aan den IJssel, Niederlande). Leadinfo identifiziert Unternehmen, die unsere Website besuchen, anhand der IP-Adresse. Es werden dabei keine personenbezogenen Daten einzelner Nutzer erhoben – die Identifikation erfolgt ausschließlich auf Unternehmensebene.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Weitere Informationen finden Sie in der Datenschutzerklärung von Leadinfo:{' '}
        <a href="https://www.leadinfo.com/de/rechtliches/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://www.leadinfo.com/de/rechtliches/datenschutz/
        </a>.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Cookie-Consent-Management</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Wir setzen auf unserer Website ein eigenes Cookie-Consent-Tool ein, um Ihre Einwilligung zur Speicherung von Cookies und vergleichbaren Technologien einzuholen und zu verwalten. Beim Aufruf der Website wird ein Cookie-Banner angezeigt, über den Sie der Nutzung bestimmter Cookie-Kategorien zustimmen oder diese ablehnen können. Ihre Einwilligung wird im Local Storage Ihres Browsers gespeichert und kann jederzeit über den Link „Cookie-Einstellungen" im Footer der Website widerrufen werden.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO und § 25 Abs. 1 TDDDG, da der Websitebetreiber gesetzlich verpflichtet ist, die Einwilligung der Nutzer in die Verarbeitung bestimmter Daten einzuholen.
      </p>

      {/* 6. Plugins und Tools */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">6. Plugins und Tools</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Live-Chat (Crisp)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Auf dieser Website bieten wir einen Live-Chat des Anbieters Crisp IM SAS, 2 Boulevard de Launay, 44100 Nantes, Frankreich (nachfolgend „Crisp“) an. Wenn Sie den Chat öffnen und nutzen, werden die von Ihnen eingegebenen Nachrichten sowie Ihre IP-Adresse, Angaben zu Browser und Endgerät und der Zeitpunkt der Anfrage an Crisp übermittelt und dort verarbeitet, damit wir Ihnen antworten können. Crisp setzt dabei Cookies auf Ihrem Endgerät, um den Gesprächsverlauf einer Sitzung zuordnen zu können.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Der Chat wird erst geladen, nachdem Sie im Cookie-Banner in die Kategorie „Chat“ eingewilligt haben. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit über den Link „Cookie-Einstellungen“ im Footer widerrufbar; wir entfernen den Chat und die von ihm gesetzten Cookies dann wieder. Die Inhalte eines geführten Chats bewahren wir so lange auf, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, längstens bis zum Ablauf gesetzlicher Aufbewahrungsfristen.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Crisp speichert die Chatdaten auf Servern innerhalb der Europäischen Union (Nachrichtendaten in den Niederlanden, ergänzende Daten in Deutschland). Für die Zustellung der Nachrichten betreibt Crisp zusätzlich Vermittlungsserver außerhalb der EU, die keine Inhalte, sondern lediglich Verbindungsprotokolle speichern; für diese Übermittlungen sind die Standardvertragsklauseln der EU-Kommission vereinbart. Wir haben mit Crisp einen Vertrag über Auftragsverarbeitung geschlossen.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Weitere Informationen finden Sie in der Datenschutzerklärung von Crisp:{' '}
        <a href="https://crisp.chat/en/privacy/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://crisp.chat/en/privacy/
        </a>
        .
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Fonts (lokales Hosting)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die lokal installiert sind. Eine Verbindung zu Servern von Google findet dabei nicht statt.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Weitere Informationen zu Google Fonts finden Sie unter{' '}
        <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://developers.google.com/fonts/faq
        </a>{' '}
        und in der Datenschutzerklärung von Google:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://policies.google.com/privacy
        </a>.
      </p>

      <p className="text-gray-500 fluid-xs mt-12 border-t border-gray-200 pt-6">
        Quelle: Angelehnt an die Datenschutzerklärung von{' '}
        <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          e-recht24.de
        </a>
      </p>
    </>
  );
}

/* ─── English Version ─── */
function DatenschutzEN() {
  return (
    <>
      <h1 className="text-3xl font-bold text-cme-dark">Privacy Policy</h1>

      {/* 1. Privacy at a Glance */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">1. Privacy at a Glance</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">General Information</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you. Detailed information on the subject of data protection can be found in our privacy policy listed below this text.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Data Collection on This Website</h3>

      <h4 className="text-base font-semibold text-cme-dark mt-4">Who is responsible for data collection on this website?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Data processing on this website is carried out by the website operator. You can find the operator's contact details in the section "Information about the Responsible Party" in this privacy policy.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">How do we collect your data?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Your data is collected in part by you providing it to us. This may be data that you enter in a contact form, for example.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Other data is collected automatically or with your consent by our IT systems when you visit the website. This is primarily technical data (e.g. internet browser, operating system or time of page access). This data is collected automatically as soon as you enter this website.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">What do we use your data for?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Part of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior. If contracts can be concluded or initiated via the website, the transmitted data will also be processed for contract offers, orders or other order inquiries.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">What rights do you have regarding your data?</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        You have the right to receive information about the origin, recipient and purpose of your stored personal data free of charge at any time. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future. You also have the right to request the restriction of the processing of your personal data under certain circumstances. Furthermore, you have the right to lodge a complaint with the competent supervisory authority.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        You can contact us at any time regarding this and other questions on the subject of data protection.
      </p>

      {/* 2. Hosting */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">2. Hosting and Technical Service Providers</h2>
      <p className="text-gray-600 leading-relaxed fluid-small">
        We host the contents of our website with an external provider (host). We deliver images and videos via a content delivery network and send emails through an external service provider. All three companies are based in the European Union.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">External Hosting</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This website is hosted externally by Mittwald CM Service GmbH &amp; Co. KG, Königsberger Straße 4–6, 32339 Espelkamp, Germany (hereinafter “Mittwald”). The personal data collected on this website is stored on Mittwald servers in Germany. This may include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website accesses and other data generated via a website.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        External hosting is carried out for the purpose of fulfilling contracts with our potential and existing customers (Art. 6 para. 1 lit. b GDPR) and in the interest of secure, fast and efficient provision of our online offering by a professional provider (Art. 6 para. 1 lit. f GDPR). Where corresponding consent has been requested, processing is carried out exclusively on the basis of Art. 6 para. 1 lit. a GDPR and Section 25 para. 1 TDDDG, insofar as the consent covers the storage of cookies or access to information on the user's device (e.g. device fingerprinting) within the meaning of the TDDDG. Consent can be revoked at any time.
      </p>

      <h4 className="text-base font-semibold text-cme-dark mt-4">Data Processing Agreement</h4>
      <p className="text-gray-600 leading-relaxed fluid-small">
        We have concluded a data processing agreement (DPA) with Mittwald. This is a contract required under data protection law which ensures that Mittwald processes the personal data of our website visitors only in accordance with our instructions and in compliance with the GDPR.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Content Delivery Network (bunny.net)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        We deliver images, videos and downloads on this website via the content delivery network of BunnyWay d.&nbsp;o.&nbsp;o., Dunajska cesta 165, 1000 Ljubljana, Slovenia (hereinafter “bunny.net”). Your IP address is transmitted to bunny.net so that the requested file can be delivered to your device. For this purpose, bunny.net stores technical access data such as a shortened IP address, the requested address, country code and browser identifier.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This service is used in the interest of secure, fast and resource-efficient delivery of our content (Art. 6 para. 1 lit. f GDPR). Where corresponding consent has been requested, processing is carried out exclusively on the basis of Art. 6 para. 1 lit. a GDPR and Section 25 para. 1 TDDDG; consent can be revoked at any time.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        bunny.net operates a worldwide network of delivery servers. Depending on your location, your request may therefore be answered by a server outside the European Union. For such cases, the transfer is based on the standard contractual clauses of the EU Commission. We have concluded a data processing agreement with bunny.net.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Further information can be found in the bunny.net privacy policy:{' '}
        <a href="https://bunny.net/privacy/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://bunny.net/privacy/
        </a>
        .
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Email Dispatch (Brevo)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        For sending emails – in particular the notifications from our contact and NDA forms – we use the Brevo service provided by Brevo GmbH, Köpenicker Straße 126, 10179 Berlin, Germany (a subsidiary of Sendinblue SAS, 17 rue de Salneuve, 75017 Paris, France). The data you enter in the forms is transmitted to Brevo and processed there for the purpose of dispatch. Processing takes place on servers within the European Union.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The basis for processing is Art. 6 para. 1 lit. b GDPR if your inquiry is related to the fulfillment of a contract or is necessary for the implementation of pre-contractual measures, otherwise our legitimate interest in reliable and traceable email dispatch (Art. 6 para. 1 lit. f GDPR). We have concluded a data processing agreement with Brevo.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Further information can be found in the Brevo privacy policy:{' '}
        <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://www.brevo.com/legal/privacypolicy/
        </a>
        .
      </p>

      {/* 3. General Information and Mandatory Information */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">3. General Information and Mandatory Information</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Data Protection</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        When you use this website, various personal data is collected. Personal data is data that can be used to personally identify you. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        We would like to point out that data transmission over the Internet (e.g. when communicating by email) may have security gaps. Complete protection of data against access by third parties is not possible.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Information about the Responsible Party</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The responsible party for data processing on this website is:
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        CME Control Motion Electronics GmbH<br />
        Alter Hellweg 48<br />
        44379 Dortmund, Germany
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Phone: +49 231 28 66 76 96-0<br />
        Email: info@control-motion.de
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of the processing of personal data (e.g. names, email addresses, etc.).
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Storage Duration</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Unless a more specific storage period has been stated within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke your consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g. tax or commercial law retention periods); in the latter case, deletion will take place after these reasons cease to apply.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">General Information on the Legal Bases for Data Processing on This Website</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        If you have consented to data processing, we process your personal data on the basis of Art. 6 para. 1 lit. a GDPR or Art. 9 para. 2 lit. a GDPR, insofar as special categories of data pursuant to Art. 9 para. 1 GDPR are processed. In the case of explicit consent to the transfer of personal data to third countries, data processing is also carried out on the basis of Art. 49 para. 1 lit. a GDPR. If you have consented to the storage of cookies or to access to information on your device (e.g. via device fingerprinting), data processing is additionally carried out on the basis of Section 25 para. 1 TDDDG. Consent can be revoked at any time. If your data is required for the fulfillment of a contract or for the implementation of pre-contractual measures, we process your data on the basis of Art. 6 para. 1 lit. b GDPR. Furthermore, we process your data if it is necessary for the fulfillment of a legal obligation, on the basis of Art. 6 para. 1 lit. c GDPR. Data processing may also be carried out on the basis of our legitimate interest pursuant to Art. 6 para. 1 lit. f GDPR. Information on the legal bases relevant in each individual case is provided in the following paragraphs of this privacy policy.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Recipients of Personal Data</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        In the course of our business activities, we work together with various external parties. This sometimes also requires the transfer of personal data to these external parties. We only pass on personal data to external parties if this is necessary in the context of fulfilling a contract, if we are legally obliged to do so (e.g. transfer of data to tax authorities), if we have a legitimate interest in the transfer pursuant to Art. 6 para. 1 lit. f GDPR, or if another legal basis permits the transfer. When using processors, we only pass on personal data of our customers on the basis of a valid data processing agreement. In the case of joint processing, a joint processing agreement is concluded.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Revocation of Your Consent to Data Processing</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Many data processing operations are only possible with your express consent. You can revoke consent that has already been given at any time. The legality of the data processing carried out until the revocation remains unaffected by the revocation.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Right to Object to Data Collection in Special Cases and to Direct Marketing (Art. 21 GDPR)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small font-semibold uppercase">
        IF DATA PROCESSING IS BASED ON ART. 6 PARA. 1 LIT. E OR F GDPR, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA AT ANY TIME FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION; THIS ALSO APPLIES TO PROFILING BASED ON THESE PROVISIONS. THE RESPECTIVE LEGAL BASIS ON WHICH PROCESSING IS BASED CAN BE FOUND IN THIS PRIVACY POLICY. IF YOU OBJECT, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA UNLESS WE CAN DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING WHICH OVERRIDE YOUR INTERESTS, RIGHTS AND FREEDOMS, OR THE PROCESSING SERVES THE ASSERTION, EXERCISE OR DEFENSE OF LEGAL CLAIMS (OBJECTION PURSUANT TO ART. 21 PARA. 1 GDPR).
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small font-semibold uppercase">
        IF YOUR PERSONAL DATA IS PROCESSED FOR THE PURPOSE OF DIRECT MARKETING, YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF PERSONAL DATA CONCERNING YOU FOR THE PURPOSE OF SUCH ADVERTISING; THIS ALSO APPLIES TO PROFILING INSOFAR AS IT IS RELATED TO SUCH DIRECT MARKETING. IF YOU OBJECT, YOUR PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR THE PURPOSE OF DIRECT MARKETING (OBJECTION PURSUANT TO ART. 21 PARA. 2 GDPR).
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Right to Lodge a Complaint with the Competent Supervisory Authority</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, their place of work or the place of the alleged violation. The right to lodge a complaint exists without prejudice to other administrative or judicial remedies.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Right to Data Portability</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of the data to another controller, this will only be done insofar as it is technically feasible.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Information, Correction and Deletion</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Within the framework of the applicable legal provisions, you have the right to free information about your stored personal data, its origin and recipients and the purpose of data processing and, if applicable, a right to correction or deletion of this data at any time. You can contact us at any time regarding this and other questions on the subject of personal data.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Right to Restriction of Processing</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        You have the right to request the restriction of the processing of your personal data. You can contact us at any time for this purpose. The right to restriction of processing exists in the following cases: If you dispute the accuracy of your personal data stored by us, we generally need time to verify this. For the duration of the review, you have the right to request the restriction of the processing of your personal data. If the processing of your personal data was or is unlawful, you can request the restriction of data processing instead of erasure. If we no longer need your personal data but you need it to exercise, defend or assert legal claims, you have the right to request the restriction of the processing of your personal data instead of erasure. If you have lodged an objection pursuant to Art. 21 para. 1 GDPR, a balance must be struck between your interests and ours. As long as it has not yet been determined whose interests prevail, you have the right to request the restriction of the processing of your personal data. If you have restricted the processing of your personal data, this data may – apart from being stored – only be processed with your consent or for the assertion, exercise or defense of legal claims, or for the protection of the rights of another natural or legal person, or for reasons of important public interest of the European Union or a Member State.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">SSL or TLS Encryption</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content, such as orders or inquiries that you send to us as the site operator. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        When SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.
      </p>

      {/* 4. Data Collection on This Website */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">4. Data Collection on This Website</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Cookies</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Our website uses so-called "cookies." Cookies are small data packets and do not cause any damage to your device. They are stored either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on your device. Session cookies are automatically deleted after your visit. Permanent cookies remain stored on your device until you delete them yourself or they are automatically deleted by your web browser.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Cookies may originate from us (first-party cookies) or from third-party companies (so-called third-party cookies). Third-party cookies enable the integration of certain services from third-party companies within websites (e.g. cookies for processing payment services).
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Technically necessary cookies are stored on the basis of Art. 6 para. 1 lit. f GDPR. The website operator has a legitimate interest in storing technically necessary cookies for the technically error-free and optimized provision of its services. Where consent to the storage of cookies and comparable recognition technologies has been requested, processing is carried out exclusively on the basis of this consent (Art. 6 para. 1 lit. a GDPR and Section 25 para. 1 TDDDG); consent can be revoked at any time.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        You can set your browser so that you are informed about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general, and activate the automatic deletion of cookies when closing the browser. If cookies are deactivated, the functionality of this website may be limited.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Contact Form</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        When you send us inquiries via the contact form, your details from the inquiry form, including the contact data you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The processing of this data is based on Art. 6 para. 1 lit. b GDPR if your inquiry is related to the fulfillment of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of the inquiries addressed to us (Art. 6 para. 1 lit. f GDPR) or on your consent (Art. 6 para. 1 lit. a GDPR) if this was requested; the consent can be revoked at any time.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The data you enter in the contact form will remain with us until you request deletion, revoke your consent to storage, or the purpose for storing the data no longer applies (e.g. after your inquiry has been processed). Mandatory statutory provisions – in particular retention periods – remain unaffected.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Inquiry by Email, Telephone or Fax</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        If you contact us by email, telephone or fax, your inquiry, including all resulting personal data (name, inquiry), will be stored and processed by us for the purpose of handling your request. We do not share this data without your consent.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The processing of this data is based on Art. 6 para. 1 lit. b GDPR if your inquiry is related to the fulfillment of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of the inquiries addressed to us (Art. 6 para. 1 lit. f GDPR) or on your consent (Art. 6 para. 1 lit. a GDPR) if this was requested; the consent can be revoked at any time.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The data you send us via contact requests will remain with us until you request deletion, revoke your consent to storage, or the purpose for storing the data no longer applies (e.g. after your request has been processed). Mandatory statutory provisions – in particular statutory retention periods – remain unaffected.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Server Log Files</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:
      </p>
      <ul className="text-gray-600 fluid-small list-disc pl-6 space-y-1">
        <li>Browser type and browser version</li>
        <li>Operating system used</li>
        <li>Referrer URL</li>
        <li>Host name of the accessing computer</li>
        <li>Time of the server request</li>
        <li>IP address</li>
      </ul>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This data is not merged with other data sources. The collection of this data is based on Art. 6 para. 1 lit. f GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of its website – for this purpose, the server log files must be collected.
      </p>

      {/* 5. Analytics */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">5. Analytics and Advertising</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Tag Manager</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This website uses Google Tag Manager (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). Google Tag Manager is a solution that allows us to manage so-called website tags through an interface. The Tag Manager itself does not set any cookies and does not collect any personal data. The Tag Manager triggers other tags, which in turn may collect data. Google Tag Manager does not access this data. If deactivation has been carried out at the domain or cookie level, this remains in effect for all tracking tags implemented with Google Tag Manager.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The use of Google Tag Manager is based on Art. 6(1)(f) GDPR. The website operator has a legitimate interest in the quick and uncomplicated integration and management of various tools on its website.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Analytics</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This website uses functions of the web analytics service Google Analytics (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). Google Analytics enables the website operator to analyze the behavior of website visitors. The website operator receives various usage data, such as page views, duration of visit, operating systems used, and origin of the user.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Google Analytics uses technologies that enable the recognition of the user for the purpose of analyzing user behavior (e.g., cookies or device fingerprinting). The information collected by Google about the use of this website is usually transferred to a Google server in the USA and stored there.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The use of this service is based on your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Data transfer to the USA is based on the EU Commission's Standard Contractual Clauses. Details can be found here:{' '}
        <a href="https://business.safety.google/adscontrollerterms/sccs/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://business.safety.google/adscontrollerterms/sccs/
        </a>.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        <strong>IP Anonymization:</strong> We use Google Analytics with IP anonymization enabled. This means your IP address is truncated by Google within member states of the European Union or in other contracting states of the Agreement on the European Economic Area before being transmitted to the USA.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        More information on how Google Analytics handles user data can be found in Google's privacy policy:{' '}
        <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://support.google.com/analytics/answer/6004245
        </a>.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Ads Conversion Tracking</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This website uses Google Ads Conversion Tracking (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). With Google Ads Conversion Tracking, we can determine whether a user has completed certain actions. This allows us to evaluate the effectiveness of our advertising measures.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The use of this service is based on your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Information on Google Ads Conversion Tracking can be found in Google's privacy policy:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://policies.google.com/privacy
        </a>.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Leadinfo</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This website uses the B2B analytics service Leadinfo (Leadinfo B.V., Rivium Quadrant 151, 2909 LC Capelle aan den IJssel, Netherlands). Leadinfo identifies companies visiting our website based on their IP address. No personal data of individual users is collected – identification is exclusively at the company level.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The use of this service is based on your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Further information can be found in Leadinfo's privacy policy:{' '}
        <a href="https://www.leadinfo.com/en/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://www.leadinfo.com/en/legal/privacy/
        </a>.
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Cookie Consent Management</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        We use our own cookie consent tool on our website to obtain and manage your consent for the storage of cookies and comparable technologies. When you visit the website, a cookie banner is displayed through which you can consent to or reject certain cookie categories. Your consent is stored in your browser's local storage and can be revoked at any time via the “Cookie Settings” link in the website footer.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Processing is based on Art. 6(1)(c) GDPR and Section 25(1) TDDDG, as the website operator is legally obligated to obtain user consent for the processing of certain data.
      </p>

      {/* 6. Plugins and Tools */}
      <h2 className="text-xl font-bold text-cme-dark mt-10">6. Plugins and Tools</h2>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Live Chat (Crisp)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        We offer a live chat on this website provided by Crisp IM SAS, 2 Boulevard de Launay, 44100 Nantes, France (hereinafter “Crisp”). When you open and use the chat, the messages you enter as well as your IP address, information about your browser and device, and the time of the enquiry are transmitted to Crisp and processed there so that we can reply to you. Crisp sets cookies on your device in order to associate the conversation with a session.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        The chat is only loaded after you have consented to the “Chat” category in the cookie banner. The legal basis is your consent pursuant to Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be revoked at any time via the “Cookie Settings” link in the footer; we then remove the chat and the cookies it has set. We retain the contents of a chat for as long as is necessary to process your enquiry, at the longest until statutory retention periods expire.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Crisp stores chat data on servers within the European Union (message data in the Netherlands, supplementary data in Germany). For message delivery, Crisp also operates relay servers outside the EU which store no content, only connection logs; the EU Commission’s standard contractual clauses have been agreed for these transfers. We have concluded a data processing agreement with Crisp.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Further information can be found in Crisp’s privacy policy:{' '}
        <a href="https://crisp.chat/en/privacy/" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://crisp.chat/en/privacy/
        </a>
        .
      </p>

      <h3 className="text-lg font-semibold text-cme-dark mt-6">Google Fonts (Local Hosting)</h3>
      <p className="text-gray-600 leading-relaxed fluid-small">
        This site uses so-called Google Fonts for the uniform display of fonts, which are installed locally. No connection to Google servers is made.
      </p>
      <p className="text-gray-600 leading-relaxed fluid-small">
        Further information on Google Fonts can be found at{' '}
        <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://developers.google.com/fonts/faq
        </a>{' '}
        and in Google's privacy policy:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          https://policies.google.com/privacy
        </a>.
      </p>

      <p className="text-gray-500 fluid-xs mt-12 border-t border-gray-200 pt-6">
        Source: Based on the privacy policy template by{' '}
        <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="text-cme-blue underline">
          e-recht24.de
        </a>
      </p>
    </>
  );
}
