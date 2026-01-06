# Contrato Frontend-Backend (Requerimientos)

Este documento detalla los endpoints y comportamientos que el Frontend Angular necesita del Backend para funcionar completamente, cubriendo autenticación, monetización y conversión.

## 1. Conversión de Archivos (Core)
Lo único que existe actualmente.

### `POST /api/converter/pdf-to-xml`
*   **Request:** `FormData` con archivo `file` (PDF).
*   **Validación:**
    *   Si usuario es **Guest**: Rechazar si ya convirtió 1 archivo hoy (cookies/IP).
    *   Si usuario es **Free/Pro**: Verificar cuota en BD.
*   **Response:**
    *   `200 OK`: `{ "xml": "...", "filename": "...", "quotaRemaining": 4 }`
    *   `402 Payment Required`: `{ "error": "PLAN_LIMIT_EXCEEDED", "message": "Upgrade your plan" }`

---

## 2. Autenticación y Sesión
Necesario para la Fase 6.

### `POST /api/auth/google`
*   **Request:** `{ "idToken": "..." }` (Token recibido de Google en el front).
*   **Comportamiento:** Valida token con Google, busca/crea usuario en BD.
*   **Response:**
    *   Body: `{ "user": { ... }, "accessToken": "eyJ..." }`
    *   **Cookie:** `refreshToken` (HttpOnly, Secure, SameSite=Strict).

### `POST /api/auth/login` (Propio)
*   **Request:** `{ "email": "...", "password": "..." }`
*   **Response:** Igual que Google (Body + Cookie).

### `POST /api/auth/refresh` (Mecanismo "Remember Me")
*   **Request:** Vacío (La cookie viaja sola).
*   **Response:** Nuevo `accessToken`.

### `POST /api/auth/logout`
*   **Comportamiento:** Invalida el Refresh Token en BD y **borra la cookie**.

---

## 3. Usuario y Monetización
Necesario para la Fase 7.

### `GET /api/user/me`
*   **Header:** `Authorization: Bearer <accessToken>`
*   **Response:**
    ```json
    {
      "id": "123",
      "email": "lucas@example.com",
      "plan": "FREE", // 'GUEST', 'FREE', 'PRO'
      "quota": {
        "used": 1,
        "total": 5,
        "resetAt": "2023-12-01T00:00:00Z"
      }
    }
    ```

### `GET /api/plans`
*   **Response:** Lista de planes para mostrar en la tabla de precios.
    ```json
    [
      { "id": "pro_monthly", "name": "Pro", "price": 9.99, "limit": 100 },
      { "id": "enterprise", "name": "Ent", "price": 49.99, "limit": -1 }
    ]
    ```

---

## 4. Requerimientos de Seguridad (Crucial)
*   **CORS:** Solo permitir origen del dominio de producción.
*   **Rate Limiting:** IP Throttling para evitar DOS en el endpoint de conversión.
*   **Input Sanitization:** El XML devuelto no debe contener scripts inyectados.
