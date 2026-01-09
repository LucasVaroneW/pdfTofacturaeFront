# Mecanismo de Sesión Persistente ("Remember Me")

Este documento explica cómo lograr que un usuario no tenga que loguearse cada vez que abre la página, manteniendo la seguridad.

## El Problema
Por defecto, si guardamos el token en memoria (variable JavaScript), al recargar la página se pierde. Si lo guardamos en `localStorage`, es vulnerable a ataques XSS (robo de token).

## La Solución Segura: Refresh Tokens

Usaremos un sistema de doble token: **Access Token** (vida corta) y **Refresh Token** (vida larga).

### 1. El Flujo de Login
Cuando el usuario se loguea (Google o Email):
1.  El Backend genera dos tokens:
    *   `Access Token`: Dura 15 minutos. Se envía en el cuerpo de la respuesta JSON.
    *   `Refresh Token`: Dura 7-30 días. Se envía en una **Cookie HttpOnly, Secure, SameSite**.
2.  El Frontend guarda el `Access Token` en MEMORIA (Signal o Servicio). *No en LocalStorage*.

### 2. Al Recargar la Página (El "Truco")
Cuando el usuario abre la app de nuevo:
1.  El `AuthService` se inicializa y ve que no tiene `Access Token` en memoria.
2.  Automáticamente (en el `APP_INITIALIZER` de Angular) hace una petición al endpoint `/api/auth/refresh`.
3.  El navegador envía automáticamente la cookie `Refresh Token` (porque es HttpOnly).
4.  El Backend valida la cookie y, si es válida, devuelve un nuevo `Access Token` y los datos del usuario.
5.  El usuario ve su sesión iniciada instantáneamente.

### 3. Ventajas de Seguridad
*   **Anti-XSS:** Si un hacker inyecta JS malicioso, no puede leer el `Access Token` (porque está en memoria y es difícil de acceder) ni el `Refresh Token` (porque la cookie es HttpOnly y JS no puede leerla).
*   **Revocación:** El backend puede invalidar la cookie `Refresh Token` si detecta robo, cerrando la sesión remotamente.

### Implementación en Angular (Hexagonal)

En nuestra capa de Infraestructura (`AuthApiAdapter`):

```typescript
// Al iniciar la app
checkSession(): Observable<User | null> {
  return this.http.post<AuthResponse>('/refresh-token', {}).pipe(
    tap(response => this.accessToken.set(response.token)), // Guardar en memoria
    map(response => response.user),
    catchError(() => of(null)) // Si falla, no hay sesión
  );
}
```
