# PDF to XML Converter (Frontend)

Una aplicación web moderna "Single Page Application" (SPA) diseñada para convertir facturas PDF a XML de forma segura y eficiente. Construida con los estándares más recientes de Angular y siguiendo una arquitectura hexagonal estricta.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-v18-dd0031.svg)
![Architecture](https://img.shields.io/badge/Architecture-Hexagonal-orange.svg)
![Style](https://img.shields.io/badge/Style-Swiss_Design-059669.svg)

---

## 🚀 Características Principales

*   **Arquitectura Hexagonal:** Desacoplamiento total entre lógica de negocio (Dominio) e infraestructura (Angular/UI).
*   **Diseño Suizo (Swiss Design):** Interfaz minimalista, limpia y tipografía sans-serif (Inter) con énfasis en el espacio negativo.
*   **Reactividad con Signals:** Gestión de estado moderna y eficiente sin la complejidad de RxJS para la vista.
*   **Infraestructura Robusta:** Configuración lista para producción con Docker Multi-stage y Nginx.
*   **Simulación de API:** Adaptadores de infraestructura que simulan comportamiento de red real (latencia, errores).

## 🛠️ Stack Tecnológico

*   **Framework:** Angular 18 (Standalone Components).
*   **Lenguaje:** TypeScript (Strict Mode).
*   **Estilos:** Tailwind CSS (Configuración personalizada).
*   **Empaquetado:** Docker + Nginx (Alpine Linux).

## 📂 Estructura del Proyecto

El proyecto sigue una estructura de carpetas basada en capas de responsabilidad:

```text
src/app/
├── domain/                  # 🟢 CORE: Reglas de negocio puras (Entidades, Puertos).
│   ├── models/              # (FileEntity, UploadStatus)
│   └── ports/               # (FileRepository Interface)
│
├── application/             # 🟡 USE CASES: Orquestación de lógica.
│   └── use-cases/           # (UploadFileUseCase)
│
└── infrastructure/          # 🔴 INFRA: Angular, UI, Adaptadores.
    ├── adapters/            # (FileMockService - Implementación del Puerto)
    └── ui/                  # Componentes Visuales (Layout, Pages, Components)
```

Para una guía detallada sobre la arquitectura, consulta [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🏃‍♂️ Cómo Ejecutar

### Opción A: Docker (Recomendado)

Levanta toda la aplicación contenerizada con un solo comando.

```bash
docker-compose up --build
```
La aplicación estará disponible en: [http://localhost:8080](http://localhost:8080)

### Opción B: Desarrollo Local

1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Iniciar servidor de desarrollo:
    ```bash
    ng serve
    ```
    La aplicación estará disponible en: [http://localhost:4200](http://localhost:4200)

## 🗺️ Roadmap y Progreso

El desarrollo se gestiona a través del archivo [GUIDE.md](./GUIDE.md), donde marcamos el progreso por fases.

*   **Fase 1:** Infraestructura 🟢 (Completado)
*   **Fase 2:** Maquetación Visual 🟢 (Completado)
*   **Fase 3:** Lógica y Dominio 🟢 (Completado)
*   **Fase 4:** Refinamiento y UX ⚪ (Pendiente)

## 🤝 Contribuir

Las PRs son bienvenidas. Por favor asegúrate de seguir los principios de la arquitectura hexagonal: **La capa de dominio nunca debe importar nada de infraestructura o angular.**
