# Aplicación de visitas inmobiliarias

- [Aplicación de visitas inmobiliarias](#aplicación-de-visitas-inmobiliarias)
    - [Introducción](#introducción)
    - [PROXY](#proxy)
    - [Como desplegar el proyecto en local](#como-desplegar-el-proyecto-en-local)
    - [DESPLIEGUE FINAL](#despliegue-final)


### Introducción
Esta aplicación tiene tres partes diferenciadas:
-   **Coduct**: backend que gestiona todo el flujo de datos. [Enlace](./coduct/README.md)
-   **Viment**: es el backoffice del sistema. Ea una aplicación web que se ocupa de tener una interfaz amigable para poder crear, leer, modificar o eliminar datos. La usan los asesores inmobiliarios. [Enlace](./viment/README.md)
-   **Aparsi**: es la aplicación movil que tendrán acceso los clientes de la inmobiliaria. Permite poder acceder a los datos del propio cliente de forma sencilla y clara.

### PROXY

Para facilitar la interconexión de los distintos servicios, y evitar problemas de CORS, se ha añadido un proxy **NGYNX** que permite interconectar el backend con el frontend de manera directa, evitando que el navegador interprete los redireccionamientos que puedan generar incompatibilidades o direcciones erróneas

### Como desplegar el proyecto en local
La parte desplegable del proyecto es la parte *Coduct+Viment*, mientras que la parte movil se proporciona a través de un apk.

Debido a esto, esta sección solo se referirá a la parte *Coduct+Viment*.

Para desplegar el proyecto es necesario:
-   **Docker**: sistema de despliegue de aplicaciones en contenedores.
-   **Docker compose**: es una herramienta que permite la orquestación del despligue de aplicaciones en contenedores.

Para poder desplegarlo, asegúrese que está en la carpeta raiz del proyecto, donde se encuenta el *docker-compose.yml*, he introduzca el siguiente comando:

```
docker compose up --build
```

NOTA: Para el correcto funcionamiento de CODUCT es necesario que esté una *key-firebase.json* válida y un .env con MONGO URI de conexión.

Esto levantará el proyecto en local pudiendo utilizarlo desde la siguiente dirección: [localhost](http://localhost/)

En esa dirección podrá entrar directamente a *Viment* que conectará y hará uso de *Coduct*.

Para poder acceder las credenciales son:
```
username: root
password: root
```

Para información más detallada de cada servicio acceder a su  propio *README*.

### DESPLIEGUE FINAL

El proyecto se ha desplegado para producción de la siguiente forma:
-   **CODUCT+VIMENT**: EC2 UBUNTU AWS
    1. Primero se configura docker en el EC2.
    2. Luego se clona el repositorio en la raiz.
    3. Se pasan las claves sensibles de firebase y atlas.
        &nbsp;
        Es importante guardar la clave .pem que se genera para luego poder pasar archivos sensibles de forma encriptada como key-firebase.json o en .env (credenciales atlas database) de coduct.
        &nbsp;
        Utilizaremos el (Secure Copy Protocol) para transferirlos:
        ```
        scp -i claveaws.pem archivosensible ubuntu@<ip publica>:~/
        ```
    4. Se levantan los contenedores con docker-compose.
    5. Si se trabaja con ddns es necesario crear un archivo ejecutable sh de sincronización mediante cron (proceso que controla la programación de tareas en ubuntu) para que se ejecute y sincronice la dirección ip cada tantos minutos.
-   **Servidor de Nombres de Dominio Dinámico**: no-ip
    Una vez creada la cuenta es necesario crear el dominio y obtener las claves de autentificación para la creación del script que estará alojado en AWS.
-   **Almacenamiento en la nube**: FIREBASE STORAGE
    Es necesario obtener la clave de uso para poder utilizarlas en CODUCT. Eso permitirá subir y borrar los archivos.
-   **Gestor de base de datos + base de datos**: ATLAS DATABASE
    Hay que configurar el usuario y contraseña para poder utilizar una MONGO URI válida.
-   **Aplicación movil**: Geneador de apk con expo.
    La descripción de esta parte estará en la propio repositorio APARSI.