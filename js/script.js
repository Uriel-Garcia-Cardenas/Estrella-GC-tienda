document.addEventListener('DOMContentLoaded', function() {
  // Variables globales
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const verCarrito = document.getElementById('verCarrito');
  const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
  const listaCarrito = document.getElementById('listaCarrito');
  const totalCarrito = document.getElementById('totalCarrito');
  const cantidadCarrito = document.getElementById('cantidadCarrito');
  const finalizarCompraBtn = document.getElementById('finalizarCompra');
  
  // Variable para controlar event listeners
  let eventListenersAgregados = false;

  // Función para enviar notificación por WhatsApp
  function enviarWhatsApp(pedido, pedidoId) {
    const telefonoTienda = "5576872157";
    
    let mensaje = `*NUEVO PEDIDO - ESTRELLA G&C*%0A%0A`;
    mensaje += `*Pedido #:* ${pedidoId}%0A`;
    mensaje += `*Cliente:* ${pedido.cliente.nombre}%0A`;
    mensaje += `*Teléfono:* ${pedido.cliente.telefono}%0A`;
    
    if (pedido.metodoEntrega === 'domicilio' && pedido.cliente.direccion) {
      mensaje += `*Dirección:* ${pedido.cliente.direccion}%0A`;
    }
    
    mensaje += `*Tipo de entrega:* ${pedido.metodoEntrega === 'domicilio' ? 'Entrega a domicilio' : 'Recolección en sucursal'}%0A`;
    mensaje += `*Método de pago:* ${pedido.metodoPago}%0A%0A`;
    
    mensaje += `*PRODUCTOS:*%0A`;
    pedido.productos.forEach((producto, index) => {
      mensaje += `${index + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}%0A`;
    });
    
    mensaje += `%0A*TOTAL: $${pedido.total.toFixed(2)}*%0A%0A`;
    mensaje += `*Fecha:* ${new Date().toLocaleString('es-MX')}`;
    
    const urlWhatsApp = `https://wa.me/${telefonoTienda}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
  }
  
  // Configurar event listeners una sola vez
  function configurarEventListenersPermanentes() {
    // Event listeners para métodos de pago
    document.querySelectorAll('input[name="pago"]').forEach(radio => {
      radio.addEventListener('change', function() {
        document.getElementById('datosTarjeta').style.display = 
          this.value === 'tarjeta' ? 'block' : 'none';
        document.getElementById('datosTransferencia').style.display = 
          this.value === 'transferencia' ? 'block' : 'none';
      });
    });
    
    // Event listener para tipo de entrega
    document.querySelectorAll('input[name="entrega"]').forEach(radio => {
      radio.addEventListener('change', function() {
        document.getElementById('campoDireccion').style.display = 
          this.value === 'domicilio' ? 'block' : 'none';
      });
    });
  }

  // Actualizar carrito
  function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cantidadCarrito.textContent = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    renderizarCarrito();
  }
  
  // Renderizar carrito
  function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    
    if (carrito.length === 0) {
      listaCarrito.innerHTML = '<li class="list-group-item text-center">El carrito está vacío</li>';
      totalCarrito.textContent = '$0.00';
      return;
    }
    
     carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    // Mostrar información diferente para productos con cantidad personalizada
    const infoProducto = producto.cantidadPersonalizada 
      ? `
          <div>
            <h6 class="my-0">${producto.nombre}</h6>
            <small class="text-muted">${producto.cantidadPersonalizadaValor} ${producto.unidad} × $${producto.precioBase.toFixed(2)}/${producto.unidad}</small>
          </div>
        `
      : `
          <div>
            <h6 class="my-0">${producto.nombre}</h6>
            <small class="text-muted">$${producto.precio.toFixed(2)} c/u</small>
          </div>
        `;
    
    li.innerHTML = `
      ${infoProducto}
      <div class="cantidad-control d-flex align-items-center">
        ${!producto.cantidadPersonalizada ? `
          <button class="btn btn-sm btn-outline-secondary me-2 decrementar" data-index="${index}">-</button>
          <span class="mx-2">${producto.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary ms-2 incrementar" data-index="${index}">+</button>
        ` : `
          <span class="mx-2">${producto.cantidad}</span>
        `}
        <button class="btn btn-sm btn-danger ms-3 eliminar" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <span class="badge bg-primary rounded-pill">$${subtotal.toFixed(2)}</span>
    `;
    
    listaCarrito.appendChild(li);
  });
  
  totalCarrito.textContent = `$${total.toFixed(2)}`;
    
    // Agregar event listeners a los botones del carrito
    document.querySelectorAll('.incrementar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        carrito[index].cantidad++;
        actualizarCarrito();
      });
    });
    
    document.querySelectorAll('.decrementar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        if (carrito[index].cantidad > 1) {
          carrito[index].cantidad--;
        } else {
          carrito.splice(index, 1);
        }
        actualizarCarrito();
      });
    });
    
    document.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        carrito.splice(index, 1);
        actualizarCarrito();
      });
    });
  }

  // Agregar event listeners a los botones de productos (solo una vez)
 // Agregar event listeners a los botones de productos (solo una vez)
function agregarEventListenersProductos() {
  if (eventListenersAgregados) return;

  // Helper para actualizar precio total de productos por unidad
  function actualizarPrecioUnidad(container) {
    const span = container.querySelector('.cantidad-valor');
    const cantidad = parseInt(span.textContent) || 1;
    const card = container.closest('.card');
    if (!card) return;
    const btn = card.querySelector('.agregar');
    if (!btn) return;
    const precioUnitario = parseFloat(btn.getAttribute('data-precio'));
    const total = precioUnitario * cantidad;
    const precioElement = container.querySelector('.precio-calculado strong');
    if (precioElement) {
      precioElement.textContent = `$${total.toFixed(2)}`;
    }
  }

  // --- 1. Manejo de botones + y - en las tarjetas ---
  document.addEventListener('click', function(e) {
    // Botón incrementar
    if (e.target.classList.contains('btn-incrementar')) {
      const container = e.target.closest('.cantidad-personalizada, .cantidad-unidad');
      if (!container) return;
      if (container.classList.contains('cantidad-personalizada')) {
        const input = container.querySelector('.cantidad-input');
        let val = parseFloat(input.value) || 0;
        val = Math.min(val + 0.1, 10);
        input.value = val.toFixed(1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (container.classList.contains('cantidad-unidad')) {
        const span = container.querySelector('.cantidad-valor');
        let val = parseInt(span.textContent) || 1;
        val++;
        span.textContent = val;
        actualizarPrecioUnidad(container);
      }
    }

    // Botón decrementar
    if (e.target.classList.contains('btn-decrementar')) {
      const container = e.target.closest('.cantidad-personalizada, .cantidad-unidad');
      if (!container) return;
      if (container.classList.contains('cantidad-personalizada')) {
        const input = container.querySelector('.cantidad-input');
        let val = parseFloat(input.value) || 0;
        val = Math.max(val - 0.1, 0.1);
        input.value = val.toFixed(1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (container.classList.contains('cantidad-unidad')) {
        const span = container.querySelector('.cantidad-valor');
        let val = parseInt(span.textContent) || 1;
        if (val > 1) {
          val--;
          span.textContent = val;
          actualizarPrecioUnidad(container);
        }
      }
    }
  });

  // --- 2. Actualizar precio en tiempo real para productos por kg ---
  document.addEventListener('input', function(e) {
    if (e.target.classList.contains('cantidad-input')) {
      const input = e.target;
      const card = input.closest('.card');
      if (!card) return;

      const btn = card.querySelector('.agregar');
      const precioBase = parseFloat(btn.getAttribute('data-precio'));
      const cantidad = parseFloat(input.value) || 0;
      const precioCalculado = precioBase * cantidad;

      const precioContainer = input.closest('.cantidad-personalizada');
      if (precioContainer) {
        const precioElement = precioContainer.querySelector('.precio-calculado strong');
        if (precioElement) {
          precioElement.textContent = `$${precioCalculado.toFixed(2)}`;
        }
      }
    }
  });

  // --- 3. Evento principal: agregar al carrito con efecto visual y validación de stock ---
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.agregar');
    if (!btn || btn.disabled) return;

    // Efecto visual (cambio a verde)
    btn.classList.add('agregar-clicked');
    setTimeout(() => btn.classList.remove('agregar-clicked'), 200);

    const id = btn.getAttribute('data-id');
    const nombre = btn.getAttribute('data-nombre');
    const precioBase = parseFloat(btn.getAttribute('data-precio'));
    const esCantidadPersonalizada = btn.getAttribute('data-cantidad-personalizada') === 'true';

    let cantidad = 1;
    let precioFinal = precioBase;
    const card = btn.closest('.card');

    if (esCantidadPersonalizada) {
      // Producto por kg
      const cantidadInput = card.querySelector('.cantidad-input');
      cantidad = parseFloat(cantidadInput.value) || 0;
      if (cantidad < 0.1) {
        mostrarNotificacion('La cantidad mínima es 0.1 kg', 'warning');
        return;
      }
      precioFinal = precioBase * cantidad;
    } else {
      // Producto por unidad
      const cantidadSpan = card.querySelector('.cantidad-valor');
      if (cantidadSpan) {
        cantidad = parseInt(cantidadSpan.textContent) || 1;
      }
      precioFinal = precioBase; // precio unitario
    }

    // ----- VALIDACIÓN DE STOCK -----
    const productoOriginal = manejadorCategorias.productos.find(p => p.id === id);
    if (!productoOriginal) {
      mostrarNotificacion('Producto no encontrado', 'warning');
      return;
    }
    const stockDisponible = productoOriginal.stock || 0;

    if (esCantidadPersonalizada) {
      if (cantidad > stockDisponible) {
        mostrarNotificacion(`Stock insuficiente. Solo hay ${stockDisponible} kg disponibles.`, 'warning');
        return;
      }
    } else {
      if (cantidad > stockDisponible) {
        mostrarNotificacion(`Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`, 'warning');
        return;
      }
    }
    // ----- FIN VALIDACIÓN -----

    // Buscar producto existente en el carrito
    const productoExistente = carrito.find(p => p.id === id && p.cantidadPersonalizada === esCantidadPersonalizada);

    if (productoExistente && !esCantidadPersonalizada) {
      // Producto normal: sumar cantidad
      productoExistente.cantidad += cantidad;
    } else if (productoExistente && esCantidadPersonalizada) {
      // Producto por kg: se agrega como ítem separado
      carrito.push({
        id, nombre, precio: precioFinal, cantidad: 1,
        cantidadPersonalizada: true,
        precioBase: precioBase,
        cantidadPersonalizadaValor: cantidad,
        unidad: 'kg'
      });
    } else {
      // Producto nuevo
      carrito.push({
        id, nombre,
        precio: esCantidadPersonalizada ? precioFinal : precioBase,
        cantidad: esCantidadPersonalizada ? 1 : cantidad,
        cantidadPersonalizada: esCantidadPersonalizada,
        precioBase: esCantidadPersonalizada ? precioBase : null,
        cantidadPersonalizadaValor: esCantidadPersonalizada ? cantidad : null,
        unidad: esCantidadPersonalizada ? 'kg' : 'unidad'
      });
    }

    actualizarCarrito();

    // Mostrar notificación
    const mensaje = esCantidadPersonalizada
      ? `${nombre} (${cantidad} kg) agregado al carrito - $${precioFinal.toFixed(2)}`
      : `${nombre} x${cantidad} agregado al carrito`;
    mostrarNotificacion(mensaje, 'success');
  });

  eventListenersAgregados = true;
}
  // Función para mostrar notificaciones
  function mostrarNotificacion(mensaje, tipo = 'success') {
  // Eliminar notificación anterior si existe
  const toastAnterior = document.querySelector('.toast-container');
  if (toastAnterior) {
    toastAnterior.remove();
  }
  
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
  toastContainer.style.zIndex = '9999';
  toastContainer.innerHTML = `
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header bg-${tipo} text-white">
        <strong class="me-auto">Producto agregado</strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${mensaje}
      </div>
    </div>
  `;
  
  document.body.appendChild(toastContainer);
  
  // Eliminar la notificación después de 3 segundos
  setTimeout(() => {
    if (toastContainer.parentNode) {
      toastContainer.remove();
    }
  }, 3000);
}

  // Cargar productos desde Firebase
  async function cargarProductos() {
    try {
      const productos = await fb.obtenerProductos();
      
      // Inicializar manejador de categorías
      manejadorCategorias.extraerCategorias(productos);
      manejadorCategorias.renderizarCategorias();
     // manejadorCategorias.renderizarProductos();
      
      // Configurar event listeners una sola vez
      agregarEventListenersProductos();
      
    } catch (error) {
      console.error("Error cargando productos:", error);
      document.getElementById('productosPorCategoria').innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-warning">
            <h4>Error cargando productos</h4>
            <p>Por favor, verifica tu conexión a internet</p>
          </div>
        </div>
      `;
    }
  }
  
  // Abrir modal del carrito
  verCarrito.addEventListener('click', () => {
    renderizarCarrito();
    carritoModal.show();
  });
  
  // Finalizar compra
  // Finalizar compra
finalizarCompraBtn.addEventListener('click', async () => {
  if (carrito.length === 0) {
    mostrarNotificacion('El carrito está vacío. Agrega productos antes de finalizar la compra.', 'warning');
    return;
  }
  
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const metodoPago = document.querySelector('input[name="pago"]:checked').value;
  
  // Validaciones básicas
  if (!nombre || !telefono) {
    mostrarNotificacion('Por favor, ingresa tu nombre y teléfono.', 'warning');
    return;
  }

  if (!/^\d{10}$/.test(telefono)) {
    mostrarNotificacion('Por favor, ingresa un teléfono válido de 10 dígitos.', 'warning');
    return;
  }

  // Crear objeto pedido
  const pedido = {
    cliente: {
      nombre: nombre,
      telefono: telefono,
      direccion: document.getElementById('direccion').value.trim() || ''
    },
    productos: carrito,
    total: carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0),
    estado: "pendiente",
    fecha: new Date(),
    metodoPago: metodoPago,
    metodoEntrega: document.querySelector('input[name="entrega"]:checked').value,
    estadoPago: "pendiente"
  };

  try {
    // Mostrar loading
    finalizarCompraBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Procesando...';
    finalizarCompraBtn.disabled = true;

    // Guardar pedido en Firebase primero
    const pedidoId = await fb.guardarPedido(pedido);
    
    // Si es pago con tarjeta o transferencia, usar Mercado Pago
    if (metodoPago === 'tarjeta' || metodoPago === 'transferencia') {
      await procesarPagoMercadoPago(pedido, pedidoId);
    } else {
      // Pago en sucursal
      await finalizarPedidoSucursal(pedido, pedidoId);
    }

  } catch (error) {
    console.error('Error en proceso de compra:', error);
    mostrarNotificacion('Error al procesar la compra. Por favor, intenta nuevamente.', 'danger');
    finalizarCompraBtn.innerHTML = 'Finalizar compra';
    finalizarCompraBtn.disabled = false;
  }
});

// Función para procesar pago con Mercado Pago
async function procesarPagoMercadoPago(pedido, pedidoId) {
  try {
    // Crear preferencia de pago en Mercado Pago
    const preferencia = await fb.crearPreferenciaMercadoPago({
      ...pedido,
      id: pedidoId
    });

    // Guardar información del pago en Firebase
    const pagoData = {
      pedidoId: pedidoId,
      metodoPago: pedido.metodoPago,
      monto: pedido.total,
      estado: 'pendiente',
      preferenciaId: preferencia.id,
      fechaCreacion: new Date(),
      cliente: pedido.cliente
    };

    await db.collection("pagos").add(pagoData);

    // Redirigir a Mercado Pago
    window.location.href = preferencia.init_point;

  } catch (error) {
    console.error('Error procesando pago:', error);
    throw new Error('No se pudo conectar con el sistema de pagos');
  }
}

// Función para pago en sucursal
async function finalizarPedidoSucursal(pedido, pedidoId) {
  // Guardar información de pago en sucursal
  const pagoData = {
    pedidoId: pedidoId,
    metodoPago: 'sucursal',
    monto: pedido.total,
    estado: 'pendiente',
    fechaCreacion: new Date(),
    cliente: pedido.cliente
  };

  await db.collection("pagos").add(pagoData);

  // Mostrar resumen con opción de ticket
  mostrarResumenCompra(pedido, pedidoId, 'sucursal');
  enviarWhatsApp(pedido, pedidoId);
  
  // Mostrar ticket
  setTimeout(() => {
    ticketGenerator.mostrarTicketModal(pedido, pedidoId);
  }, 1000);
  
  // Limpiar carrito
  carrito = [];
  actualizarCarrito();
}

// Modificar la función mostrarResumenCompra para incluir botón de ticket
function mostrarResumenCompra(pedido, pedidoId, metodoPago) {
  const resumenHTML = `
    <div class="alert alert-success">
      <h5>¡${metodoPago === 'sucursal' ? 'Pedido realizado con éxito!' : 'Redirigiendo a pago...'}!</h5>
      <p>Gracias por tu compra, ${pedido.cliente.nombre}.</p>
      <p>Número de pedido: <strong>${pedidoId}</strong></p>
      <p>Total: <strong>$${(pedido.total * 1.16).toFixed(2)}</strong> (incluye IVA)</p>
      <p>Método de pago: ${pedido.metodoPago}</p>
      <p>Tipo de entrega: ${pedido.metodoEntrega === 'domicilio' ? 'Entrega a domicilio' : 'Recolección en sucursal'}</p>
      <p>Nos contactaremos al teléfono: <strong>${pedido.cliente.telefono}</strong></p>
      
      ${metodoPago === 'sucursal' ? 
        `<div class="mt-3">
          <button id="verTicketBtn" class="btn btn-primary">
            <i class="fas fa-receipt me-1"></i> Ver Comprobante
          </button>
          <p class="mt-2"><strong>💰 Recuerda realizar tu pago en sucursal</strong></p>
        </div>` : 
        '<p class="mt-2"><strong>🔗 Serás redirigido a Mercado Pago para completar tu pago...</strong></p>'
      }
    </div>
  `;
  
  document.getElementById('resumenCompra').innerHTML = resumenHTML;
  
  // Agregar event listener al botón de ver ticket
  if (metodoPago === 'sucursal') {
    document.getElementById('verTicketBtn').addEventListener('click', () => {
      ticketGenerator.mostrarTicketModal(pedido, pedidoId);
    });
  }
  
  if (metodoPago === 'sucursal') {
    setTimeout(() => {
      limpiarFormularioYCerrar();
    }, 10000);
  }
}

// Función para mostrar resumen de compra
function mostrarResumenCompra(pedido, pedidoId, metodoPago) {
  const resumenHTML = `
    <div class="alert alert-success">
      <h5>¡${metodoPago === 'sucursal' ? 'Pedido realizado con éxito!' : 'Redirigiendo a pago...'}!</h5>
      <p>Gracias por tu compra, ${pedido.cliente.nombre}.</p>
      <p>Número de pedido: <strong>${pedidoId}</strong></p>
      <p>Total: <strong>$${pedido.total.toFixed(2)}</strong></p>
      <p>Método de pago: ${pedido.metodoPago}</p>
      <p>Tipo de entrega: ${pedido.metodoEntrega === 'domicilio' ? 'Entrega a domicilio' : 'Recolección en sucursal'}</p>
      <p>Nos contactaremos al teléfono: <strong>${pedido.cliente.telefono}</strong></p>
      ${metodoPago === 'sucursal' ? 
        '<p class="mt-2"><strong>💰 Recuerda realizar tu pago en sucursal</strong></p>' : 
        '<p class="mt-2"><strong>🔗 Serás redirigido a Mercado Pago para completar tu pago...</strong></p>'
      }
    </div>
  `;
  
  document.getElementById('resumenCompra').innerHTML = resumenHTML;
  
  if (metodoPago === 'sucursal') {
    setTimeout(() => {
      limpiarFormularioYCerrar();
    }, 5000);
  }
}

// Función para validar datos de tarjeta (solo formato)
function validarDatosTarjeta() {
  const numTarjeta = document.getElementById('numTarjeta').value.replace(/\s/g, '');
  const nombreTarjeta = document.getElementById('nombreTarjeta').value.trim();
  const vencimiento = document.getElementById('vencimiento').value;
  const cvv = document.getElementById('cvv').value;

  if (!/^\d{13,19}$/.test(numTarjeta)) {
    throw new Error('Número de tarjeta inválido');
  }

  if (!nombreTarjeta || nombreTarjeta.length < 3) {
    throw new Error('Nombre en tarjeta inválido');
  }

  if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
    throw new Error('Fecha de vencimiento inválida (use MM/AA)');
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    throw new Error('CVV inválido');
  }

  return true;
}

// Función para limpiar formulario
function limpiarFormularioYCerrar() {
  document.getElementById('resumenCompra').innerHTML = '';
  document.getElementById('nombre').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('numTarjeta').value = '';
  document.getElementById('nombreTarjeta').value = '';
  document.getElementById('vencimiento').value = '';
  document.getElementById('cvv').value = '';
  document.getElementById('folioTransferencia').value = '';
  carritoModal.hide();
  finalizarCompraBtn.innerHTML = 'Finalizar compra';
  finalizarCompraBtn.disabled = false;
}
  
  // Inicializar
  configurarEventListenersPermanentes();
  actualizarCarrito();
  cargarProductos();
});

// En script.js, después de las funciones existentes
function procesarExitoPago(pedidoId, metodoPago) {
  // Obtener el pedido completo desde Firebase
  db.collection("pedidos").doc(pedidoId).get().then((doc) => {
    if (doc.exists) {
      const pedido = { id: pedidoId, ...doc.data() };
      
      // Mostrar resumen con ticket
      mostrarResumenCompra(pedido, pedidoId, metodoPago);
      
      // Mostrar ticket después de un breve delay
      setTimeout(() => {
        ticketGenerator.mostrarTicketModal(pedido, pedidoId);
      }, 1500);
    }
  });
}
