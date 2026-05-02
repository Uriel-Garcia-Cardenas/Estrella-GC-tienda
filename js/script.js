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
    const telefonoTienda = "5524289757";
    
    let mensaje = `*NUEVO PEDIDO - ESTRELLA G&C*%0A%0A`;
    mensaje += `*Pedido #:* ${pedidoId}%0A`;
    mensaje += `*Cliente:* ${pedido.cliente.nombre}%0A`;
    mensaje += `*Teléfono:* ${pedido.cliente.telefono}%0A`;
    
    if (pedido.metodoEntrega === 'domicilio' && pedido.cliente.direccion) {
      mensaje += `*Dirección:* ${pedido.cliente.direccion}%0A`;
    }
    
    mensaje += `*Tipo de entrega:* ${pedido.metodoEntrega === 'domicilio' ? 'Entrega a domicilio' : 'Recolección en sucursal'}%0A`;
    let metodoPagoTexto = pedido.metodoPago;
if (metodoPagoTexto === 'efectivo_repartidor') metodoPagoTexto = '💵 Pagar al repartidor (Efectivo)';
if (metodoPagoTexto === 'transferencia') metodoPagoTexto = '🏦 Transferencia bancaria';
if (metodoPagoTexto === 'sucursal') metodoPagoTexto = '🏪 Pago en sucursal';
if (metodoPagoTexto === 'tarjeta') metodoPagoTexto = '💳 Tarjeta (Próximamente)';
mensaje += `*Método de pago:* ${metodoPagoTexto}%0A%0A`;
    
    mensaje += `*PRODUCTOS:*%0A`;
    pedido.productos.forEach((producto, index) => {
      const cantidad = producto.cantidadPersonalizada ? producto.cantidadPersonalizadaValor : producto.cantidad;
      const unidad = producto.unidad || (producto.cantidadPersonalizada ? 'kg' : 'pz');
      mensaje += `${index + 1}. ${producto.nombre} - Cantidad: ${cantidad} ${unidad} - $${(producto.precio * cantidad).toFixed(2)}%0A`;
    });
    
    mensaje += `%0A*TOTAL: $${pedido.total.toFixed(2)}*%0A%0A`;
    mensaje += `*Fecha:* ${new Date().toLocaleString('es-MX')}`;
    
    const urlWhatsApp = `https://wa.me/${telefonoTienda}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
  }
  
  // Configurar event listeners una sola vez
  function configurarEventListenersPermanentes() {
    // Referencias a los radios de pago
    const repartidorRadio = document.getElementById('pagoRepartidor');
    const tarjetaRadio = document.getElementById('pagoTarjeta');
    const sucursalRadio = document.getElementById('pagoSucursal');
    const transferenciaRadio = document.getElementById('pagoTransferencia');
    
    // Función para habilitar/deshabilitar "Pagar al repartidor" según el tipo de entrega
    function actualizarPagoRepartidor() {
        const entregaSeleccionada = document.querySelector('input[name="entrega"]:checked');
        const esDomicilio = entregaSeleccionada && entregaSeleccionada.value === 'domicilio';
        
        if (repartidorRadio) {
            if (esDomicilio) {
                repartidorRadio.disabled = false;
                repartidorRadio.parentElement.querySelector('label').classList.remove('text-muted');
            } else {
                repartidorRadio.disabled = true;
                repartidorRadio.checked = false;
                repartidorRadio.parentElement.querySelector('label').classList.add('text-muted');
                // Si estaba seleccionado, seleccionar otro método por defecto
                if (sucursalRadio) sucursalRadio.checked = true;
            }
        }
        // Tarjeta siempre deshabilitada
        if (tarjetaRadio) {
            tarjetaRadio.disabled = true;
        }
    }
    
    // Event listeners para métodos de pago
    document.querySelectorAll('input[name="pago"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('datosTarjeta').style.display = 
                this.value === 'tarjeta' ? 'block' : 'none';
            document.getElementById('datosTransferencia').style.display = 
                this.value === 'transferencia' ? 'block' : 'none';
        });
    });
    
    // Event listener para tipo de entrega (actualiza el estado de "Pagar al repartidor")
    document.querySelectorAll('input[name="entrega"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('campoDireccion').style.display = 
                this.value === 'domicilio' ? 'block' : 'none';
            actualizarPagoRepartidor(); // Actualizar el estado del pago al repartidor
        });
    });
    
    // Inicializar estado al cargar la página
    actualizarPagoRepartidor();
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
      
      const infoProducto = producto.cantidadPersonalizada 
        ? `
            <div>
              <h6 class="my-0">${producto.nombre}</h6>
              <small class="text-muted">${producto.cantidadPersonalizadaValor} ${producto.unidad} × $${producto.precioBase.toFixed(2)}/${producto.unidad}</small>
              ${producto.codigoBarras ? `<br><small class="text-muted font-monospace">Código: ${producto.codigoBarras}</small>` : ''}
            </div>
          `
        : `
            <div>
              <h6 class="my-0">${producto.nombre}</h6>
              <small class="text-muted">$${producto.precio.toFixed(2)} c/u</small>
              ${producto.codigoBarras ? `<br><small class="text-muted font-monospace">Código: ${producto.codigoBarras}</small>` : ''}
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

  // Agregar event listeners a los botones de productos
  function agregarEventListenersProductos() {
    if (eventListenersAgregados) return;

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

    document.addEventListener('click', function(e) {
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

    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.agregar');
      if (!btn || btn.disabled) return;

      btn.classList.add('agregar-clicked');
      setTimeout(() => btn.classList.remove('agregar-clicked'), 200);

      const id = btn.getAttribute('data-id');
      const nombre = btn.getAttribute('data-nombre');
      const precioBase = parseFloat(btn.getAttribute('data-precio'));
      const esCantidadPersonalizada = btn.getAttribute('data-cantidad-personalizada') === 'true';
      const codigoBarras = btn.getAttribute('data-codigo-barras') || '';

      let cantidad = 1;
      let precioFinal = precioBase;
      const card = btn.closest('.card');

      if (esCantidadPersonalizada) {
        const cantidadInput = card.querySelector('.cantidad-input');
        cantidad = parseFloat(cantidadInput.value) || 0;
        if (cantidad < 0.1) {
          mostrarNotificacion('La cantidad mínima es 0.1 kg', 'warning');
          return;
        }
        precioFinal = precioBase * cantidad;
      } else {
        const cantidadSpan = card.querySelector('.cantidad-valor');
        if (cantidadSpan) {
          cantidad = parseInt(cantidadSpan.textContent) || 1;
        }
        precioFinal = precioBase;
      }

      const productoOriginal = manejadorCategorias?.productos?.find(p => p.id === id);
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

      const productoExistente = carrito.find(p => p.id === id && p.cantidadPersonalizada === esCantidadPersonalizada);

      if (productoExistente && !esCantidadPersonalizada) {
        productoExistente.cantidad += cantidad;
      } else if (productoExistente && esCantidadPersonalizada) {
        carrito.push({
          id, nombre, precio: precioFinal, cantidad: 1,
          cantidadPersonalizada: true,
          precioBase: precioBase,
          cantidadPersonalizadaValor: cantidad,
          unidad: unidadMedida === 'g' || unidadMedida === 'gramo' ? 'g' : 'kg',
          codigoBarras: codigoBarras
        });
      } else {
        carrito.push({
          id, nombre,
          precio: esCantidadPersonalizada ? precioFinal : precioBase,
          cantidad: esCantidadPersonalizada ? 1 : cantidad,
          cantidadPersonalizada: esCantidadPersonalizada,
          precioBase: esCantidadPersonalizada ? precioBase : null,
          cantidadPersonalizadaValor: esCantidadPersonalizada ? cantidad : null,
          unidad: esCantidadPersonalizada ? 'kg' : 'unidad',
          codigoBarras: codigoBarras
        });
      }

      actualizarCarrito();

  // Obtener la unidad de medida correctamente desde el producto
const unidadDelProducto = esCantidadPersonalizada ? (btn.getAttribute('data-unidad-medida') || 'kg') : 'pz';
const unidadTexto = (unidadDelProducto === 'g' || unidadDelProducto === 'gramo') ? 'g' : 
                    (unidadDelProducto === 'kg' || unidadDelProducto === 'kilogramo') ? 'kg' : 'pz';
  const mensaje = esCantidadPersonalizada
    ? `${nombre} (${cantidad} ${unidadTexto}) agregado al carrito - $${precioFinal.toFixed(2)}`
    : `${nombre} x${cantidad} agregado al carrito`;
      mostrarNotificacion(mensaje, 'success');
    });

    eventListenersAgregados = true;
  }

  function mostrarNotificacion(mensaje, tipo = 'success') {
     const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    toastContainer.innerHTML = `
      <div class="toast show" role="alert">
        <div class="toast-header bg-${tipo} text-white">
          <strong class="me-auto">${tipo === 'success' ? '✅ Producto agregado' : '⚠️ Atención'}</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">${mensaje}</div>
      </div>
    `;
    
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
      if (toastContainer.parentNode) {
        toastContainer.remove();
      }
    }, 3000);
  }

 async function cargarProductos() {
    try {
        const productos = await fb.obtenerProductos();
        
        if (typeof manejadorCategorias !== 'undefined' && manejadorCategorias) {
            manejadorCategorias.extraerCategorias(productos);
            manejadorCategorias.renderizarCategorias();
            
            // 🆕 FORZAR MOSTRAR SOLO DESTACADOS AL INICIO
            const productosDestacados = productos.filter(p => p.destacado === true);
            const contenedor = document.getElementById('productosPorCategoria');
            if (contenedor && productosDestacados.length > 0) {
                manejadorCategorias.renderizarDestacadosPorCategorias(contenedor, productosDestacados);
            } else if (contenedor) {
                contenedor.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-info">
                            <h4>✨ Próximamente</h4>
                            <p>Estamos preparando productos destacados para ti</p>
                        </div>
                    </div>
                `;
            }
        }
        
        agregarEventListenersProductos();
        
    } catch (error) {
        console.error("Error cargando productos:", error);
        // ... resto del código
    }
}
  
  verCarrito.addEventListener('click', () => {
    renderizarCarrito();
    carritoModal.show();
  });
  
  // ==================== FINALIZAR COMPRA CORREGIDO ====================
  finalizarCompraBtn.addEventListener('click', async () => {
    if (carrito.length === 0) {
      mostrarNotificacion('El carrito está vacío. Agrega productos antes de finalizar la compra.', 'warning');
      return;
    }
    
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const metodoPagoRadio = document.querySelector('input[name="pago"]:checked');
    const entregaRadio = document.querySelector('input[name="entrega"]:checked');
    
    if (!nombre || !telefono) {
      mostrarNotificacion('Por favor, ingresa tu nombre y teléfono.', 'warning');
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      mostrarNotificacion('Por favor, ingresa un teléfono válido de 10 dígitos.', 'warning');
      return;
    }

    if (!metodoPagoRadio) {
      mostrarNotificacion('Por favor, selecciona un método de pago.', 'warning');
      return;
    }

    if (!entregaRadio) {
      mostrarNotificacion('Por favor, selecciona un tipo de entrega.', 'warning');
      return;
    }

    const metodoPago = metodoPagoRadio.value;
    const metodoEntrega = entregaRadio.value;
    const direccion = document.getElementById('direccion').value.trim() || 'No especificada';

    // ==================== VALIDACIÓN: PAGO AL REPARTIDOR SOLO CON DOMICILIO ====================
    if (metodoPago === 'efectivo_repartidor' && metodoEntrega !== 'domicilio') {
        mostrarNotificacion('El pago al repartidor solo está disponible para entregas a domicilio.', 'warning');
        finalizarCompraBtn.disabled = false;
        finalizarCompraBtn.innerHTML = 'Finalizar compra';
        return;
    }
    // ===========================================================================================

    // Crear copia del carrito con todos los datos necesarios
    const productosParaPedido = carrito.map(item => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precioBase || item.precio,
      cantidad: item.cantidad,
      cantidadPersonalizada: item.cantidadPersonalizada || false,
      cantidadPersonalizadaValor: item.cantidadPersonalizadaValor || null,
      unidad: item.unidad || (item.cantidadPersonalizada ? 'kg' : 'pz'),
      codigoBarras: item.codigoBarras || 'N/A'
    }));

    const totalCompra = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);

    const pedido = {
      cliente: {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion
      },
      productos: productosParaPedido,
      total: totalCompra,
      estado: "pendiente",
      fecha: new Date(),
      metodoPago: metodoPago,
      metodoEntrega: metodoEntrega,
      estadoPago: metodoPago === 'efectivo_repartidor' ? 'pendiente_entrega' : "pendiente",
      fechaCreacion: new Date()
    };

    console.log('Pedido a guardar:', pedido);

    try {
      finalizarCompraBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Procesando...';
      finalizarCompraBtn.disabled = true;

      const pedidoId = await fb.guardarPedido(pedido);
      console.log('Pedido guardado con ID:', pedidoId);
      
      if (metodoPago === 'tarjeta') {
          mostrarNotificacion('⏳ El pago con tarjeta estará disponible próximamente.', 'warning');
          finalizarCompraBtn.disabled = false;
          finalizarCompraBtn.innerHTML = 'Finalizar compra';
          return;
      } else if (metodoPago === 'transferencia') {
        await procesarPagoMercadoPago(pedido, pedidoId);
      } else if (metodoPago === 'efectivo_repartidor') {
        await finalizarPedidoRepartidor(pedido, pedidoId);
      } else {
        await finalizarPedidoSucursal(pedido, pedidoId);
      }

    } catch (error) {
      console.error('Error en proceso de compra:', error);
      mostrarNotificacion('Error al procesar la compra. Por favor, intenta nuevamente.', 'danger');
      finalizarCompraBtn.innerHTML = 'Finalizar compra';
      finalizarCompraBtn.disabled = false;
    }
  });
  async function procesarPagoMercadoPago(pedido, pedidoId) {
    try {
      const preferencia = await fb.crearPreferenciaMercadoPago({
        ...pedido,
        id: pedidoId
      });

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
      window.location.href = preferencia.init_point;

    } catch (error) {
      console.error('Error procesando pago:', error);
      throw new Error('No se pudo conectar con el sistema de pagos');
    }
  }

  async function finalizarPedidoSucursal(pedido, pedidoId) {
    const pagoData = {
      pedidoId: pedidoId,
      metodoPago: 'sucursal',
      monto: pedido.total,
      estado: 'pendiente',
      fechaCreacion: new Date(),
      cliente: pedido.cliente
    };

    await db.collection("pagos").add(pagoData);
    mostrarResumenCompra(pedido, pedidoId, 'sucursal');
    enviarWhatsApp(pedido, pedidoId);
    
    setTimeout(() => {
      if (typeof ticketGenerator !== 'undefined' && ticketGenerator) {
        ticketGenerator.mostrarTicketModal(pedido, pedidoId);
      }
    }, 1000);
    
    carrito = [];
    actualizarCarrito();
  }

  // ==================== NUEVA FUNCIÓN: PAGO AL REPARTIDOR ====================
async function finalizarPedidoRepartidor(pedido, pedidoId) {
    const pagoData = {
        pedidoId: pedidoId,
        metodoPago: 'efectivo_repartidor',
        monto: pedido.total,
        estado: 'pendiente_entrega',
        fechaCreacion: new Date(),
        cliente: pedido.cliente
    };

    await db.collection("pagos").add(pagoData);
    mostrarResumenCompraRepartidor(pedido, pedidoId);
    enviarWhatsAppRepartidor(pedido, pedidoId);
    
    setTimeout(() => {
        if (typeof ticketGenerator !== 'undefined' && ticketGenerator) {
            ticketGenerator.mostrarTicketModal(pedido, pedidoId);
        }
    }, 1000);
    
    carrito = [];
    actualizarCarrito();
}

function mostrarResumenCompraRepartidor(pedido, pedidoId) {
    const totalConIVA = pedido.total * 1.16;
    
    const resumenHTML = `
        <div class="alert alert-info">
            <h5>✅ ¡Pedido confirmado!</h5>
            <p>Gracias por tu compra, ${pedido.cliente.nombre}.</p>
            <p>Número de pedido: <strong>${pedidoId}</strong></p>
            <p>Total: <strong>$${totalConIVA.toFixed(2)}</strong> (incluye IVA)</p>
            <p>Método de pago: <strong>💵 Pagar al repartidor (Efectivo)</strong></p>
            <p>Tipo de entrega: ${pedido.metodoEntrega === 'domicilio' ? '🚚 Entrega a domicilio' : '🏪 Recolección en sucursal'}</p>
            
            <div class="alert alert-warning mt-3">
                <strong>📌 Instrucciones de pago:</strong>
                <ul class="mb-0 mt-2">
                    <li>Prepara el monto exacto en efectivo</li>
                    <li>El repartidor te entregará el pedido y cobrará el monto indicado</li>
                    <li>Recibirás un ticket impreso como comprobante</li>
                </ul>
            </div>
            
            <div class="mt-3">
                <button id="verTicketBtnRepartidor" class="btn btn-primary">
                    <i class="fas fa-receipt me-1"></i> Ver Comprobante
                </button>
            </div>
        </div>
    `;
    
    const resumenContainer = document.getElementById('resumenCompra');
    if (resumenContainer) {
        resumenContainer.innerHTML = resumenHTML;
    }
    
    const verTicketBtn = document.getElementById('verTicketBtnRepartidor');
    if (verTicketBtn && typeof ticketGenerator !== 'undefined') {
        verTicketBtn.addEventListener('click', () => {
            ticketGenerator.mostrarTicketModal(pedido, pedidoId);
        });
    }
    
    setTimeout(() => {
        limpiarFormularioYCerrar();
    }, 15000);
}

function enviarWhatsAppRepartidor(pedido, pedidoId) {
    const telefonoTienda = "5524289757";
    
    let mensaje = `*NUEVO PEDIDO - ESTRELLA G&C*%0A%0A`;
    mensaje += `*Pedido #:* ${pedidoId}%0A`;
    mensaje += `*Cliente:* ${pedido.cliente.nombre}%0A`;
    mensaje += `*Teléfono:* ${pedido.cliente.telefono}%0A`;
    
    if (pedido.metodoEntrega === 'domicilio' && pedido.cliente.direccion) {
        mensaje += `*Dirección:* ${pedido.cliente.direccion}%0A`;
    }
    
    mensaje += `*Método de pago:* 💵 Pagar al repartidor (Efectivo)%0A`;
    mensaje += `*Tipo de entrega:* ${pedido.metodoEntrega === 'domicilio' ? 'Entrega a domicilio' : 'Recolección en sucursal'}%0A%0A`;
    
    mensaje += `*PRODUCTOS:*%0A`;
    pedido.productos.forEach((producto, index) => {
        const cantidad = producto.cantidadPersonalizada ? producto.cantidadPersonalizadaValor : producto.cantidad;
        const unidad = producto.unidad || (producto.cantidadPersonalizada ? 'kg' : 'pz');
        mensaje += `${index + 1}. ${producto.nombre} - Cantidad: ${cantidad} ${unidad} - $${(producto.precio * cantidad).toFixed(2)}%0A`;
    });
    
    mensaje += `%0A*TOTAL A COBRAR: $${pedido.total.toFixed(2)}*%0A%0A`;
    mensaje += `*INSTRUCCIONES:* El cliente pagará en efectivo al momento de la entrega.%0A`;
    mensaje += `*Fecha:* ${new Date().toLocaleString('es-MX')}`;
    
    const urlWhatsApp = `https://wa.me/${telefonoTienda}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
}

  function mostrarResumenCompra(pedido, pedidoId, metodoPago) {
    const totalConIVA = pedido.total * 1.16;
    
    const resumenHTML = `
      <div class="alert alert-success">
        <h5>¡${metodoPago === 'sucursal' ? 'Pedido realizado con éxito!' : 'Redirigiendo a pago...'}!</h5>
        <p>Gracias por tu compra, ${pedido.cliente.nombre}.</p>
        <p>Número de pedido: <strong>${pedidoId}</strong></p>
        <p>Total: <strong>$${totalConIVA.toFixed(2)}</strong> (incluye IVA)</p>
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
    
    const resumenContainer = document.getElementById('resumenCompra');
    if (resumenContainer) {
      resumenContainer.innerHTML = resumenHTML;
    }
    
    if (metodoPago === 'sucursal') {
      const verTicketBtn = document.getElementById('verTicketBtn');
      if (verTicketBtn) {
        verTicketBtn.addEventListener('click', () => {
          if (typeof ticketGenerator !== 'undefined' && ticketGenerator) {
            ticketGenerator.mostrarTicketModal(pedido, pedidoId);
          }
        });
      }
      
      setTimeout(() => {
        limpiarFormularioYCerrar();
      }, 10000);
    }
  }

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

  function limpiarFormularioYCerrar() {
    const resumenContainer = document.getElementById('resumenCompra');
    if (resumenContainer) resumenContainer.innerHTML = '';
    
    const nombreInput = document.getElementById('nombre');
    if (nombreInput) nombreInput.value = '';
    
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) telefonoInput.value = '';
    
    const direccionInput = document.getElementById('direccion');
    if (direccionInput) direccionInput.value = '';
    
    const numTarjetaInput = document.getElementById('numTarjeta');
    if (numTarjetaInput) numTarjetaInput.value = '';
    
    const nombreTarjetaInput = document.getElementById('nombreTarjeta');
    if (nombreTarjetaInput) nombreTarjetaInput.value = '';
    
    const vencimientoInput = document.getElementById('vencimiento');
    if (vencimientoInput) vencimientoInput.value = '';
    
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) cvvInput.value = '';
    
    const folioInput = document.getElementById('folioTransferencia');
    if (folioInput) folioInput.value = '';
    
    carritoModal.hide();
    finalizarCompraBtn.innerHTML = 'Finalizar compra';
    finalizarCompraBtn.disabled = false;
  }
  
  // Inicializar
  configurarEventListenersPermanentes();
  actualizarCarrito();
  cargarProductos();
});

function procesarExitoPago(pedidoId, metodoPago) {
  db.collection("pedidos").doc(pedidoId).get().then((doc) => {
    if (doc.exists) {
      const pedido = { id: pedidoId, ...doc.data() };
      
      const resumenContainer = document.getElementById('resumenCompra');
      if (resumenContainer) {
        const totalConIVA = pedido.total * 1.16;
        resumenContainer.innerHTML = `
          <div class="alert alert-success">
            <h5>¡Pago completado con éxito!</h5>
            <p>Gracias por tu compra, ${pedido.cliente?.nombre || 'cliente'}.</p>
            <p>Número de pedido: <strong>${pedidoId}</strong></p>
            <p>Total: <strong>$${totalConIVA.toFixed(2)}</strong> (incluye IVA)</p>
            <button id="verTicketBtnPago" class="btn btn-primary mt-2">
              <i class="fas fa-receipt me-1"></i> Ver Comprobante
            </button>
          </div>
        `;
        
        const verTicketBtn = document.getElementById('verTicketBtnPago');
        if (verTicketBtn && typeof ticketGenerator !== 'undefined') {
          verTicketBtn.addEventListener('click', () => {
            ticketGenerator.mostrarTicketModal(pedido, pedidoId);
          });
        }
      }
      
      setTimeout(() => {
        if (typeof ticketGenerator !== 'undefined') {
          ticketGenerator.mostrarTicketModal(pedido, pedidoId);
        }
      }, 1500);
    }
  });
}