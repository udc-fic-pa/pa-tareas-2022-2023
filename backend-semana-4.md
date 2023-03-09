# Tareas para la semana del 13 de marzo

Para completar el backend ya sólo os queda implementar la capa de Servicios REST. Para comprobar el correcto funcionamiento del backend, debéis emplear un cliente REST (e.g. Postman).

Un aspecto a tener en cuenta es que tanto espectadores como taquilleros deben poder editar la información de perfil y cambiar la contraseña. Para permitirlo, debéis cambiar ligeramente la configuración de base del control de acceso que figura en la clase `SecurtiyConfig`. Por ejemplo, asumiendo que hayáis modificado `User.RoleType` para que tenga los valores `VIEWER` y `TICKET_SELLER` (en lugar de `USER`), podéis hacer el siguiente cambio en `SecurityConfig`:

```diff
...
			.antMatchers(HttpMethod.POST, "/users/loginFromServiceToken").permitAll()
-			.antMatchers(HttpMethod.PUT, "/users/*").hasRole("USER")
-			.antMatchers(HttpMethod.POST, "/users/*/changePassword").hasRole("USER")
+			.antMatchers(HttpMethod.PUT, "/users/*").hasAnyRole("VIEWER", "TICKET_SELLER")
+			.antMatchers(HttpMethod.POST, "/users/*/changePassword").hasAnyRole("VIEWER", "TICKET_SELLER")
			.anyRequest().denyAll();
...
```

Recordad, además, añadir las reglas de control de acceso propias de vuestra práctica.