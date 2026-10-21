# Reto calificable · Planear en GitHub (5.0)

## Enunciado

Ya planeaste y cerraste las historias guiadas (HU-01 a HU-05). Ahora demuestra
que puedes planear **solo**, desde cero:

1. **Tu propia historia (HU-06).** En `planeacion/backlog.md` escribe una historia
   de usuario nueva para tu portafolio: *Como / quiero / para*, etiquetas,
   estimación (S, M o L) y **mínimo 3 criterios de aceptación** con el formato
   *Dado / cuando / entonces*. Debe cumplir INVEST: pequeña (máximo una sesión de
   trabajo), comprobable y con valor para quien la usa.
2. **Su issue y su tarjeta.** Crea el issue con la plantilla *Historia de usuario*,
   ponle etiquetas, asígnatelo y agrégalo al tablero. Muévelo a **In Progress**
   cuando empieces.
3. **Impleméntala** y ciérrala con un commit cuyo mensaje diga `closes #n`.
4. **Caza un bug.** Revisa tu portafolio (en el celular, los enlaces, la ortografía,
   las imágenes...) y encuentra algo que esté mal. Repórtalo con **tu** plantilla
   *Reporte de bug* (pasos, esperado, actual), etiqueta `bug`, y corrígelo con un
   commit que diga `fixes #n`. Anota el número en `ENTREGA.md`.
5. **Tablero al día.** Al final, todas tus tarjetas (6 historias + 1 bug) deben
   estar en **Done**. Haz el tablero **público** y pega su URL en `ENTREGA.md`.

## Qué entregas

- La URL de tu repositorio `mi-portafolio` (público) en el formulario de la clase.
- Dentro del repo: `ENTREGA.md` completo y el backlog con HU-06.
- Antes de entregar ejecuta `node verificar-plan.js` y revisa que todo esté en verde.

## Rúbrica (5.0)

| Criterio | Puntos | Qué se revisa |
|---|---|---|
| Historias y criterios de aceptación | 1.5 | HU-03 a HU-06 con 3+ criterios *Dado / cuando / entonces* comprobables; HU-06 propia y que cumple INVEST |
| Issues y plantillas | 1.0 | 7+ issues creados con plantilla, todos con etiqueta; plantilla de bug completa; bug bien reportado (pasos, esperado, actual) |
| Tablero en GitHub Projects | 1.0 | Tablero público con columnas Todo / In Progress / Done, las 7 tarjetas en Done, URL en `ENTREGA.md` |
| Trazabilidad commits → issues | 1.5 | Cada historia cerrada por su commit (`closes #n`), el bug con `fixes #n`, todo en `main` en GitHub |

`verificar-plan.js` da un puntaje sobre 30. Úsalo como guía: el instructor revisa
además la calidad de lo que escribiste y el tablero.
