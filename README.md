# Agua en seguimiento · Week 11

**Autora:** Isabella Zevada

## Página funcionando

[**Abrir Agua en seguimiento**](https://agua-en-seguimiento-isabella.isazevada.chatgpt.site)

Prototipo académico para revisar posibles fugas, asignar visitas con capacidad limitada y verificar resultados. Los hogares, sensores, técnicos y reparaciones son ficticios. No presta atención real ni envía mensajes. Los cambios duran solo mientras la pestaña permanezca abierta y sin recargar.

## Dragon Stack

- IoT/sensing: feed de lecturas simuladas, identificado en pantalla.
- ML: regresión logística real entrenada exclusivamente con datos sintéticos e inferencia en el navegador.
- Lógica de asignación de servicios: disponibilidad de técnicos ficticios y ocho cupos iniciales.

## Archivos principales

- `dist/`: página funcional y datos sintéticos.
- `docs/PACKET.md`: packet previo al código con Mermaid y mockup.
- `docs/IMPLEMENTATION_PROMPT.md`: criterios de aceptación y plan de construcción.
- `scripts/train_model.py`: entrenamiento reproducible.
- `tests/workflow.test.mjs`: pruebas de capacidad, validación y cierre.
- `docs/TEST_LOG.md` y `docs/PERSONA_FIXES.md`: registros técnicos y cambios por retroalimentación sintética. El documento de cambios no reemplaza el PDF final de persona.
- `DECISIONS.md`: decisiones y cierre de sesión.
- `SOURCE_HISTORY.md`: commits originales de desarrollo y fechas.
- `development-history.bundle`: historial Git original exportado desde el proyecto. Se incluye para conservar la evidencia; subir este archivo no agrega automáticamente esos commits al historial de GitHub.

## Ejecutar localmente

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000 --directory dist
```

Abrir `http://localhost:8000`.

## Pruebas

Con Node.js instalado:

```bash
node --test tests/workflow.test.mjs
```

Resultado de la última verificación: 14 pruebas aprobadas.

## Límites

Los resultados del modelo describen solo datos sintéticos. No prueban eficacia en hogares reales. La revisión humana y la confirmación de la familia forman parte del flujo de demostración. Las capturas de persona evalúan claridad, no prueban que funcionen las validaciones. El Blueprint final debe cotejarse antes de afirmar cumplimiento integral.
