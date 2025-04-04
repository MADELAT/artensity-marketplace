# ArTendency Marketplace - Estado del Proyecto

## Estructura de la Base de Datos

### Tablas Principales
1. **profiles**
   - Gestión de usuarios (artistas, galerías, coleccionistas, administradores)
   - Información personal y de contacto
   - Roles y permisos

2. **artworks**
   - Catálogo de obras de arte
   - Información detallada de cada obra
   - Estado y visibilidad

3. **categories**
   - Categorías de arte
   - Organización jerárquica
   - Filtrado y búsqueda

4. **art_styles**
   - Estilos artísticos
   - Clasificación de obras
   - Filtrado avanzado

5. **techniques**
   - Técnicas artísticas
   - Asociación con obras
   - Búsqueda especializada

6. **materials**
   - Materiales utilizados
   - Relación con obras
   - Filtrado por material

7. **locations**
   - Ubicaciones geográficas
   - Integración con PostGIS
   - Búsqueda por proximidad

8. **tags**
   - Etiquetas flexibles
   - Categorización dinámica
   - Búsqueda semántica

### Sistema de Mensajería
1. **conversations**
   - Gestión de conversaciones
   - Agrupación de mensajes
   - Vinculación con obras

2. **messages**
   - Mensajes individuales
   - Soporte para archivos adjuntos
   - Estado de lectura

3. **conversation_participants**
   - Gestión de participantes
   - Roles y permisos
   - Estado de lectura

### Sistema de Notificaciones
1. **notifications**
   - Notificaciones personalizadas
   - Diferentes tipos de alertas
   - Estado de lectura

2. **notification_preferences**
   - Preferencias de usuario
   - Configuración por tipo
   - Canales de notificación

### Sistema de Seguimiento
1. **follows**
   - Relaciones de seguimiento
   - Conexiones entre usuarios
   - Contadores automáticos

2. **follow_counts**
   - Estadísticas de seguimiento
   - Actualización automática
   - Rendimiento optimizado

### Sistema de Valoraciones
1. **reviews**
   - Reseñas de obras
   - Calificaciones
   - Comentarios verificados

2. **review_likes**
   - Interacción con reseñas
   - Contadores automáticos
   - Validación de usuarios

## Características Implementadas

### Filtrado y Búsqueda
- Filtrado por categorías
- Búsqueda por estilo y técnica
- Filtrado por material
- Búsqueda geográfica
- Etiquetado avanzado

### Interacción Social
- Sistema de seguimiento
- Valoraciones y reseñas
- Mensajería interna
- Notificaciones personalizadas

### Gestión de Contenido
- Categorización jerárquica
- Etiquetado flexible
- Metadatos extensibles
- Control de versiones

## Próximos Pasos
1. Implementar sistema de pedidos y pagos
2. Desarrollar sistema de comisiones
3. Crear sistema de eventos y ferias
4. Implementar analíticas avanzadas
5. Desarrollar API pública

## Notas Técnicas
- Base de datos: PostgreSQL con PostGIS
- Autenticación: Supabase Auth
- Almacenamiento: Supabase Storage
- API: RESTful con Supabase
- Frontend: React con TypeScript

## Versión Actual
- Versión: 0.1.0
- Última actualización: [Fecha actual]
- Estado: Desarrollo activo 

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

import './Artworks.css'; // Asegúrate de que la ruta sea correcta 