# mag-prueba-tec

Prueba tecnica G. Maggioli

# Despliegue de la solucion

El proyecto se puede descomponer en 3 areas:

- Base de datos en MS SQL Server
- Backend en el framework Django (Python)
- Frontend con la libreria React (Javascript)

## Base de datos

Se realiza con una base de datos local en Microsoft SQL Server Express

Se crean dos tablas: company y employee

Una característica de Django es que trabaja con "Modelos" que mapea la informacion de las bases de datos y sus funciones mas comunes en el lenguaje de Python, de modo que se aprovecho esta herramienta para la generacion de las tablas:

```python
# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)
    num_employees = models.IntegerField(null=False, blank=False, default=0)

    def __str__(self) -> str:
        return self.name


class Employee(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False, unique=True)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, null=False, blank=False
    )
    department = models.CharField(max_length=200, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self) -> str:
        return self.name

```

Se puede observar que solamente se requiere una relacion 'one to many' de empresa a empleado. para ello se le asigna una FOREIGN KEY a la tabla Employee referenciando al empleado.
Notese tambien que una de las restricciones que se ponen para simplificar la logica es que todos los empleados deben tener empresa y si una empresa es eliminada tambien lo serán los empleados.

Para ejecutar los cambios sobre la base de datos se debe configurar en el archivo `backend\backend\settings.py`

```python
DATABASES = {
    "default": {
        "ENGINE": "mssql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        # "PORT": "1433",
        "OPTIONS": {
            "driver": "ODBC Driver 17 for SQL Server",
            "isolation_level": "READ UNCOMMITTED",  # Prevent deadlocks
        },
    },
}
```

En este caso se almacenaron los datos mas relevantes en environment variables para no exponer los datos al subir el proyecto a un repositorio publico.

Una vez hecha esta configuracion se usa el comando `python manage.py makemigrations` para cargar las nuevas tablas a la base de datos.

![database](https://ivanotes.s3.amazonaws.com/mag/db.png)

En adelante Django conectará directamente a la base de datos y podra realizar los cambios que los permisos de usuario del administrador de la base de datos lo permitan.

### OPCION POSTGRES

Dado que tengo un postgres Server en linea, para implementar una base de datos PostgreSQL en lugar de SQL Server solo basta con agregar la libreria `psycopg2` al entorno de python (Ver Dockerfile) y usar la siguiente configuracion en el archivo `backend\backend\settings.py`:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("PG_DB_NAME"),
        "USER": os.environ.get("PG_DB_USER"),
        "PASSWORD": os.environ.get("PG_DB_PASS"),
        "HOST": os.environ.get("PG_DB_HOST"),
        "PORT": os.environ.get("PG_DB_PORT"),
    }
}
```

### Primer despliegue

Durante el primer despliegue se debe ejecutar el comando `python manage.py migrate` desde el directorio `/backend` para crear las tablas en la base de datos por primera vez.

## Backend

Como se menciono anteriormente el backend se realizó con Django y REST Framework
buscando la funcionalidad ACME:Adicionar Consultar Modificar Eliminar.

En el siguiente vinculo se encuentra la documentacion generada durante las pruebas con el software POSTMAN, tambien se adjuntara como PDF a la entrega.

https://documenter.getpostman.com/view/13923274/UVkvHXu5

## Frontend

Para generar el build de produccion a partir nasta con ubicarse en el directorio `/frontend` y correr el comando `npm run build`.

Se debe tener en cuenta que se tiene configurado el directorio `/backend/front/build` para recibir los archivos frontend de produccion que el backend django pueda leer.

Esto se puede configurar en el archivo `package.json` en la linea "build":

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "set BUILD_PATH=../backend/front/build&& react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

Pagina inicial
![principal](https://ivanotes.s3.amazonaws.com/mag/01.png)
Añadir empresa
![principal](https://ivanotes.s3.amazonaws.com/mag/02.png)
Detalles de empresa + Listado de empleados de dicha empresa
![principal](https://ivanotes.s3.amazonaws.com/mag/03.png)
Editar detalles de empresa
![principal](https://ivanotes.s3.amazonaws.com/mag/04.png)
Eliminar empresa
![principal](https://ivanotes.s3.amazonaws.com/mag/05.png)

# Recursos para despliegue de la solucion

- https://docs.djangoproject.com/en/4.0/howto/deployment/
- https://create-react-app.dev/docs/production-build/
