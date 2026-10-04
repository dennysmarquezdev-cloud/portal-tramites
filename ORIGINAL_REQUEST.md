# Original User Request

## Initial Request — 2026-08-06T20:33:59Z

Refactorizar el módulo de "Usuarios / Clientes" (y el resto de componentes relacionados) en el Admin Dashboard para asegurar que la interfaz sea completamente accesible, responsiva, y solucione cualquier desacople visual en el diseño (alineación, padding, márgenes).

Working directory: d:\proyecto_abril\portal-tramites
Integrity mode: development

## Requirements

### R1. Refactorización de Diseño Responsive
Estandarizar y corregir el diseño del módulo "Usuarios / Clientes" (`CompradoresPage`) para que no se rompa ni se desacople del diseño general del sistema (por ejemplo, alineación al resto de módulos como `OverviewPage` y `TramitesPage`). 

### R2. Accesibilidad Técnica Profunda
Implementar accesibilidad avanzada a nivel técnico en la vista de administradores: etiquetas ARIA correspondientes, atributos role, y soporte de navegación por teclado para modales, tablas y botones.

## Acceptance Criteria

### Verificación Automatizada (axe-core / DOM)
- [ ] No existen violaciones críticas de contraste de color.
- [ ] Todos los botones de iconos y campos de entrada de formularios (especialmente en los modales de creación) tienen `aria-label` o `aria-labelledby`.
- [ ] Los modales controlan el foco del teclado correctamente al abrirse y permiten cerrarse con la tecla ESC.

### Verificación Manual por Agente Juez
- [ ] Un agente inspector verifica que los anchos máximos (`maxWidth`) y márgenes (paddings) en `CompradoresPage` sean consistentes con `OverviewPage`.
