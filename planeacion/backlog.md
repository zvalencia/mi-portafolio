# Backlog de mi-portafolio

Este archivo es el **plan** del proyecto. Cada historia de usuario (HU) de aquí
se convierte en un **issue** en GitHub, se pone en el **tablero** de GitHub
Projects y se cierra con un **commit** que diga `closes #número`.

Formato de cada criterio de aceptación:

> `- [ ] Dado <contexto>, cuando <acción>, entonces <resultado esperado>.`

Cuando crees el issue en GitHub, escribe su número en la línea **Issue:**
(por ejemplo `**Issue:** #4`).

---

## HU-01 · Menú de navegación fijo  ✅ (ejemplo resuelto)

**Historia:** Como visitante del portafolio, quiero un menú fijo en la parte superior, para ir a cualquier sección sin hacer scroll.

**Etiquetas:** historia, frontend, prioridad-alta · **Estimación:** S

**Criterios de aceptación:**

- [ ] Dado que abro el portafolio, cuando miro la parte superior, entonces veo un menú con enlaces a "Sobre mí", "Proyectos" y "Contacto".
- [ ] Dado que estoy en la parte de arriba, cuando hago clic en "Proyectos", entonces la página baja hasta la sección de proyectos.
- [ ] Dado que hice scroll hasta el final, cuando miro la parte superior de la pantalla, entonces el menú sigue visible.

**Issue:** #1

---

## HU-02 · Sección de habilidades  ✅ (ejemplo resuelto)

**Historia:** Como reclutador, quiero ver las habilidades técnicas del aprendiz en una lista, para evaluar rápidamente si su perfil encaja con la vacante.

**Etiquetas:** historia, frontend · **Estimación:** S

**Criterios de aceptación:**

- [ ] Dado que abro el portafolio, cuando llego a la sección "Habilidades", entonces veo al menos 6 habilidades técnicas.
- [ ] Dado que estoy en la sección "Habilidades", cuando la leo, entonces las habilidades están agrupadas en "Frontend" y "Herramientas".
- [ ] Dado que estoy en el menú, cuando hago clic en "Habilidades", entonces la página baja hasta esa sección.

**Issue:** #2

---

## HU-03 · Pie de página con redes

**Historia:** Como visitante, quiero un pie de página con el año y los enlaces a las redes del aprendiz, para contactarlo desde cualquier parte de la página.

**Etiquetas:** historia, frontend · **Estimación:** S

**Criterios de aceptación:**

<!-- TODO: escribe mínimo 3 criterios con el formato Dado / cuando / entonces -->
- [ ] Dado que abro el portafolio, cuando llego al final de la página, entonces veo un pie de página con el año 2026 y el nombre del aprendiz.
- [ ] Dado que estoy en el pie de página, cuando reviso los enlaces sociales, entonces encuentro enlaces a las redes del aprendiz.
- [ ] Dado que hago clic en un enlace social, cuando se abre el destino, entonces puedo acceder al perfil correspondiente.

**Issue:** #3

---

## HU-04 · Enlace al repositorio en cada proyecto

**Historia:** Como reclutador, quiero que cada tarjeta de proyecto tenga un enlace a su repositorio en GitHub, para revisar el código que escribió el aprendiz.

**Etiquetas:** historia, frontend · **Estimación:** S

**Criterios de aceptación:**

<!-- TODO: escribe mínimo 3 criterios con el formato Dado / cuando / entonces.
     Pista: ¿el enlace abre en una pestaña nueva? ¿Qué texto muestra? -->
- [ ] Dado que veo las tarjetas de proyectos, cuando reviso cada tarjeta, entonces encuentro un enlace llamado "Ver código".
- [ ] Dado que hago clic en "Ver código", cuando se abre el enlace, entonces accedo al repositorio de GitHub correspondiente al proyecto.
- [ ] Dado que hago clic en "Ver código", cuando se abre el repositorio, entonces se abre en una pestaña nueva del navegador.

**Issue:** #4

---

## HU-05 · Portafolio adaptable al celular

**Historia:** Como visitante que usa el celular, quiero que el portafolio se vea bien en pantallas pequeñas, para leerlo sin hacer zoom ni scroll horizontal.

**Etiquetas:** historia, frontend, prioridad-alta · **Estimación:** M

**Criterios de aceptación:**

<!-- TODO: escribe mínimo 3 criterios con el formato Dado / cuando / entonces.
     Pista: ¿qué pasa con las 3 tarjetas en una pantalla de menos de 600 px? -->
- [ ] Dado que abro el portafolio en una pantalla de menos de 600 px, cuando veo los proyectos, entonces las tarjetas se muestran en una sola columna.
- [ ] Dado que navego por el portafolio desde el celular, cuando leo el contenido, entonces puedo hacerlo sin ampliar la página con zoom.
- [ ] Dado que abro el portafolio en una pantalla pequeña, cuando recorro la página horizontalmente, entonces el contenido no provoca desplazamiento horizontal.

**Issue:** #5

---

## HU-06 · (RETO) Escribe tu propia historia

<!-- TODO (RETO): reemplaza el título y escribe tu propia historia de usuario.
     Debe tener: Historia (Como / quiero / para), Etiquetas, Estimación,
     mínimo 3 criterios Dado / cuando / entonces y el número de su issue.
     Ideas: botón "volver arriba", modo oscuro, descargar hoja de vida,
     formulario de contacto, foto de perfil, sección de estudios. -->

**Historia:** Como reclutador, quiero consultar la formación académica del aprendiz, para conocer sus estudios y preparación.

**Etiquetas:** historia, frontend · **Estimación:** S

**Criterios de aceptación:**

- [ ] Dado que abro el portafolio, cuando busco la sección de formación académica, entonces encuentro un apartado dedicado a los estudios del aprendiz.
- [ ] Dado que estoy en la sección de formación académica, cuando reviso su contenido, entonces puedo identificar el nombre de la formación y su estado o periodo.
- [ ] Dado que navego desde el menú principal, cuando selecciono el enlace de formación académica, entonces la página me lleva a esa sección.

**Issue:** #6
