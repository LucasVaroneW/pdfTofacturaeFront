# Roadmap: PDF to XML Converter (Angular + Signals)

## Fase 1: Configuración e Infraestructura 🟢 (Completado)
- [x] Inicializar proyecto Angular (Standalone)
- [x] Configurar Tailwind CSS y Fuentes (Inter)
- [x] Configurar Docker & Nginx
- [x] Documentar Arquitectura Hexagonal (`ARCHITECTURE.md`)
- [x] Estructurar Carpetas (Domain, Application, Infrastructure)

## Fase 2: Maquetación Visual (Infrastructure/UI) 🟢 (Completado)
- [x] Implementar Layout (Header, Footer en `infra/ui/layout`)
- [x] Componente `CookieBanner` (Signals)
- [x] Componente `FaqSection` (Static content)
- [x] Pagina Home y Estructura `DropZone`

## Fase 3: Lógica y Dominio (Hexagonal) 🟢 (Completado)
- [x] Definir Entidades de Dominio (`FileModel`)
- [x] Definir Puertos (`FileRepository`)
- [x] Implementar Casos de Uso (`UploadFileUseCase`)
- [x] Implementar Adaptadores (`FileMockService`)

## Fase 4: Integración y UX 🟢 (Completado)
- [x] Conectar Lógica Drag & Drop (`DropZone` -> `UseCase`)
- [x] Visualizar Progreso y Estado (Loading/Success/Error)
- [x] Implementar `ToastService` (Notificaciones)

## Fase 5: Internacionalización (i18n) ⚪ (Pendiente)
- [ ] Crear Diccionarios JSON (Español por defecto)
- [ ] Implementar `I18nService` con Signals
- [ ] Implementar `TranslatePipe` puro
- [ ] Agregar Selector de Idioma (Flag Switcher)

## Fase 6: Autenticación y Sesión (Google & Custom) 🆕
- [ ] Definir Entidades de Auth (`UserEntity`) y Puertos (`AuthRepository`)
- [ ] Implementar Login Social (Google Auth Adapter)
- [ ] Implementar Login Propio (Email/Password JWT)
- [ ] Guardas de Seguridad (AuthGuard)
- [ ] **Manejo de Sesión Persistente:** Implementar lógica de "Recordar sesión" con Tokens (ver `SESSION_MECHANISM.md`).

## Fase 7: Monetización y Reglas de Negocio 🆕
- [ ] Definir Entidades de Plan (`PlanEntity`)
- [ ] Implementar caso de uso `CheckUserQuotaUseCase` (Limitar 1 doc gratis)
- [ ] Implementar Mock de Planes y Pasarela de Pago
- [ ] UI: Modal de "Límite Alcanzado" y Tabla de Precios

## Fase 8: Producción y "Ultra Seguridad" 🆕
- [ ] Auditoría Estricta de `.gitignore` (Secretos, logs, .env)
- [ ] Auditoría de Variables de Entorno (Separación Build/Run)
- [ ] Hardening de Nginx (Headers: HSTS, CSP, X-Frame-Options)
- [ ] Sanitización de Inputs (Evitar XSS en nombres de archivos)
- [ ] Build Optimizada con Gzip/Brotli
