# Reto calificable — Git y GitHub I

> Haz el reto **después** de terminar la Parte A y la Parte B de la Guía de Aprendizaje.
> Esta vez no hay comandos paso a paso: tú decides qué ejecutar.

## Enunciado

Tu portafolio ya está en GitHub, pero todavía no está listo para que otra persona lo vea.
Debes dejarlo **profesional, limpio y bien documentado**:

1. **Completa la sección Proyectos** de `index.html` con **3 tarjetas** (`<article class="tarjeta">`)
   de ejercicios o proyectos que hayas hecho en el programa. Cada tarjeta lleva nombre (`<h3>`),
   descripción (`<p>`) y tecnologías (`<ul class="etiquetas">`).

2. **Escribe un `README.md`** en la raíz del proyecto. Debe tener como mínimo:
   - Un título principal con `#`.
   - Al menos **4 secciones** con `##`, por ejemplo: Descripción, Tecnologías, Cómo ver el proyecto,
     Estructura de carpetas, Autor.
   - Una **lista** (`-`), un **enlace** (`[texto](url)`) y un **bloque de código** (```` ``` ````).
   - Opcional (suma presentación): una imagen o captura del portafolio.

3. **Detective del `.gitignore`**: cuando hiciste `git add .` en la Parte A se colaron
   **dos elementos** que no deberían estar en GitHub (no son `.env`, ni `node_modules/`, ni logs).
   Encuéntralos revisando tu repositorio en GitHub (o con `git ls-files`) y pregúntate por qué no
   deberían ser públicos. Luego:
   - Agrégalos a `.gitignore`.
   - Sácalos del repositorio **sin borrarlos de tu computador** (investiga `git rm --cached`).
   - Comprueba con `git status` que Git ya no los vigila.

4. Haz **al menos 3 commits nuevos** (uno por cada punto anterior), con mensajes claros que usen
   un prefijo: `feat:` (algo nuevo), `docs:` (documentación), `chore:` (configuración/mantenimiento),
   `fix:` (corrección).

5. Sube todo con `git push` y verifica en GitHub que el README se ve como portada del repositorio.

## Qué debes entregar

En la plataforma del curso, entrega:

- El **enlace público** de tu repositorio (`https://github.com/TU-USUARIO/mi-portafolio`).
- Una **captura de pantalla** de la terminal con el resultado de `git log --oneline`.
- (Recomendado) Una captura del resultado de `node verificar.js`.

## Autoevaluación

Antes de entregar ejecuta:

```bash
node verificar.js
```

El script revisa tu repositorio y te muestra qué te falta. Es una ayuda, **no es la nota**.

## Rúbrica (5.0 puntos)

| Criterio | Puntos | Qué se revisa |
|---|---|---|
| README.md profesional | 1.5 | Título, 4+ secciones, lista, enlace y bloque de código; texto propio, claro y sin TODO. Se ve bien renderizado en GitHub. |
| Commits con buen historial | 1.5 | 3+ commits nuevos en el reto (7+ en total). Cada commit agrupa un solo cambio y su mensaje explica qué se hizo, con prefijo. |
| `.gitignore` y repositorio limpio | 1.0 | Los 2 elementos extra están en `.gitignore` y ya no aparecen en GitHub, pero siguen en el computador. `.env`, `node_modules/` y los logs nunca se subieron. |
| Repositorio publicado y completo | 1.0 | Repo público en GitHub, rama `main` al día con el trabajo local, sección Proyectos con 3 tarjetas visible. |
| **Total** | **5.0** | |
