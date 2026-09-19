# Plan de Mejora — Modalcontac.astro

## Estado: ✅ Implementado

---

## Fase 1 — Fix del flash ✅

- `pointer-events-none` en estado cerrado
- `will-change: transform` para GPU
- `translate-x-full` en SSR
- `aria-hidden="true"` en HTML inicial

## Fase 2 — UX del modal ✅

- **Body scroll lock**: `overflow-hidden` en `<body>` al abrir
- **Focus trap**: Tab cycling dentro del modal (primer → último ↔ último → primer)
- **Focus restore**: Devuelve foco al botón que abrió
- **Backdrop animado**: Div separado con opacity 0→0.2 transición
- **Close on swipe right**: Touch gesture en mobile (threshold 100px)
- **Scroll lock**: Ya no scrollea el fondo en mobile

## Fase 3 — Script limpio ✅

- ~~MutationObserver~~ eliminado
- **State machine**: `closed | open` — previene race conditions
- **IIFE**: Scope aislado, no contaminar global
- **`astro:page-load`**: Force close al navegar

## Fase 4 — Accesibilidad ✅

- `role="dialog"` y `aria-modal="true"`
- `aria-hidden` toggle
- `aria-label="Cerrar panel de contacto"` en botón cerrar
- Focus first element al abrir
- Escape para cerrar

---

## Estructura del script

```
State: closed | open

initModal()
  ├── bind openBtn → open()
  ├── bind closeBtn → close()
  ├── bind Escape + Tab → handleKeydown()
  ├── bind click outside → handleOutsideClick()
  ├── bind touch → handleTouchStart/Move/End()
  └── bind astro:page-load → close()

open()
  ├── state = open
  ├── lastFocusedElement = openBtn
  ├── modal: quitar translate-x-full, pointer-events-auto
  ├── backdrop: opacity 0→0.2
  ├── body: overflow-hidden
  └── focus first element

close()
  ├── state = closed
  ├── modal: agregar translate-x-full
  ├── backdrop: opacity → 0, pointer-events-none
  ├── body: overflow-hidden remove
  └── restore focus to lastFocusedElement
```
