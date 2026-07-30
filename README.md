# Claude Quiz Frontend

Frontend del quiz de práctica **Claude Certified Architect – Foundations (CCA-F)**.

## Stack

- React 19 + TypeScript
- Vite
- CSS moderno (sin dependencias UI extra)

## Funcionalidades

1. **Entrada con nombre** — el usuario se identifica
2. **Bienvenida** — mensaje personalizado + resumen de dominios del examen
3. **Quiz** — 10 preguntas de opción múltiple
4. **Resultados** — puntaje, feedback y revisión con explicaciones
5. **Tabla de líderes** — ranking por puntaje

## Arranque

Requiere el backend corriendo en `http://localhost:8000`.

```bash
cd claude-quiz-frontend
npm install
npm run dev
```

Abre http://localhost:5173

### Variable de entorno

Copia `.env.example` a `.env` si el API no está en el puerto por defecto:

```
VITE_API_URL=http://localhost:8000
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |

## Nota

Material de estudio **no oficial**, no afiliado a Anthropic.
