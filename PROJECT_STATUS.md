
# 🎨 ArTendency Marketplace — Estado del Proyecto
### 🗓 Última actualización: 04-Abr-2025

---

## ✅ Estado General

- 🔧 Proyecto en desarrollo activo
- 🎯 Objetivo actual: MVP funcional con Supabase, frontend en React/Next y backend conectado
- 🧠 Desarrollo guiado por AI con Lovable y Cursor 

---

## 🛠️ Tareas Recientes Completadas

| Fecha       | Descripción                                                                 |
|-------------|------------------------------------------------------------------------------|
| 04-Abr-2025 | Refactor del `Header.tsx` con clases condicionales y efecto scroll          |
| 04-Abr-2025 | Eliminación de `bun.lockb` y resolución de conflicto de ramas               |
| 04-Abr-2025 | Configuración SSH con Git + rutina diaria en Cursor                         |
| 03-Abr-2025 | Creación inicial de la estructura de base de datos en Supabase              |

---

## 🔜 Próximos Pasos

### 🔥 Prioridad Alta — MVP y experiencia visual

- [ ] Ajustar páginas `artists`, `artworks` y `galeries`:
  - Hero con imagen de obra artística y aforismo temático
  - Diseño visual basado en [Artsy Collect](https://www.artsy.net/collect) y [Artsy Artists](https://www.artsy.net/artists)
  - Filtros completos y funcionales + imágenes de demo

- [ ] Mejorar y desarrollar dashboards personalizados:
  - Dashboard de artista
  - Dashboard de galería
  - Dashboard de administración

- [ ] Implementar sistema de pedidos y pagos (Stripe o Supabase Functions)
- [ ] Crear sistema de perfiles con roles y panel de administración
- [ ] Añadir lógica de roles y permisos (RBAC)
- [ ] Desarrollar sistema de comisiones por ventas
- [ ] Sistema de favoritos (obras guardadas por coleccionistas)
- [ ] Integrar galería dinámica desde Supabase (para `artworks`)

---

### ⚙️ Backend y escalabilidad

- [ ] Desarrollar API pública (con autenticación y rate limiting)
- [ ] Implementar sistema de analíticas (vistas, actividad, ventas, tráfico)

---

### 🌐 Comunidad y experiencia extendida

- [ ] Crear sistema de eventos y ferias virtuales
- [ ] Sistema de verificación para artistas y galerías
- [ ] Modo de curaduría (obras destacadas por admins)

---

## 🧠 Notas Técnicas

- **Base de datos**: PostgreSQL con PostGIS
- **Autenticación**: Supabase Auth
- **Almacenamiento**: Supabase Storage
- **API**: RESTful con Supabase
- **Frontend**: React con TypeScript
- **Versionado**: Git con conexión SSH (`Push automático Lovable` activo)
- **Flujo Git en Cursor**:
  ```bash
  git pull --rebase origin main
  git add .
  git commit -m "mensaje"
  git push origin main
  ```

---

## 🧩 Estructura de la Base de Datos

### Tablas Principales
1. **profiles** – Gestión de usuarios (artistas, galerías, coleccionistas, administradores)
2. **artworks** – Catálogo de obras de arte
3. **categories** – Categorías de arte
4. **art_styles** – Estilos artísticos
5. **techniques** – Técnicas artísticas
6. **materials** – Materiales utilizados
7. **locations** – Ubicaciones geográficas (con PostGIS)
8. **tags** – Etiquetas flexibles

### Sistema de Mensajería
- **conversations**, **messages**, **conversation_participants**

### Sistema de Notificaciones
- **notifications**, **notification_preferences**

### Sistema de Seguimiento
- **follows**, **follow_counts**

### Sistema de Valoraciones
- **reviews**, **review_likes**

---

## 🎯 Características Implementadas

### Filtrado y Búsqueda
- Categorías, estilo, técnica, material, ubicación y etiquetas

### Interacción Social
- Seguimiento, valoraciones, mensajería, notificaciones

### Gestión de Contenido
- Categorización, etiquetas, metadatos, versiones

---

## 💻 Código y Estilos Actuales

```css
.hero {
    position: relative;
    text-align: center;
}

.hero img {
    width: 100%;
    height: auto;
}

.quote {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
}

.artworks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
}

.artwork-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
}

.artwork-card img {
    width: 100%;
    height: auto;
}
```

```ts
import './Artworks.css'; // Asegúrate de que la ruta sea correcta
```

---

## 🔗 Repositorio

[https://github.com/MADELAT/artensity-marketplace](https://github.com/MADELAT/artensity-marketplace)
