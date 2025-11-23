
# ESTRELLA G&C - Tienda en línea

Este es el sitio web de la tienda ESTRELLA G&C, una tienda en línea de abarrotes y productos diversos con panel de administración.

## Características

- Catálogo de productos organizado por categorías
- Carrito de compras con almacenamiento local
- Base de datos en tiempo real con Firebase
- Panel de administración para gestionar productos y pedidos
- Diseño completamente responsive
- Sección de video promocional
- Múltiples opciones de pago y entrega

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6+)
- Firebase (Firestore, Authentication)
- Font Awesome para iconos

## Configuración inicial

### 1. Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "ESTRELLA-GC-TIENDA"
3. Activa Firestore Database y Authentication en tu proyecto
4. En Authentication, habilita el proveedor de Email/Contraseña
5. Ve a la configuración del proyecto y copia los valores de configuración
6. Reemplaza los valores en `js/firebase.js` y `login.html` con tus credenciales

### 2. Estructura de base de datos

Firestore deberá tener dos colecciones:

**productos** (ejemplo de documento):
```javascript
{
  nombre: "DURAZNOS 820g EN ALMIBAR",
  precio: 64.00,
  categoria: "enlatados",
  imagen: "duraznos_820g_en_almibar.jpg",
  descripcion: "Duraznos en almíbar",
  stock: 25,
  destacado: true
}