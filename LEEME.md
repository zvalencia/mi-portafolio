# Git y GitHub II · Planear en GitHub

Kit de la actividad para tu repositorio **mi-portafolio**.

## ¿Qué trae este kit?

| Archivo / carpeta | Para qué sirve |
|---|---|
| `.github/ISSUE_TEMPLATE/historia-de-usuario.md` | Plantilla de issue para historias de usuario (ya está lista, es el ejemplo) |
| `.github/ISSUE_TEMPLATE/reporte-de-bug.md` | Plantilla de issue para errores (**la completas tú**) |
| `planeacion/backlog.md` | El plan: 6 historias de usuario. HU-01 y HU-02 están resueltas como ejemplo |
| `planeacion/etiquetas.md` | Las etiquetas (labels) que debes crear en GitHub |
| `ENTREGA.md` | Tus datos y la URL de tu tablero |
| `RETO.md` | Enunciado del reto y rúbrica |
| `verificar-plan.js` | Autoevaluación: `node verificar-plan.js` |
| `base-portafolio/` | Solo si **no** tienes tu repo de la clase anterior |

> La carpeta `.github` empieza con punto y queda oculta.
> En macOS: `Cmd + Shift + .` en Finder. En Windows: Vista → Elementos ocultos.
> En VS Code siempre se ve.

## Opción 1 · Ya tengo mi repo `mi-portafolio` (lo normal)

Copia a la **raíz** de tu repo (donde está `index.html`) estas piezas:
`.github/`, `planeacion/`, `ENTREGA.md`, `RETO.md` y `verificar-plan.js`.
**No** copies `base-portafolio/`.

```bash
git add .
git commit -m "chore: agrega kit de planeación"
git push
```

## Opción 2 · No tengo el repo de la clase anterior

1. Crea una carpeta `mi-portafolio` y copia dentro **el contenido** de `base-portafolio/`
   (incluido `.gitignore`) y además las piezas de la opción 1.
2. Publica el repo como en Git y GitHub I:

```bash
git init
git add .
git commit -m "feat: portafolio base y kit de planeación"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mi-portafolio.git
git push -u origin main
```

## Importante

- El repositorio debe ser **público** y la rama principal debe ser `main`.
- Los commits cierran issues **solo cuando llegan a `main` en GitHub** (después del `git push`).
