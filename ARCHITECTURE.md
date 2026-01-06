# Arquitectura Hexagonal (Ports & Adapters) - Guía del Proyecto

Esta guía explica cómo hemos estructurado `pdf-to-xml-converter` siguiendo los principios de la Arquitectura Hexagonal. El objetivo es desacoplar nuestra lógica de negocio (Core) de las herramientas externas (Angular, APIs, UI).

## 🟢 Círculos de la Arquitectura

Imagina la aplicación como una cebolla con capas. Las dependencias **solo pueden apuntar hacia adentro**.

### 1. Domain (`src/app/domain`) - El Corazón
Es el centro de todo. Aquí viven las reglas del negocio y los modelos de datos.
- **Regla de Oro:** NO puede depender de nada (ni de Angular, ni de HTTP, ni de librerías UI). Es TypeScript puro.
- **Tipos de archivos:**
    - `models`: Clases o Interfaces de datos (ej. `FileEntity`).
    - `ports`: Interfaces que definen *qué* necesitamos hacer, pero no *cómo* (ej. `FileRepository`).

### 2. Application (`src/app/application`) - El Cerebro
Aquí viven los "Casos de Uso". Son directores de orquesta que ejecutan acciones específicas del usuario.
- **Regla:** Solo depende de `Domain`.
- **Ejemplo:** `UploadFileUseCase` (recibe un archivo, valida usando reglas de Dominio, llama al puerto de Repositorio).

### 3. Infrastructure (`src/app/infrastructure`) - El Mundo Real
Es la capa externa. Aquí conectamos nuestra aplicación con el mundo exterior (Usuario, Servidores, Navegador).
- **Adapters (`/adapters`)**: Implementan los puertos del dominio.
    - Ej: `FileMockService` (Implementa `FileRepository` usando `setTimeout` o `HttpClient`).
- **UI (`/ui`)**: La interfaz gráfica (Angular Components).
    - La UI es un "Driving Adapter" (Adaptador Conductor) porque *conduce* o inicia la acción hacia nuestra app.

---

## 📂 Estructura de Carpetas

```text
src/app/
├── domain/                  # 🟢 CORE (Sin deps de Angular)
│   ├── models/              # (FileEntity, UploadStatus)
│   └── ports/               # (FileRepository)
│
├── application/             # 🟡 USE CASES (Lógica de aplicación)
│   └── use-cases/           # (UploadFileUseCase)
│
└── infrastructure/          # 🔴 INFRA (Angular, HTTP, UI)
    ├── adapters/            # (FileMockService)
    └── ui/                  # Componentes Visuales
        ├── layout/          # Shell (Header, Footer)
        ├── pages/           # Vistas principales
        └── components/      # Componentes reutilizables
```

## 🧩 Implementación Actual (Ejemplos)

### Domain: Entidad (`file.model.ts`)
```typescript
// Define QUÉ es un archivo en nuestro negocio
export interface FileEntity {
  id: string;
  name: string;
  status: 'IDLE' | 'UPLOADING' | 'SUCCESS';
  // ...
}
```

### Domain: Puerto (`file.repository.ts`)
```typescript
// Define CÓMO interactuamos con datos (Contrato)
// No importa si es LocalStorage, API REST o Mock.
export interface FileRepository {
  upload(file: File): Observable<FileEntity>;
}
```

### Infrastructure: Adaptador (`file-mock.service.ts`)
```typescript
// Implementación CONCRETA del Puerto
@Injectable()
export class FileMockService implements FileRepository {
  upload(file: File): Observable<FileEntity> {
    // Simula una API usando RxJS timer
    return timer(0, 300).pipe(...);
  }
}
```

## 🔄 Flujo de Datos Completo
1. **Usuario** suelta archivo en `DropZone` (Infra/UI).
2. **Componente** llama a `UploadFileUseCase.execute(file)` (Application).
3. **Use Case** llama a `this.fileRepository.upload(file)` (Domain/Port).
4. **Angular DI** inyecta `FileMockService` (Infra/Adapter) que ejecuta el código real.
