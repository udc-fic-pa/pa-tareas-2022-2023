# Tareas para la semana del 20 de febrero

Después de la clase de teoría del 15 de febrero, habéis adquirido los conocimientos necesarios para realizar las 3 tareas que se especifican a continuación dentro de vuestro proyecto.

## Tarea 1: implementar las entidades de la práctica

Debéis recordar que los métodos get/set se pueden generar automáticamente desde IDEA. Como estudiaremos al final del tema 3, a diferencia de ISD, **NO** debéis redefinir `equals` y `hashCode`. Como paso previo, podéis hacer antes un diagrama UML con las entidades para tener una visión global de las relaciones entre ellas. En todo caso, nosotros no os pediremos el diagrama UML.

## Tarea 2: definir las interfaces de los DAOs de las entidades

Recordad que gracias a spring-data-jpa este paso es especialmente sencillo. En https://docs.spring.io/spring-data/jpa/docs/2.6.10/reference/html/#jpa.query-methods.query-creation, podéis consultar las palabras claves que se pueden usar en los nombres de los métodos de búsqueda (e.g. `OrderBy`, `Between`, etc.).

## Tarea 3: definir las interfaces de la capa Lógica de Negocio

Cada interfaz incluirá la firma completa de sus operaciones, con las excepciones necesarias.