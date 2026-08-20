import type { Lang } from '../i18n'

export type LegalKind = 'legal' | 'privacy' | 'cookies'

export type CookieRow = {
  name: string
  purpose: string
  duration: string
  type: string
  provider: string
}

export type LegalDoc = {
  title: string
  updated: string
  sections: Array<{ heading: string; paragraphs: string[] }>
  cookieTable?: {
    caption: string
    headers: [string, string, string, string, string]
    rows: CookieRow[]
  }
}

const docs: Record<LegalKind, Record<Lang, LegalDoc>> = {
  legal: {
    es: {
      title: 'Aviso legal',
      updated: '20 de agosto de 2026',
      sections: [
        {
          heading: 'Titular del sitio',
          paragraphs: [
            'Este sitio web, Sovereign Stack (homelab), es operado a título personal por Guillermo Sicilia Hernandez (en adelante, el «Titular»), persona física. No lo opera una sociedad mercantil.',
            'Contacto: siciliahernandezguillermo@gmail.com · Portfolio: https://guillermosh.com',
          ],
        },
        {
          heading: 'Objeto',
          paragraphs: [
            'El sitio muestra el estado y la bitácora de un laboratorio doméstico (homelab) con fines informativos y de portfolio. No constituye una oferta comercial ni un servicio profesional.',
          ],
        },
        {
          heading: 'Propiedad intelectual',
          paragraphs: [
            'Salvo indicación en contrario, los textos, diseño y código propio del sitio pertenecen al Titular. Marcas y nombres de terceros (Docker, MikroTik, etc.) pertenecen a sus respectivos titulares.',
          ],
        },
        {
          heading: 'Exención de responsabilidad',
          paragraphs: [
            'La información se ofrece «tal cual», sin garantía de exactitud o disponibilidad continua. El Titular no responde de daños derivados del uso del sitio o de la reproducción de configuraciones descritas.',
            'Los enlaces externos se facilitan por comodidad; el Titular no controla ni responde del contenido de terceros.',
          ],
        },
        {
          heading: 'Legislación aplicable',
          paragraphs: [
            'Este aviso se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados del domicilio del Titular, salvo norma imperativa en contrario.',
          ],
        },
      ],
    },
    en: {
      title: 'Legal notice',
      updated: '20 August 2026',
      sections: [
        {
          heading: 'Site owner',
          paragraphs: [
            'This website, Sovereign Stack (homelab), is operated personally by Guillermo Sicilia Hernandez (the “Owner”), a natural person. It is not operated by a company.',
            'Contact: siciliahernandezguillermo@gmail.com · Portfolio: https://guillermosh.com',
          ],
        },
        {
          heading: 'Purpose',
          paragraphs: [
            'The site shows the status and log of a home lab for informational and portfolio purposes. It is not a commercial offer or professional service.',
          ],
        },
        {
          heading: 'Intellectual property',
          paragraphs: [
            'Unless otherwise stated, the site’s own text, design, and code belong to the Owner. Third-party brands and names (Docker, MikroTik, etc.) belong to their respective owners.',
          ],
        },
        {
          heading: 'Disclaimer',
          paragraphs: [
            'Information is provided “as is”, with no warranty of accuracy or continuous availability. The Owner is not liable for damages arising from use of the site or from reproducing described setups.',
            'External links are provided for convenience; the Owner does not control or accept responsibility for third-party content.',
          ],
        },
        {
          heading: 'Governing law',
          paragraphs: [
            'This notice is governed by Spanish law. Any dispute is submitted to the courts of the Owner’s domicile, unless mandatory rules provide otherwise.',
          ],
        },
      ],
    },
  },
  privacy: {
    es: {
      title: 'Política de privacidad',
      updated: '20 de agosto de 2026',
      sections: [
        {
          heading: 'Responsable del tratamiento',
          paragraphs: [
            'Guillermo Sicilia Hernandez (persona física). Contacto: siciliahernandezguillermo@gmail.com.',
            'Sitio personal de homelab / portfolio. No lo opera una empresa.',
          ],
        },
        {
          heading: 'Qué datos se tratan',
          paragraphs: [
            'Este sitio no dispone de formularios de registro ni de cuenta de usuario.',
            'Si escribes por correo electrónico, se tratarán los datos que incluyas en el mensaje solo para responderte.',
            'En el navegador se pueden guardar preferencias locales (idioma, tema y consentimiento de cookies) mediante localStorage; no se envían a un servidor propio.',
            'Si aceptas las cookies de analítica, Google Analytics 4 puede tratar identificadores técnicos, páginas visitadas, dispositivo aproximado e IP anonimizada, según la configuración de Google.',
          ],
        },
        {
          heading: 'Finalidad y base jurídica',
          paragraphs: [
            'Preferencias locales: interés legítimo / necesidad técnica para recordar tu elección (art. 6.1.f RGPD).',
            'Correo: interés legítimo en atender la consulta (art. 6.1.f) o medidas precontractuales si aplica (art. 6.1.b).',
            'Analítica (GA4): solo con tu consentimiento (art. 6.1.a RGPD y art. 22.2 LSSI). Si rechazas, no se carga el script de medición.',
          ],
        },
        {
          heading: 'Encargados y transferencias',
          paragraphs: [
            'Google Ireland / Google LLC pueden actuar como encargados o destinatarios de datos de analítica. Pueden existir transferencias internacionales amparadas por cláusulas tipo u otros mecanismos de Google.',
            'Las tipografías se cargan desde Google Fonts (fonts.googleapis.com / fonts.gstatic.com), lo que implica una conexión a servidores de Google al visitar el sitio.',
          ],
        },
        {
          heading: 'Conservación y derechos',
          paragraphs: [
            'El consentimiento y las preferencias permanecen en tu dispositivo hasta que las borres o las cambies desde el botón de preferencias en la Política de cookies.',
            'Los datos de analítica se conservan según la retención configurada en la propiedad de GA4.',
            'Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a siciliahernandezguillermo@gmail.com, y reclamar ante la AEPD (www.aepd.es).',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy policy',
      updated: '20 August 2026',
      sections: [
        {
          heading: 'Controller',
          paragraphs: [
            'Guillermo Sicilia Hernandez (natural person). Contact: siciliahernandezguillermo@gmail.com.',
            'Personal homelab / portfolio site. Not operated by a company.',
          ],
        },
        {
          heading: 'What data is processed',
          paragraphs: [
            'This site has no registration forms or user accounts.',
            'If you email the Owner, the data you include in the message is processed only to reply.',
            'The browser may store local preferences (language, theme, and cookie consent) in localStorage; these are not sent to an owned server.',
            'If you accept analytics cookies, Google Analytics 4 may process technical identifiers, pages visited, approximate device data, and anonymized IP, per Google’s configuration.',
          ],
        },
        {
          heading: 'Purpose and legal basis',
          paragraphs: [
            'Local preferences: legitimate interest / technical need to remember your choice (GDPR art. 6.1.f).',
            'Email: legitimate interest in answering the query (art. 6.1.f) or pre-contractual steps if applicable (art. 6.1.b).',
            'Analytics (GA4): only with your consent (GDPR art. 6.1.a and Spanish LSSI art. 22.2). If you reject, the measurement script is not loaded.',
          ],
        },
        {
          heading: 'Processors and transfers',
          paragraphs: [
            'Google Ireland / Google LLC may act as processors or recipients of analytics data. International transfers may occur under Google’s standard contractual clauses or other mechanisms.',
            'Fonts are loaded from Google Fonts (fonts.googleapis.com / fonts.gstatic.com), which means a connection to Google servers when you visit the site.',
          ],
        },
        {
          heading: 'Retention and rights',
          paragraphs: [
            'Consent and preferences stay on your device until you clear them or change them via the preferences button on the Cookie policy page.',
            'Analytics data is retained according to the GA4 retention setting on the property.',
            'You may exercise access, rectification, erasure, objection, restriction, and portability by emailing siciliahernandezguillermo@gmail.com, and lodge a complaint with the Spanish DPA (AEPD, www.aepd.es).',
          ],
        },
      ],
    },
  },
  cookies: {
    es: {
      title: 'Política de cookies',
      updated: '20 de agosto de 2026',
      cookieTable: {
        caption: 'Listado de cookies y almacenamiento usado en este sitio',
        headers: ['Nombre', 'Finalidad', 'Duración', 'Tipo', 'Proveedor'],
        rows: [
          {
            name: 'theme',
            purpose: 'Recordar tema claro/oscuro',
            duration: 'Hasta que la borres',
            type: 'Necesaria',
            provider: 'Propia (localStorage)',
          },
          {
            name: 'lang',
            purpose: 'Recordar idioma de la interfaz (es/en)',
            duration: 'Hasta que la borres',
            type: 'Necesaria',
            provider: 'Propia (localStorage)',
          },
          {
            name: 'cookie-consent',
            purpose: 'Guardar si aceptaste o rechazaste la analítica',
            duration: 'Hasta que la cambies',
            type: 'Necesaria',
            provider: 'Propia (localStorage)',
          },
          {
            name: 'blog-view',
            purpose: 'Recordar vista del blog (cronología/cuadrícula)',
            duration: 'Hasta que la borres',
            type: 'Necesaria',
            provider: 'Propia (localStorage)',
          },
          {
            name: '_ga, _ga_*, _gid',
            purpose: 'Estadísticas de uso agregadas',
            duration: 'Hasta 2 años (_ga) / 24 h (_gid), según Google',
            type: 'Analítica (opcional)',
            provider: 'Google Analytics 4',
          },
        ],
      },
      sections: [
        {
          heading: 'Responsable',
          paragraphs: [
            'Guillermo Sicilia Hernandez. Contacto: siciliahernandezguillermo@gmail.com.',
          ],
        },
        {
          heading: 'Qué son las cookies',
          paragraphs: [
            'Las cookies y tecnologías similares almacenan o leen información en tu dispositivo. Este sitio usa localStorage para preferencias necesarias y, solo si aceptas, tecnologías de Google Analytics 4.',
          ],
        },
        {
          heading: 'Base jurídica',
          paragraphs: [
            'Necesarias: interés legítimo / necesidad técnica para que el sitio recuerde tu configuración (no requieren consentimiento previo).',
            'Analítica: solo con tu consentimiento (art. 22.2 LSSI y art. 6.1.a RGPD). Si rechazas, no se carga el script de medición.',
          ],
        },
        {
          heading: 'Cómo gestionar tu elección',
          paragraphs: [
            'En la primera visita verás un banner con Aceptar y Rechazar, ambos fáciles de usar.',
            'Puedes cambiar tu decisión en cualquier momento desde el botón «Preferencias de cookies» en esta misma página: se vuelve a mostrar el banner y, si rechazas, se desactiva la analítica y se intentan borrar las cookies típicas de GA en este dominio.',
            'También puedes bloquear cookies de terceros en la configuración del navegador.',
          ],
        },
        {
          heading: 'Más información',
          paragraphs: [
            'Consulta también la Política de privacidad y el Aviso legal. Texto orientativo para un sitio personal; no sustituye asesoramiento jurídico.',
          ],
        },
      ],
    },
    en: {
      title: 'Cookie policy',
      updated: '20 August 2026',
      cookieTable: {
        caption: 'Cookies and storage used on this site',
        headers: ['Name', 'Purpose', 'Duration', 'Type', 'Provider'],
        rows: [
          {
            name: 'theme',
            purpose: 'Remember light/dark theme',
            duration: 'Until you clear it',
            type: 'Necessary',
            provider: 'First-party (localStorage)',
          },
          {
            name: 'lang',
            purpose: 'Remember interface language (es/en)',
            duration: 'Until you clear it',
            type: 'Necessary',
            provider: 'First-party (localStorage)',
          },
          {
            name: 'cookie-consent',
            purpose: 'Store whether you accepted or rejected analytics',
            duration: 'Until you change it',
            type: 'Necessary',
            provider: 'First-party (localStorage)',
          },
          {
            name: 'blog-view',
            purpose: 'Remember blog listing view (timeline/grid)',
            duration: 'Until you clear it',
            type: 'Necessary',
            provider: 'First-party (localStorage)',
          },
          {
            name: '_ga, _ga_*, _gid',
            purpose: 'Aggregated usage statistics',
            duration: 'Up to 2 years (_ga) / 24 h (_gid), per Google',
            type: 'Analytics (optional)',
            provider: 'Google Analytics 4',
          },
        ],
      },
      sections: [
        {
          heading: 'Controller',
          paragraphs: [
            'Guillermo Sicilia Hernandez. Contact: siciliahernandezguillermo@gmail.com.',
          ],
        },
        {
          heading: 'What cookies are',
          paragraphs: [
            'Cookies and similar technologies store or read information on your device. This site uses localStorage for necessary preferences and, only if you accept, Google Analytics 4 technologies.',
          ],
        },
        {
          heading: 'Legal basis',
          paragraphs: [
            'Necessary: legitimate interest / technical need for the site to remember your settings (no prior consent required).',
            'Analytics: only with your consent (Spanish LSSI art. 22.2 and GDPR art. 6.1.a). If you reject, the measurement script is not loaded.',
          ],
        },
        {
          heading: 'How to manage your choice',
          paragraphs: [
            'On first visit you will see a banner with Accept and Reject, both easy to use.',
            'You can change your decision anytime via the “Cookie preferences” button on this page: the banner returns and, if you reject, analytics is disabled and typical GA cookies for this domain are cleared when possible.',
            'You can also block third-party cookies in your browser settings.',
          ],
        },
        {
          heading: 'More information',
          paragraphs: [
            'See also the Privacy policy and Legal notice. Written for a personal site; not legal advice.',
          ],
        },
      ],
    },
  },
}

export function getLegalDoc(kind: LegalKind, lang: Lang): LegalDoc {
  return docs[kind][lang]
}
