# Tareas para la semana del 17 de abril

El objetivo de esta semana es implementar la visualización de la cartelera. Este caso de uso guarda cierta similitud con el caso de uso de búsqueda de productos en pa-shop (apartado 7.2), aunque tiene diferencias significativas. En primer lugar, la pantalla principal del frontend debe mostrar la cartelera con las películas que se pueden ver hoy. En segundo lugar, la cartelera debe incluir un desplegable que permite seleccionar el día (hoy o cualquiera de los 6 siguientes días).

Para facilitar la implementación de la visualización de la cartelera, podéis descomponerla en tres tareas:

- Tarea 1: visualización de las películas que se pueden ver hoy.
- Tarea 2: añadir un componente que permite seleccionar el día.
- Tarea 3: hacer que la cartelera muestre las películas del día seleccionado.

En los siguientes apartados os guiamos en la implementación de cada una de estas tareas. Estos apartados asumen que la operación de recuperación de la cartelera en el backend recibe como entrada la fecha de la cartelera. Si se ha modelado de forma diferente (e.g. recibe un número de día en lugar de una fecha), es necesario adaptar ligeramente el código que figura en los siguientes apartados.

## Tarea 1: visualización de las películas que se pueden ver hoy

- En el módulo que contendrá los componentes relacionados con la cartelera, `catalog` de aquí en adelante, podéis añadir el componente `Billboard`. Este componente mostrará las películas de la cartelera en un día determinado (inicialmente, el día actual). En concepto, este componente es similar a `FindProductsResult` en pa-shop (apartado 7.2), aunque sin paginación. A modo de ejemplo, el componente `Billboard` podría implementarse con un estilo similar a este:

```js
import {useSelector} from 'react-redux';
import Movies from './Movies';
import * as selectors from '../selectors';

const Billboard = () => {
    const movies = useSelector(selectors.getMovies);

    return (
        <Movies movies={movies}/>
    );

}

export default Billboard;                         
```

- El código anterior asume que el selector `getMovies` devuelve las películas de la cartelera del estado de Redux del módulo `catalog`. El valor devuelto por el selector `getMovies` es un array, donde cada elemento es un objeto que contiene 3 propiedades: identificador de película, nombre de película y un array con las sesiones de esa película (cada sesión es un objeto con 2 propiedades: identificador de sesión y fecha). El código también asume que el componente `Movies` (en el mismo módulo) muestra las películas (con las horas de sus sesiones) que recibe en la propiedad `movies`.

- Para que la cartelera pueda mostrarse en la pantalla principal del frontend, es necesario modificar el componente `Home` (en `src/modules/app/components`) que incluye pa-project para que muestre el componente `Billboard`:

```diff
- import {FormattedMessage} from 'react-intl';
+ import {Billboard} from ../../catalog;

const Home = () => (
-    <div className="text-center">
-        <FormattedMessage id="project.app.Home.welcome"/>
-    </div>
+   <Billboard/>
);

export default Home;
```

- Para que el frontend  muestre inicialmente la cartelera del día de hoy, es necesario modificar el componente `App` (en `src/modules/app/components`):

```diff
...
+ import catalog from '../../catalog';
+
+ const getToday = () => {
+    const date = new Date();
+    let day = date.getDate();
+    let month = date.getMonth() + 1;
+    let year = date.getFullYear();
+    return `${year}-${month<10?`0${month}`:`${month}`}-${day<10?`0${day}`:`${day}`}`;
+}

const App = () => {

    const dispatch = useDispatch();
+   const today = getToday();

    useEffect(() => {

        dispatch(users.actions.tryLoginFromServiceToken(
            () => dispatch(users.actions.logout())));
+
+       dispatch(catalog.actions.getBillboard(today));

    });
...
```

Los cambios introducidos en el código asumen que la acción `catalog.actions.getBillboard` provoca que se realize una petición al backend para recuperar la cartelera del día solicitado y que ésta quede almacenada en el estado de Redux del módulo `catalog` (accesible mediante el selector `getMovies` de este módulo). La implementación de esta acción es parecida a la de la acción `findProducts` en pa-shop (apartado 7.2). El hook `useEffect` (apartado 7.3) provocará que esta acción se ejecute cuando se accede inicialmente a la aplicación.

Tras realizar esta tarea correctamente, la cartelera mostrará las películas que se pueden ver hoy.

## Tarea 2: añadir un componente que permite seleccionar el día

La cartelera debe incluir un desplegable que permite seleccionar el día (hoy o cualquiera de los 6 siguientes días) de las películas que muestra la cartelera. Para generar este desplegable, podéis añadir el componente `DateSelector` que os proporcionamos [aquí](DateSelector.js) al módulo `catalog` y usarlo dentro del componente `Billboard`:

```diff
import {useSelector} from 'react-redux';
import Movies from './Movies';
import * as selectors from '../selectors';
+ import DateSelector from "./DateSelector";

const Billboard = () => {
    const movies = useSelector(selectors.getMovies);

    return (
+       <div>
+           <DateSelector id="billboardDate" className="custom-select my-1 mr-sm-2"/>        
-       <Movies movies={movies}/>
+           <Movies movies={movies}/>
+       <div>
    );

}
```

Tras realizar esta tarea correctamente, la cartelera incluirá el selector de día (aunque de momento, la selección del día no tiene ningún efecto).

## Tarea 3: hacer que la cartelera muestre las películas del día seleccionado

Para hacer que la cartelera muestre las películas de la fecha seleccionada, es necesario modificar el componente `Billboard` de esta forma:

```diff
- import {useSelector} from 'react-redux';
+ import {useSelector, useDispatch} from 'react-redux';
import Movies from './Movies';
import * as selectors from '../selectors';
import DateSelector from "./DateSelector";
+ import * as actions from '../actions';

const Billboard = () => {
    const movies = useSelector(selectors.getMovies);
+   const dispatch = useDispatch();
+   const billboardDate = useSelector(selectors.getBillboardDate);

    return (
       <div>
-           <DateSelector id="billboardDate" className="custom-select my-1 mr-sm-2"/>
+           <DateSelector id="billboardDate" className="custom-select my-1 mr-sm-2"
+               value={billboardDate} onChange={e => dispatch(actions.getBillboard(e.target.value))} />
           <Movies movies={movies}/>
       <div>
    );

}
```

Los cambios introducidos en el código asumen que:

- Es necesario añadir una propiedad al estado de Redux en el módulo `catalog` para guardar la fecha seleccionada por el selector de fecha. El valor de esta propiedad se puede obtener con el selector `getBillboardDate`.

- La acción `getBillboard`, desarrollada como parte de la tarea 1, ahora también debe provocar que en el estado de Redux del módulo `catalog` quede almacenada la fecha que recibe como parámetro.

Tras realizar esta tarea correctamente, se podrá visualizar la cartelera del día seleccionado.
