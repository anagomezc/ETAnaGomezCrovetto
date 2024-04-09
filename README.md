# ETAnaGomezCrovetto

Evaluación Técnica de Ana Gomez Crovetto. Simulación de una aplicación e-commerce 

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas y herramientas antes de comenzar:

- Node.js (version 18.17.1) y npm (versión 9.6.7)
- Angular CLI (versión 17.0.0)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/anagomezc/ETAnaGomezCrovetto.git

2. Navega al directorio del proyecto:
    cd ETAnaGomezCrovetto

3. Instala las dependencias
    npm install

4. Ejecuta la aplicacion
    ng serve
     Navega a http://localhost:4200/ en tu navegador web para ver la aplicación.

## Uso y login de la aplicación

1. Ingresar usuario y contraseña:
Usuarios:
    - Usuario VIP: Juan, contraseña: Juan
    - Usuario comun: Lucia, contraseña: Lucia

2. Seleccionar fecha:
    Simulación de fecha para descuentos
    Fechas que tienen descuentos: 
        - 25 de Mayo del 2024
        - 9 de Julio del 2024 
    

## Comentarios

1. La consigna requería consultar tres tipos de clientes VIP: aquellos que actualmente son VIP, aquellos que se convirtieron en VIP durante un mes específico y aquellos que dejaron de ser VIP en un mes determinado.

Dado que los usuarios se autentican como clientes y no como administradores en la aplicación, no tienen acceso a la información de otros usuarios. Sin embargo, en la pantalla del perfil de cada cliente, se muestra claramente si el usuario autenticado es VIP y cuándo comenzó a serlo.


2. Los carritos de compra se almacenan en sessionStorage. Esto significa que, al cerrar la ventana y luego iniciar sesión de nuevo, el historial del carrito permanecerá intacto, incluso si se inicia sesión con diferentes credenciales.

Si deseas iniciar sesión con un usuario distinto y eliminar el historial del carrito previo, puedes hacerlo desde la pantalla del usuario utilizando el botón "Borrar Historial". Esta acción eliminará permanentemente el historial asociado con el usuario actual.

Aunque esta solución no es ideal, proporciona una manera efectiva de probar los carritos e historiales con diferentes usuarios en el entorno de desarrollo.
