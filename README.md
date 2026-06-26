# Sistema de Inventario

Prueba técnica desarrollada con Laravel 11, Angular 19 y MongoDB Atlas.

## Tecnologías Utilizadas

### Backend
- PHP 8.2
- Laravel 11
- MongoDB Atlas

### Frontend
- Angular 19
- TypeScript 5

## Requisitos

- PHP 8.2+
- Composer 2.x
- Node.js 22+
- Angular CLI 19

## Capturas del Sistema

### Inicio de sesión
<img width="1893" height="894" alt="image" src="https://github.com/user-attachments/assets/adc8f698-0130-4179-854d-ef986ca439c7" />


### Gestión de Productos
<img width="1919" height="898" alt="image" src="https://github.com/user-attachments/assets/f1f3ae57-f806-4208-a0ba-df8e66772128" />


### Gestión de Usuarios
<img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/9aa402e2-ab93-4bfe-bf91-4fb9a11e21c2" />


### Gestión de Perfiles
<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/444dfb06-0493-44b3-96b2-2fd18d879db9" />

---

## Documentación de la colección de Postman
La colección de Postman se encuentra organizada por carpetas para facilitar la navegación y las pruebas de la API:

- Authentication
- Users
- Products
- Profiles
- Sections

La carpeta Authentication contiene el endpoint Login, el cual debe ejecutarse primero para obtener el token de autenticación.

Una vez obtenido el token, este debe agregarse en la pestaña Authorization de las demás peticiones utilizando el tipo Bearer Token, ya que todos los endpoints protegidos requieren un usuario autenticado.

<img width="719" height="279" alt="image" src="https://github.com/user-attachments/assets/4b28260f-d224-42de-b5ec-343dabcd8c81" />


La carpeta Sections únicamente contiene la consulta para obtener las secciones disponibles del sistema, mientras que las carpetas Users, Products y Profiles incluyen las operaciones CRUD correspondientes.

Credenciales de prueba

Correo:
luigi@test.com

Contraseña:
clave123456
