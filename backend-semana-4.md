# Tareas para la semana del 13 de marzo

Para completar el backend ya sólo os queda implementar la capa de Servicios REST. Para comprobar el correcto funcionamiento del backend, debéis emplear un cliente REST (e.g. Postman).

A continuación se comentan algunos aspectos concretos a tener en cuenta.

## Control de acceso

Un aspecto a tener en cuenta es que tanto espectadores como taquilleros deben poder editar la información de perfil y cambiar la contraseña. Para permitirlo, debéis cambiar ligeramente la configuración de base del control de acceso que figura en la clase `SecurityConfig`. Por ejemplo, asumiendo que hayáis modificado `User.RoleType` para que tenga los valores `VIEWER` y `TICKET_SELLER` (en lugar de `USER`), podéis hacer el siguiente cambio en `SecurityConfig`:

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

## Parámetros LocalDate en métodos de controladores

Los grupos que hayáis diseñado el backend para que la recuperación de la cartelera sea con una petición del estilo  `GET /catalog/billboard?date=2023-03-20`, podéis hacer que el método del controlador que procese esta petición declare el parámetro `date` de la siguiente manera: 

```java
@RestController
@RequestMapping("/catalog")
public class CatalogController {

	...

    @GetMapping("/billboard")
    public ... getBillboard(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) throws ... {
        ...
    }

	...

}	
```

La anotación `@DateTimeFormat` sobre el parámetro `date` provocará que el valor del parámetro HTTP `date` se convierta automáticamente a una instancia de `LocalDate`.
