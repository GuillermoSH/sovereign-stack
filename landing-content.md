# Landing content — estructurado desde content-notes.md

Contenido ya decidido/redactado para cada sección de la landing, listo para
implementar en `src/i18n.ts` (+ `App.tsx` donde aplique) cuando toque hacer la UI.
Fuente: `content-notes.md`. Idioma: español (fuente de verdad) — la versión EN se
traduce al cablear esto en el código.

Cada bloque lleva una etiqueta:
- **MANTENER** — el texto actual de la landing ya es correcto, no toca.
- **ACTUALIZAR** — el texto actual existe pero está desfasado o incompleto.
- **NUEVO** — contenido que no está hoy en la landing.
- **❓ DECISIÓN** — necesito que confirmes algo antes de darlo por cerrado.

No toco `Bitácora`/`updates.ts` en este documento — ver nota al final.

---

## 1. Overview / Hero

**MANTENER.** El lede y los tres stats (Dockge, Pi-hole, Tailscale) siguen siendo
ciertos y representativos. No hay cambios de fondo aquí.

## 2. Hardware

**ACTUALIZAR** — el cuerpo actual (`N5105`, `16GB`, `500GB NVMe`) es correcto, se
mantiene tal cual. Añado color opcional:

> Intel NUC11ATKC4 — N5105, 16 GB DDR4, 500 GB NVMe. Comprado de segunda mano en
> Wallapop por 80€, tras buscarlo durante tiempo — esa cantidad de RAM DDR4 sola ya
> vale más que eso. Se instaló Ubuntu Server esa misma tarde, sin darle más vueltas.

- ❓ **DECISIÓN:** ¿quieres el detalle "80€ en Wallapop" en la landing (le da carácter
  y es un dato concreto que gusta en homelabbing) o prefieres guardarlo para el blog
  y dejar el Hardware de la landing puramente técnico/neutro?
- 💥 **RESPUESTA:** no hace falta esos detalles, dejalos para el blog

**NUEVO** (opcional, para `baseOsBody` o como nota aparte):

> Se valoró Proxmox como sistema base, pero al no exponer servicios hacia el exterior
> ni necesitar virtualización pesada, Ubuntu Server sin entorno gráfico cubre de sobra
> lo que hace falta.

- ❓ **DECISIÓN:** ¿añadimos esta justificación (Proxmox descartado) o se queda para
  el blog/story? Es un dato técnico interesante pero no imprescindible en Hardware.
- 💥 **RESPUESTA:** yo lo dejaria fuera si para el blog

## 3. Stack

**ACTUALIZAR — stackIntro.** El texto actual dice "same workflow for deploys, logs,
and updates" — esto ya no es exacto: desde el cambio Portainer → Dockge se perdieron
los logs en vivo desde la UI; ahora se leen por SSH.

> Propuesta: "Todo esto son stacks de Compose en Dockge — mismo flujo para desplegar
> y actualizar. Los logs en vivo, por SSH directamente; es lo que se sacrificó al
> pasar de Portainer a algo más ligero."

**ACTUALIZAR — lista de servicios (`SERVICES` en `App.tsx`).** La lista actual (7
items) se queda corta frente a lo que realmente corre. Lista completa real:

| Servicio | Rol |
|---|---|
| Pi-hole | DNS de toda la red |
| Dockge | Gestión de stacks Compose (futuro: Dockhand) |
| Nginx Proxy Manager | Proxy inverso + TLS |
| Tailscale | Acceso remoto sin puertos públicos |
| n8n | Automatizaciones (bot Telegram, auto-updates, wake/apagado remoto) |
| Vaultwarden | Gestión de contraseñas |
| Uptime Kuma | Monitor de disponibilidad |
| Beszel | Métricas de sistema |
| RustDesk | Escritorio remoto al PC principal |
| Actual Budget | Finanzas domésticas |
| Stirling PDF | Herramientas PDF |
| ocrmypdf | OCR de PDFs |
| fail2ban | Bloqueo de intentos de acceso |
| rkhunter | Auditoría/detección de rootkits |

- ❓ **DECISIÓN:** son 14 servicios — bastantes más que los 7 actuales. Tres opciones:
  1. Meterlos todos tal cual en el grid de pills (la UI ya soporta grids largos).
  2. Agrupar por categoría (Core/Red, Automatización, Monitorización, Seguridad,
     Utilidades caseras) — más legible pero es un cambio de componente, no solo de
     datos.
  3. Dejar el grid actual como "lo esencial" y mover el resto (Actual Budget,
     Stirling PDF, ocrmypdf, RustDesk) a una lista secundaria más discreta.

  Mi recomendación: opción 2 (agrupar) — encaja con "técnico sin ser frío" y hace
  la sección más legible, pero es una decisión de UI que toca cuando lleguemos ahí,
  no ahora. Para esta fase de contenido, doy por buena la lista completa de 14 y
  decidimos agrupación al maquetar.

- 💥 **RESPUESTA:** esto creo que sera mas para la UI cuanod la hagamos pero si, creo que la de agrupar es la mejor opcion

## 4. Red

**ACTUALIZAR — networkEvolutionBody.** El texto actual ya está bien encaminado (ISP
en bridge, MikroTik hEX, VLANs, dos APs AX58) pero puede ganar precisión real:

> Propuesta: "El ISP entra en modo bridge y DMZ directo al MikroTik hEX — no
> queremos que el router del operador resuelva NAT. El descodificador de TV (canales
> de Movistar) cuelga de esa misma entrada para no depender de nuestro DNS. Detrás,
> el MikroTik reparte a dos APs TP-Link AX58 (sustituyendo un Archer C6 que aún hace
> guardia) y al NUC, todo por Cat6 salvo un tramo Cat5e superviviente a un AP en la
> otra punta de la casa. Las VLANs — separar dispositivos, red de invitados, IoT
> aislado, QoS en las principales — están planteadas pero aún no montadas."

- ❓ **DECISIÓN:** esto es más largo/técnico que el texto actual. ¿Lo prefieres así
  de detallado (encaja con "documentar estado real") o más resumido y dejamos el
  detalle de DMZ/IPTV/cableado para un post de blog sobre la red?

- 💥 **RESPUESTA:** veo el texto bien realmente no lo veo extenso

**MANTENER — networkAccessBody**, con un matiz opcional: mencionar que se evaluó
Caddy (gestiona TLS solo, pero es más "tedioso" por consola) y se prefirió NPM por
ser más visual — es un dato de criterio técnico que puede ir bien aquí o en Stack.

## 5. Operación y seguridad

Esta sección es la que más desfasada está. Propongo repartir así:

**ACTUALIZAR — opsMonitoringBody.**

> Propuesta: "Uptime Kuma avisa de caídas de servicio, Beszel de picos de uso y
> temperatura — ambos con notificación a Telegram. n8n añade una capa más:
> actualización automática de paquetes con una lista negra de servicios que no
> pueden caerse (Docker, por ejemplo), también con aviso a Telegram si algo falla."

**ACTUALIZAR — opsSecurityBody** (esta es la que tiene la info más desactualizada:
dice "planning to add fail2ban", pero ya está desplegado):

> Propuesta: "fail2ban y rkhunter llevan tiempo activos, con aviso a Telegram ante
> intentos sospechosos o hallazgos del escaneo. Hacia fuera solo hay un puerto
> abierto — el de los flujos de n8n; ni el panel de n8n ni ningún otro dashboard son
> accesibles desde fuera. Una auditoría con Lynis dio 67/100 de hardening: hay
> margen, y es el siguiente objetivo antes de tocar el puerto SSH por defecto."

**MANTENER — opsBackupsBody.** Sigue siendo cierto que no hay backups formales.
Podríamos enlazarlo con el roadmap (NAS), pero el texto actual ya lo deja abierto
correctamente.

- ❓ **DECISIÓN:** con este contenido nuevo, el ops picture crece bastante — ¿mantenemos
  las 3 cards actuales (Monitoring/Backups/Security) metiendo todo dentro, o vale la
  pena una 4ª card para Automatización (n8n + auto-updates) en vez de colarlo dentro
  de Monitoring? Otra vez es más decisión de UI que de contenido — lo dejo anotado
  para cuando maquetemos.

- 💥 **RESPUESTA:** creo que tambien es mas para UI pero al cumplic con seguridad y monitoreo realmente + control, lo dejaria en otra card si

## 6. Historia (Story)

**ACTUALIZAR — storyWhyBody.** El texto actual infravalora bastante lo que pasó.
Versión real, más rica:

> Propuesta: "El interés viene de mucho antes — ordenadores, esos servidores de
> película, y un familiar metido en el mundillo que un día me regaló un MikroTik sin
> yo tener ni idea de qué hacer con él (spoiler: la casa se quedó sin internet 2-3
> días mientras lo aprendía a base de prueba, error, IA y Reddit). Pero el primer
> uso serio en serio fue el proyecto final de DAM, **Gastromind**: desplegamos la
> app completa — Postgres, MongoDB, Redis, Spring Boot, Angular, Odoo — enteramente
> en el NUC, compartiendo una tailnet con el equipo con accesos restringidos (nada
> de SSH ni n8n para ellos). Fuimos el único grupo del ciclo que llegó a presentación
> con el stack completo desplegado de verdad. Hoy la motivación ha cambiado un poco:
> menos presión de entrega, más ganas de aprender de verdad — sigo homelabbing en
> Reddit y me persigue en TikTok."

- ❓ **DECISIÓN:** esto es sustancialmente más largo y con más "gancho" (la anécdota
  del Mikrotik, el logro de Gastromind) que el texto actual, que es una frase.
  ¿Contenido así de extenso encaja en la landing (Story ya tiene espacio de sobra en
  el bento) o prefieres la versión corta aquí y dejamos la anécdota completa para el
  primer post del blog, con solo una mención breve en la landing?

- 💥 **RESPUESTA:** a lo mejor una resumida pero que de un gancho para que vayas a leer la historia detallada no? asi llama la atencion a leerla a quien esta interesado en el contenido de la landing realmente y el que no

**NUEVO — dato para mencionar en algún sitio (Stack o Story):** la migración
Portainer → Dockge tras la entrega de Gastromind — ya está redactada en
`content-notes.md`, decide si quieres una línea sobre esto en la landing o si se
queda solo como material de blog.

## 7. Roadmap

**ACTUALIZAR — roadmapBody.** El texto actual menciona "Dell gear para k3s o
Kubernetes" de forma genérica. Versión más fiel a lo que cuentas:

> Propuesta: "Primer paso: separar el DNS a su propio dispositivo. Después, montar
> un clúster real de Kubernetes (no k3s — en un solo dispositivo no tiene sentido)
> con SFF baratos de Wallapop (ThinkCentre, OptiPlex...) — cada vez más difíciles de
> encontrar a buen precio, pero se sigue mirando. En paralelo: un NAS, que cubra
> backups (hoy inexistentes) y servicios multimedia — se acabó ver Netflix a 720p —
> y un SAI/UPS con NUT para apagados controlados ante cortes de luz."

- ❓ **DECISIÓN:** ¿mantenemos la opinión explícita "no k3s, es el mismo dispositivo
  realmente" tal cual (tiene voz propia, muy tuya) o la suavizamos a algo más neutro
  tipo "Kubernetes completo en vez de una distribución ligera"?

- 💥 **RESPUESTA:** podriamos dejarlo con la opinion explicita, me gustaria que fuese personal la pagina asi como mas cercana la redaccion

---

## Copy final — listo para wiring en `i18n.ts` / `App.tsx`

Con las 7 decisiones cerradas, esto es el copy definitivo en español. Se traduce a
inglés al implementarlo. Solo se listan las claves que cambian; todo lo no listado
aquí (`hwBody`, `baseOsBody`, `networkAccessBody`, `opsBackupsBody`, hero/stats) se
queda tal cual está hoy en el código.

**`stackIntro`**
> Todo esto son stacks de Compose en Dockge — mismo flujo para desplegar y
> actualizar. Los logs en vivo, por SSH directamente: es lo que se sacrificó al
> pasar de Portainer a algo más ligero.

**`SERVICES`** (reemplaza el array de 7 en `App.tsx`, orden provisional — la
agrupación visual por categoría se decide al maquetar):
Pi-hole, Dockge, Nginx Proxy Manager, Tailscale, n8n, Vaultwarden, Uptime Kuma,
Beszel, RustDesk, Actual Budget, Stirling PDF, ocrmypdf, fail2ban, rkhunter

**`networkEvolutionBody`**
> El ISP entra en modo bridge y DMZ directo al MikroTik hEX — no queremos que el
> router del operador resuelva NAT. El descodificador de TV (canales de Movistar)
> cuelga de esa misma entrada para no depender de nuestro DNS. Detrás, el MikroTik
> reparte a dos APs TP-Link AX58 (sustituyendo un Archer C6 que aún hace guardia) y
> al NUC, todo por Cat6 salvo un tramo Cat5e superviviente a un AP en la otra punta
> de la casa. Las VLANs — separar dispositivos, red de invitados, IoT aislado, QoS
> en las principales — están planteadas pero aún no montadas.

**`opsMonitoringBody`** (recortado — la automatización se va a su propia card)
> Uptime Kuma avisa de caídas de servicio; Beszel, de picos de uso y temperatura.
> Ambos notifican por Telegram.

**NUEVO — `opsAutomationTitle` / `opsAutomationBody`** (4ª card en la grid de ops):
> Automatización — n8n mantiene los paquetes al día con actualizaciones automáticas
> y una lista negra de servicios que no pueden caerse (Docker, por ejemplo), con
> aviso a Telegram si algo falla.

**`opsSecurityBody`**
> fail2ban y rkhunter llevan tiempo activos, con aviso a Telegram ante intentos
> sospechosos o hallazgos del escaneo. Hacia fuera solo hay un puerto abierto — el
> de los flujos de n8n; ni su panel ni ningún otro dashboard son accesibles desde
> fuera. Una auditoría con Lynis dio 67/100 de hardening: hay margen, y es el
> siguiente objetivo antes de tocar el puerto SSH por defecto.

**`storyWhyBody`** (versión corta, gancho hacia el blog)
> El gusanillo viene de familia — un familiar del mundillo me regaló un MikroTik
> sin que yo tuviera ni idea de qué hacer con él, y sí, la casa se quedó sin
> internet un par de días mientras lo aprendía a base de prueba y error. Lo serio
> llegó con el proyecto final de DAM, **Gastromind**: fuimos el único equipo del
> ciclo que llegó a presentación con el stack completo desplegado de verdad, no una
> maqueta. *Historia completa — con apagón de internet incluido — próximamente en
> el blog.*

**`roadmapBody`**
> Primer paso: separar el DNS a su propio dispositivo. Después, un clúster real de
> Kubernetes — nada de k3s, en un solo dispositivo no tiene sentido — con SFF
> baratos de Wallapop (ThinkCentre, OptiPlex...), cada vez más difíciles de
> encontrar a buen precio. En paralelo: un NAS para backups (hoy inexistentes) y
> servicios multimedia — se acabó ver Netflix a 720p — y un SAI/UPS con NUT para
> apagados controlados ante cortes de luz.

### Implicaciones para la UI (anotadas, no implementadas aún)

- `bento--ops` pasa de 3 a 4 cards — el grid actual es `repeat(3, minmax(0,1fr))`,
  habrá que revisarlo (¿2x2? ¿4 en fila en desktop?).
- El grid de `SERVICES` pasa de 7 a 14 pills — decidir si se agrupan por categoría
  (opción elegida) o se quedan en grid plano por ahora y se agrupa en una iteración
  visual posterior.
- `storyWhyBody` corto necesita, cuando exista el blog, un enlace real donde hoy
  dice "próximamente en el blog" — de momento queda como texto, sin link roto.

---

## Nota sobre Bitácora / blog

No he tocado `src/updates.ts` aquí porque, según `design.md` §6, esa sección tiene
vocación de mudarse al blog. Dos cosas quedan pendientes de decidir aparte (no ahora):

- La entrada marcada `mock` sobre la red ya podría sustituirse por contenido real
  con lo que hay en `content-notes.md` (aunque las VLANs sigan sin montar, se puede
  escribir el WIP real en vez del mock).
- Todo lo demás (NUC, Mikrotik, Gastromind, Portainer→Dockge, hardening) es más
  material de blog que de landing — grande para una card de bitácora, perfecto para
  posts largos.

---

**Siguiente paso:** revisa las `❓ DECISIÓN` (son 7) — con eso cerrado, este documento
queda como copy final en español, lo traducimos a inglés y lo metemos en
`src/i18n.ts` / `App.tsx` para empezar la UI.
