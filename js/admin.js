// js/admin.js - Panel de administración con búsqueda, eliminación de pedidos y código de barras

class AdminManager {
    constructor() {
    this.pedidos = [];
    this.productos = [];
    this.productosFiltrados = [];
    this.filtroEstado = 'todos';
    this.filtroCategoria = 'todas';
    this.filtroMarca = 'todas';  
    this.categorias = [];
    this.marcas = [];  
    this.isLoading = false;
    this.currentProductoId = null;
    this.terminoBusqueda = '';
    this.productosOriginales = [];
    this.categoriaChangeHandler = null;
    this.marcaChangeHandler = null;  
    this.pedidosSeleccionados = new Set();
    this.init();
}

    async init() {
        try {
            this.setupEventListeners();
            await this.cargarDatosIniciales();
        } catch (error) {
            console.error('Error inicializando admin:', error);
            this.mostrarError('Error al inicializar el panel de administración');
        }
    }

    // ==================== MÉTODOS DE BÚSQUEDA Y FILTRADO ====================
    filtrarProductos() {
    let productosFiltrados = [...this.productosOriginales];
    
    // Filtrar por categoría
    if (this.filtroCategoria !== 'todas') {
        productosFiltrados = productosFiltrados.filter(p => p.categoria === this.filtroCategoria);
    }
    
    // NUEVO: Filtrar por marca
    if (this.filtroMarca !== 'todas') {
        productosFiltrados = productosFiltrados.filter(p => p.marca === this.filtroMarca);
    }
    
    // Filtrar por búsqueda
    if (this.terminoBusqueda.trim() !== '') {
        const termino = this.terminoBusqueda.toLowerCase().trim();
        productosFiltrados = productosFiltrados.filter(p => 
            p.nombre.toLowerCase().includes(termino)
        );
    }
    
    this.productos = productosFiltrados;
    this.renderizarProductos();
    this.mostrarInfoFiltro();
}

    buscarProductos() {
        const searchInput = document.getElementById('adminSearchInput');
        if (searchInput) {
            this.terminoBusqueda = searchInput.value;
            this.filtrarProductos();
            this.actualizarBotonLimpiar();
        }
    }

    limpiarBusqueda() {
        const searchInput = document.getElementById('adminSearchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        this.terminoBusqueda = '';
        this.filtrarProductos();
        this.actualizarBotonLimpiar();
    }

    actualizarBotonLimpiar() {
        const btnLimpiar = document.getElementById('limpiarBusqueda');
        if (btnLimpiar) {
            btnLimpiar.style.display = this.terminoBusqueda ? 'inline-flex' : 'none';
        }
    }

        // ==================== BÚSQUEDA POR CÓDIGO DE BARRAS ====================
    
    buscarPorCodigoBarras() {
        const barcodeInput = document.getElementById('adminBarcodeInput');
        const codigo = barcodeInput.value.trim();
        
        if (!codigo) {
            this.mostrarMensaje('Escanee o escriba un código de barras', 'warning');
            return;
        }
        
        // Buscar en todos los productos
        const producto = this.productosOriginales.find(p => 
            p.codigoBarras === codigo || p.codigo === codigo
        );
        
        if (producto) {
            this.limpiarBusqueda();
            this.productos = [producto];
            this.renderizarProductos();
            this.mostrarMensaje(`✅ ${producto.nombre} encontrado`, 'success');
            
            // Resaltar y hacer scroll
            setTimeout(() => {
                const card = document.querySelector(`[data-producto-id="${producto.id}"]`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.transition = 'all 0.3s';
                    card.style.boxShadow = '0 0 0 3px #28a745';
                    setTimeout(() => card.style.boxShadow = '', 2000);
                }
            }, 100);
            
            barcodeInput.value = '';
        } else {
            this.mostrarMensaje(`❌ Código "${codigo}" no encontrado`, 'danger');
            if (confirm(`¿Crear nuevo producto con código "${codigo}"?`)) {
                this.limpiarFormularioProducto();
                document.getElementById('productoCodigoBarras').value = codigo;
                new bootstrap.Modal(document.getElementById('modalProducto')).show();
            }
            barcodeInput.value = '';
        }
    }
    
    limpiarBusquedaBarcode() {
        document.getElementById('adminBarcodeInput').value = '';
        this.filtrarProductos();
        document.getElementById('limpiarBarcodeBtn').style.display = 'none';
    }

    mostrarInfoFiltro() {
    const infoFiltro = document.getElementById('infoFiltroProductos');
    if (!infoFiltro) return;

    const totalProductos = this.productos.length;
    const totalOriginales = this.productosOriginales.length;
    
    let infoText = `Mostrando ${totalProductos} de ${totalOriginales} productos`;
    
    if (this.filtroCategoria !== 'todas') {
        infoText += ` en categoría <strong>${this.formatearCategoria(this.filtroCategoria)}</strong>`;
    }
    
    // NUEVO: Mostrar filtro de marca
    if (this.filtroMarca !== 'todas') {
        infoText += ` de la marca <strong>${this.escapeHtml(this.filtroMarca)}</strong>`;
    }
    
    if (this.terminoBusqueda) {
        infoText += ` que coinciden con <strong>"${this.escapeHtml(this.terminoBusqueda)}"</strong>`;
    }
    
    infoFiltro.innerHTML = infoText;
}

// NUEVO: Cargar marcas en el select de filtro
async cargarMarcasEnFiltro() {
    const filtroMarca = document.getElementById('filtroMarca');
    if (!filtroMarca) return;
    
    try {
        // Obtener marcas únicas de los productos
        const marcasSet = new Set();
        this.productosOriginales.forEach(producto => {
            if (producto.marca && producto.marca.trim() !== '') {
                marcasSet.add(producto.marca);
            }
        });
        
        this.marcas = Array.from(marcasSet).sort();
        
        // Limpiar y llenar el select
        filtroMarca.innerHTML = '<option value="todas">🏷️ Todas las marcas</option>';
        
        this.marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca;
            option.textContent = `🏷️ ${marca}`;
            filtroMarca.appendChild(option);
        });
        
        // Restaurar valor si existía
        if (this.filtroMarca && this.marcas.includes(this.filtroMarca)) {
            filtroMarca.value = this.filtroMarca;
        } else {
            filtroMarca.value = 'todas';
            this.filtroMarca = 'todas';
        }
        
        // Agregar event listener si no existe
        if (this.marcaChangeHandler) {
            filtroMarca.removeEventListener('change', this.marcaChangeHandler);
        }
        this.marcaChangeHandler = () => {
            this.filtroMarca = filtroMarca.value;
            this.filtrarProductos();
        };
        filtroMarca.addEventListener('change', this.marcaChangeHandler);
        
    } catch (error) {
        console.error('Error cargando marcas:', error);
    }
}

    // ==================== SELECCIÓN Y ELIMINACIÓN DE PEDIDOS ====================

    toggleSeleccionPedido(pedidoId, isChecked) {
        if (isChecked) {
            this.pedidosSeleccionados.add(pedidoId);
        } else {
            this.pedidosSeleccionados.delete(pedidoId);
        }
        this.actualizarBotonEliminarSeleccionados();
    }

    seleccionarTodosPedidos(seleccionar) {
        const pedidosFiltrados = this.obtenerPedidosFiltrados();
        
        if (seleccionar) {
            pedidosFiltrados.forEach(pedido => {
                this.pedidosSeleccionados.add(pedido.id);
            });
        } else {
            this.pedidosSeleccionados.clear();
        }
        
        this.renderizarPedidos();
        this.actualizarBotonEliminarSeleccionados();
    }

    actualizarBotonEliminarSeleccionados() {
        const btnEliminar = document.getElementById('btnEliminarSeleccionados');
        if (btnEliminar) {
            const cantidad = this.pedidosSeleccionados.size;
            btnEliminar.style.display = cantidad > 0 ? 'inline-flex' : 'none';
            btnEliminar.innerHTML = `<i class="fas fa-trash-alt me-1"></i> Eliminar seleccionados (${cantidad})`;
        }
    }

    async eliminarPedidosSeleccionados() {
        const cantidad = this.pedidosSeleccionados.size;
        
        if (cantidad === 0) {
            this.mostrarMensaje('No hay pedidos seleccionados', 'warning');
            return;
        }

        const confirmacion = confirm(`¿Estás seguro de que quieres eliminar ${cantidad} pedido(s)? Esta acción no se puede deshacer.`);
        
        if (!confirmacion) return;

        this.mostrarMensaje(`Eliminando ${cantidad} pedido(s)...`, 'info');
        
        let eliminados = 0;
        let errores = 0;

        for (const pedidoId of this.pedidosSeleccionados) {
            try {
                await this.eliminarPedidoDeFirebase(pedidoId);
                eliminados++;
            } catch (error) {
                console.error(`Error eliminando pedido ${pedidoId}:`, error);
                errores++;
            }
        }

        this.pedidosSeleccionados.clear();
        
        await this.cargarPedidos();
        
        if (errores === 0) {
            this.mostrarMensaje(`✅ ${eliminados} pedido(s) eliminados correctamente`, 'success');
        } else {
            this.mostrarMensaje(`⚠️ ${eliminados} eliminados, ${errores} errores`, 'warning');
        }
        
        this.actualizarBotonEliminarSeleccionados();
    }

    async eliminarPedido(pedidoId) {
        const confirmacion = confirm('¿Estás seguro de que quieres eliminar este pedido? Esta acción no se puede deshacer.');
        
        if (!confirmacion) return;

        try {
            await this.eliminarPedidoDeFirebase(pedidoId);
            this.mostrarMensaje('✅ Pedido eliminado correctamente', 'success');
            await this.cargarPedidos();
        } catch (error) {
            console.error('Error eliminando pedido:', error);
            this.mostrarMensaje('❌ Error al eliminar el pedido', 'danger');
        }
    }

    async eliminarPedidoDeFirebase(pedidoId) {
        await fb.db.collection("pedidos").doc(pedidoId).delete();
        
        const pagosSnapshot = await fb.db.collection("pagos").where("pedidoId", "==", pedidoId).get();
        const batch = fb.db.batch();
        pagosSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    }

    obtenerPedidosFiltrados() {
        return this.filtroEstado === 'todos' 
            ? this.pedidos 
            : this.pedidos.filter(p => p.estado === this.filtroEstado);
    }

    // ==================== SETUP DE EVENT LISTENERS ====================

    setupEventListeners() {
        // Event listeners para búsqueda
        const searchInput = document.getElementById('adminSearchInput');
        const searchBtn = document.getElementById('adminSearchBtn');
        const limpiarBtn = document.getElementById('limpiarBusqueda');
        // En setupEventListeners(), agrega:
const limpiarTodosFiltrosBtn = document.getElementById('limpiarTodosFiltros');
if (limpiarTodosFiltrosBtn) {
    limpiarTodosFiltrosBtn.addEventListener('click', () => {
        this.limpiarTodosFiltros();
    });
}
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.buscarProductos());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.buscarProductos();
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.buscarProductos());
        }
        
        if (limpiarBtn) {
            limpiarBtn.addEventListener('click', () => this.limpiarBusqueda());
        }

        // Event delegation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.estado-pedido')) {
                const select = e.target.closest('.estado-pedido');
                this.actualizarEstadoPedido(select.dataset.pedidoId, select.value);
            }
            
            if (e.target.closest('.editar-producto')) {
                const btn = e.target.closest('.editar-producto');
                this.editarProducto(btn.dataset.productoId);
            }
            
            if (e.target.closest('.eliminar-producto')) {
                const btn = e.target.closest('.eliminar-producto');
                this.eliminarProducto(btn.dataset.productoId);
            }

            if (e.target.closest('.ver-pagos')) {
                const btn = e.target.closest('.ver-pagos');
                this.verPagosPedido(btn.dataset.pedidoId);
            }

            if (e.target.closest('.eliminar-pedido')) {
                const btn = e.target.closest('.eliminar-pedido');
                this.eliminarPedido(btn.dataset.pedidoId);
            }

            if (e.target.closest('.seleccionar-pedido')) {
                const checkbox = e.target.closest('.seleccionar-pedido');
                this.toggleSeleccionPedido(checkbox.dataset.pedidoId, checkbox.checked);
            }
        });

        // Botón eliminar seleccionados
        const btnEliminarSeleccionados = document.getElementById('btnEliminarSeleccionados');
        if (btnEliminarSeleccionados) {
            btnEliminarSeleccionados.addEventListener('click', () => {
                this.eliminarPedidosSeleccionados();
            });
        }

        // Filtro de estado de pedidos
        const filtroEstado = document.getElementById('filtroEstado');
        if (filtroEstado) {
            filtroEstado.addEventListener('change', (e) => {
                this.filtroEstado = e.target.value;
                this.renderizarPedidos();
            });
        }
        
                // Event listeners para código de barras (AGREGAR ANTES DE // Guardar producto)
        const barcodeInput = document.getElementById('adminBarcodeInput');
        const barcodeBtn = document.getElementById('adminBarcodeBtn');
        const limpiarBarcodeBtn = document.getElementById('limpiarBarcodeBtn');
        
        if (barcodeInput) {
            barcodeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.buscarPorCodigoBarras();
                }
            });
            barcodeInput.addEventListener('input', () => {
                limpiarBarcodeBtn.style.display = barcodeInput.value.length ? 'inline-flex' : 'none';
            });
        }
        
        if (barcodeBtn) {
            barcodeBtn.addEventListener('click', () => this.buscarPorCodigoBarras());
        }
        
        if (limpiarBarcodeBtn) {
            limpiarBarcodeBtn.addEventListener('click', () => this.limpiarBusquedaBarcode());
        }
        // Guardar producto
        const guardarBtn = document.getElementById('guardarProducto');
        if (guardarBtn) {
            guardarBtn.addEventListener('click', () => this.guardarProducto());
        }

        // Limpiar formulario al abrir modal
        const modalProducto = document.getElementById('modalProducto');
        if (modalProducto) {
            modalProducto.addEventListener('show.bs.modal', () => {
                if (!this.currentProductoId) {
                    this.limpiarFormularioProducto();
                }
            });

            modalProducto.addEventListener('hidden.bs.modal', () => {
                this.currentProductoId = null;
                this.limpiarFormularioProducto();
            });
        }
    }

    // ==================== VER PAGOS DEL PEDIDO ====================

    async verPagosPedido(pedidoId) {
        try {
            const pagos = await fb.obtenerPagosPorPedido(pedidoId);
            
            let contenidoPagos = '';
            if (pagos.length === 0) {
                contenidoPagos = '<p class="text-muted">No hay información de pagos para este pedido.</p>';
            } else {
                contenidoPagos = pagos.map(pago => `
                    <div class="border rounded p-3 mb-2">
                        <div class="d-flex justify-content-between">
                            <div>
                                <strong>Método:</strong> ${pago.metodoPago}<br>
                                <strong>Monto:</strong> $${pago.monto?.toFixed(2) || '0.00'}<br>
                                <strong>Estado:</strong> <span class="badge bg-${pago.estado === 'approved' ? 'success' : 'warning'}">${pago.estado || 'pendiente'}</span>
                            </div>
                            <div class="text-end">
                                <small class="text-muted">${this.formatearFecha(pago.fechaCreacion)}</small>
                                ${pago.paymentId ? `<br><small><strong>ID Pago:</strong> ${pago.paymentId.substring(0, 8)}</small>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            const modalHTML = `
                <div class="modal fade" id="modalPagos" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Pagos - Pedido #${pedidoId.substring(0, 8)}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${contenidoPagos}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            const modalAnterior = document.getElementById('modalPagos');
            if (modalAnterior) modalAnterior.remove();
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            const modal = new bootstrap.Modal(document.getElementById('modalPagos'));
            modal.show();
            
        } catch (error) {
            console.error('Error cargando pagos:', error);
            this.mostrarMensaje('Error al cargar la información de pagos', 'danger');
        }
    }


   // ==================== CARGA DE DATOS ====================

async cargarDatosIniciales() {
    try {
        console.log('Cargando datos iniciales...');
        await this.cargarPedidos();
        await this.cargarCategorias();
        await this.cargarProductos();
        await this.cargarCategoriasEnSelect(); 
        console.log('Datos cargados correctamente');
    } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        this.mostrarError('Error al cargar los datos iniciales');
    }
}

async cargarPedidos() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.mostrarCargaPedidos();
    
    try {
        console.log('Cargando pedidos...');
        this.pedidos = await fb.obtenerPedidos();
        console.log(`Pedidos cargados: ${this.pedidos.length}`);
        this.renderizarPedidos();
    } catch (error) {
        console.error('Error cargando pedidos:', error);
        this.mostrarErrorPedidos('Error al cargar los pedidos');
    } finally {
        this.isLoading = false;
    }
}

async cargarCategorias() {
    try {
        console.log('Cargando categorías...');
        this.categorias = await fb.obtenerCategorias();
        console.log(`Categorías cargadas: ${this.categorias.length}`);
        this.crearFiltroCategorias();
    } catch (error) {
        console.error('Error cargando categorías:', error);
        this.mostrarMensaje('Error al cargar las categorías', 'warning');
    }
}

async cargarProductos() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.mostrarCargaProductos();
    
    try {
        console.log('Cargando productos desde Firebase...');
        this.productosOriginales = await fb.obtenerProductos();
        console.log(`Productos cargados: ${this.productosOriginales.length}`);
        
        
        await this.cargarMarcasEnFiltro();
        
        this.filtrarProductos();
    } catch (error) {
        console.error('Error cargando productos:', error);
        this.mostrarErrorProductos('Error al cargar los productos: ' + error.message);
    } finally {
        this.isLoading = false;
    }
}

    async cargarPedidos() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.mostrarCargaPedidos();
        
        try {
            this.pedidos = await fb.obtenerPedidos();
            this.renderizarPedidos();
        } catch (error) {
            console.error('Error cargando pedidos:', error);
            this.mostrarErrorPedidos('Error al cargar los pedidos');
        } finally {
            this.isLoading = false;
        }
    }

    async cargarCategorias() {
        try {
            this.categorias = await fb.obtenerCategorias();
            this.crearFiltroCategorias();
        } catch (error) {
            console.error('Error cargando categorías:', error);
            this.mostrarMensaje('Error al cargar las categorías', 'warning');
        }
    }

    async cargarProductosPorCategoria() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.mostrarCargaProductos();
    
    try {
        this.productosOriginales = await fb.obtenerProductos();
        await this.cargarMarcasEnFiltro();  // NUEVO: actualizar marcas
        this.filtrarProductos();
    } catch (error) {
        console.error('Error cargando productos:', error);
        this.mostrarErrorProductos('Error al cargar los productos');
    } finally {
        this.isLoading = false;
    }
}

// NUEVO: Limpiar todos los filtros
limpiarTodosFiltros() {
    // Limpiar búsqueda
    const searchInput = document.getElementById('adminSearchInput');
    if (searchInput) searchInput.value = '';
    this.terminoBusqueda = '';
    
    // Limpiar filtro de categoría
    const filtroCategoria = document.getElementById('filtroCategoria');
    if (filtroCategoria) filtroCategoria.value = 'todas';
    this.filtroCategoria = 'todas';
    
    // Limpiar filtro de marca
    const filtroMarca = document.getElementById('filtroMarca');
    if (filtroMarca) filtroMarca.value = 'todas';
    this.filtroMarca = 'todas';
    
    // Limpiar búsqueda por código de barras
    const barcodeInput = document.getElementById('adminBarcodeInput');
    if (barcodeInput) barcodeInput.value = '';
    
    // Aplicar filtros
    this.filtrarProductos();
    this.actualizarBotonLimpiar();
    
    this.mostrarMensaje('Todos los filtros han sido limpiados', 'info');
}

    // ==================== FILTRO DE CATEGORÍAS ====================

    crearFiltroCategorias() {
        const filtroCategoria = document.getElementById('filtroCategoria');
        if (!filtroCategoria) return;

        while (filtroCategoria.children.length > 1) {
            filtroCategoria.removeChild(filtroCategoria.lastChild);
        }

        this.categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = this.formatearCategoria(categoria);
            filtroCategoria.appendChild(option);
        });
        
        if (this.categoriaChangeHandler) {
            filtroCategoria.removeEventListener('change', this.categoriaChangeHandler);
        }
        this.categoriaChangeHandler = () => {
            this.filtroCategoria = filtroCategoria.value;
            this.filtrarProductos();
        };
        filtroCategoria.addEventListener('change', this.categoriaChangeHandler);
    }

    formatearCategoria(categoria) {
        return categoria.charAt(0).toUpperCase() + categoria.slice(1);
    }

    // ==================== RENDERIZADO DE PEDIDOS ====================

    renderizarPedidos() {
        const container = document.getElementById('listaPedidos');
        if (!container) return;

        const pedidosFiltrados = this.obtenerPedidosFiltrados();

        if (pedidosFiltrados.length === 0) {
            container.innerHTML = `
                <div class="alert alert-warning">
                    No hay pedidos ${this.filtroEstado !== 'todos' ? `con estado "${this.filtroEstado}"` : ''}
                </div>
            `;
            return;
        }

        const selectAllHtml = `
            <div class="mb-3 d-flex justify-content-between align-items-center">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="seleccionarTodosPedidos" ${this.pedidosSeleccionados.size === pedidosFiltrados.length && pedidosFiltrados.length > 0 ? 'checked' : ''}>
                    <label class="form-check-label" for="seleccionarTodosPedidos">
                        Seleccionar todos (${pedidosFiltrados.length})
                    </label>
                </div>
            </div>
        `;
        
        const fragment = document.createDocumentFragment();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = selectAllHtml;
        fragment.appendChild(wrapper.firstChild);
        
        pedidosFiltrados.forEach(pedido => {
            const pedidoElement = this.crearElementoPedido(pedido);
            fragment.appendChild(pedidoElement);
        });

        container.innerHTML = '';
        container.appendChild(fragment);
        
        const selectAllCheckbox = document.getElementById('seleccionarTodosPedidos');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                this.seleccionarTodosPedidos(e.target.checked);
            });
        }
    }

    crearElementoPedido(pedido) {
        const div = document.createElement('div');
        div.className = `card mb-3 pedido-card ${pedido.estado || 'pendiente'}`;
        
        const fecha = pedido.fecha ? this.formatearFecha(pedido.fecha) : 'Fecha no disponible';
        const cliente = pedido.cliente || {};
        const estadoPago = pedido.estadoPago || 'pendiente';
        const badgePagoColor = estadoPago === 'pagado' ? 'success' : estadoPago === 'pendiente' ? 'warning' : 'secondary';
        
        const totalCompra = pedido.total || this.calcularTotalPedido(pedido.productos);
        const isSelected = this.pedidosSeleccionados.has(pedido.id);
        
        div.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <div class="form-check mb-2">
                            <input class="form-check-input seleccionar-pedido" type="checkbox" 
                                   data-pedido-id="${pedido.id}" ${isSelected ? 'checked' : ''}>
                            <label class="form-check-label">
                                <h5 class="card-title d-inline-block mb-0">Pedido #${pedido.id.substring(0, 8)}</h5>
                            </label>
                        </div>
                        <p class="card-text mb-1"><strong>Cliente:</strong> ${cliente.nombre || 'N/A'}</p>
                        <p class="card-text mb-1"><strong>Teléfono:</strong> ${cliente.telefono || 'N/A'}</p>
                        <p class="card-text mb-1"><strong>Fecha:</strong> ${fecha}</p>
                        <p class="card-text mb-1"><strong>Total compra:</strong> <span class="fw-bold text-success">$${totalCompra.toFixed(2)}</span></p>
                        <p class="card-text mb-1"><strong>Método pago:</strong> ${pedido.metodoPago || 'N/A'}</p>
                    </div>
                    <div class="text-end ms-3">
                        <span class="badge bg-${this.getBadgeColor(pedido.estado)} mb-2 d-block">${pedido.estado || 'pendiente'}</span>
                        <span class="badge bg-${badgePagoColor} mb-2 d-block">Pago: ${estadoPago}</span>
                        <select class="form-select form-select-sm estado-pedido mb-2" data-pedido-id="${pedido.id}">
                            <option value="pendiente" ${pedido.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                            <option value="confirmado" ${pedido.estado === 'confirmado' ? 'selected' : ''}>Confirmado</option>
                            <option value="enviado" ${pedido.estado === 'enviado' ? 'selected' : ''}>Enviado</option>
                            <option value="entregado" ${pedido.estado === 'entregado' ? 'selected' : ''}>Entregado</option>
                        </select>
                        <div class="btn-group-vertical w-100">
                            <button class="btn btn-sm btn-outline-info ver-pagos" data-pedido-id="${pedido.id}">
                                <i class="fas fa-money-bill me-1"></i>Ver Pagos
                            </button>
                            <button class="btn btn-sm btn-outline-danger eliminar-pedido mt-1" data-pedido-id="${pedido.id}">
                                <i class="fas fa-trash-alt me-1"></i>Eliminar Pedido
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <h6>Productos:</h6>
                    <div class="table-responsive">
                        <table class="table table-sm table-bordered">
                            <thead class="table-light">
                                <tr>
                                    <th>Código de Barras</th>
                                    <th>Producto</th>
                                    <th width="80">Cantidad</th>
                                    <th width="100">Precio</th>
                                    <th width="100">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.renderizarProductosPedido(pedido.productos)}
                            </tbody>
                            <tfoot class="table-light">
                                <tr>
                                    <td colspan="4" class="text-end fw-bold">TOTAL:</td>
                                    <td class="text-end fw-bold text-success">$${totalCompra.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        `;

        return div;
    }

    calcularTotalPedido(productos) {
        if (!productos || !Array.isArray(productos)) return 0;
        
        return productos.reduce((total, p) => {
            let cantidad = p.cantidad || 0;
            if (p.cantidadPersonalizada && p.cantidadPersonalizadaValor) {
                cantidad = p.cantidadPersonalizadaValor;
            }
            return total + ((p.precio || 0) * cantidad);
        }, 0);
    }

   renderizarProductosPedido(productos) {
    if (!productos || !Array.isArray(productos)) {
        return '<tr><td colspan="5" class="text-center">No hay información de productos</td></tr>';
    }

    return productos.map(p => {
        const codigoBarras = p.codigoBarras || p.codigo || 'N/A';
        let cantidad = p.cantidad || 0;
        let unidad = '';
        
        // Determinar la unidad según el tipo de producto
        if (p.cantidadPersonalizada && p.cantidadPersonalizadaValor) {
            cantidad = p.cantidadPersonalizadaValor;
            // Usar la unidad guardada en el pedido o determinar por unidadMedidaOriginal
            const unidadMedida = (p.unidadMedidaOriginal || p.unidad || '').toLowerCase();
            if (unidadMedida === 'g' || unidadMedida === 'gramo') {
                unidad = ' g';
            } else if (unidadMedida === 'kg' || unidadMedida === 'kilogramo') {
                unidad = ' kg';
            } else if (unidadMedida === 'l' || unidadMedida === 'litro') {
                unidad = ' L';
            } else {
                unidad = p.unidad ? ` ${p.unidad}` : ' kg';
            }
        }
        
        const subtotal = (p.precio || 0) * cantidad;
        
        return `
            <tr>
                <td><small class="font-monospace">${this.escapeHtml(codigoBarras)}</small></td>
                <td>${this.escapeHtml(p.nombre || 'Producto')}</td>
                <td class="text-center">${cantidad}${unidad}</td>
                <td class="text-end">$${(p.precio || 0).toFixed(2)}</td>
                <td class="text-end">$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    }).join('');
}

    // ==================== RENDERIZADO DE PRODUCTOS ====================

    renderizarProductos() {
        const container = document.getElementById('listaProductos');
        if (!container) return;

        if (this.productos.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center">
                        <i class="fas fa-box-open me-2"></i>
                        No hay productos ${this.filtroCategoria !== 'todas' ? `en la categoría "${this.formatearCategoria(this.filtroCategoria)}"` : 'disponibles'}
                        ${this.terminoBusqueda ? ` que coincidan con "${this.escapeHtml(this.terminoBusqueda)}"` : ''}
                    </div>
                </div>
            `;
            return;
        }

        const fragment = document.createDocumentFragment();
        
        this.productos.forEach(producto => {
            const productoElement = this.crearElementoProducto(producto);
            fragment.appendChild(productoElement);
        });

        container.innerHTML = '';
        container.appendChild(fragment);
    }

    crearElementoProducto(producto) {
    const col = document.createElement('div');
    col.setAttribute('data-producto-id', producto.id);
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    const codigoBarras = producto.codigoBarras || producto.codigo || 'Sin código';
    
    col.innerHTML = `
        <div class="card h-100 tarjeta">
            <div class="tarjeta-img-container">
                <img src="img/${producto.imagen}" class="card-img-top" alt="${producto.nombre}" 
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==">
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${this.escapeHtml(producto.nombre)}</h5>
                <p class="card-text flex-grow-1">${this.escapeHtml(producto.descripcion) || 'Sin descripción'}</p>
                <div class="mt-auto">
                    <p class="price">$${producto.precio?.toFixed(2) || '0.00'}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-${producto.stock > 0 ? 'success' : 'danger'}">
                            Stock: ${producto.stock || 0}
                        </span>
                        <span class="badge bg-secondary">${producto.categoria || 'Sin categoría'}</span>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted font-monospace d-block">📦 Código: ${this.escapeHtml(codigoBarras)}</small>
                        ${producto.proveedor ? `<small class="text-muted d-block">🏭 Proveedor: ${this.escapeHtml(producto.proveedor)}</small>` : ''}
                        ${producto.marca ? `<small class="text-muted d-block">⭐ Marca: ${this.escapeHtml(producto.marca)}</small>` : ''}
                    </div>
                    ${producto.destacado ? '<span class="badge bg-warning mb-2">Destacado</span>' : ''}
                    
                    <div class="btn-group w-100">
                        <button class="btn btn-outline-primary btn-sm editar-producto" data-producto-id="${producto.id}">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-outline-danger btn-sm eliminar-producto" data-producto-id="${producto.id}">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return col;
}

    // ==================== CRUD DE PRODUCTOS ====================

    // En admin.js, agrega este nuevo método para cargar categorías en el select
async cargarCategoriasEnSelect() {
    const selectCategoria = document.getElementById('productoCategoria');
    if (!selectCategoria) return;
    
    try {
        // Obtener categorías desde Firebase (misma fuente que categorias.js)
        const categorias = await fb.obtenerCategorias();
        
        // Categorías predefinidas por si Firebase no tiene todas
        const categoriasPredefinidas = [
            'abarrotes', 'bebidas', 'bebidas_alcoholicas', 'botanas', 'carnes', 'cafe',
            'cereales', 'condimentos', 'congelados', 'conservas', 'cuidado_bebe',
            'cuidado_personal', 'deportes', 'dulces', 'electronica', 'enlatados', 'energizantes',
            'especias', 'farmacia', 'ferreteria', 'frutas', 'galletas', 'granos', 'harinas',
            'hogar', 'huevos', 'jardin', 'juguetes', 'lacteos', 'libros',
            'limpieza', 'mascotas', 'panaderia', 'pastas', 'postres', 'quesos',
            'ropa', 'sopas', 'tabaco', 'utensilios', 'verduras'
        ];
        
        // Combinar categorías de Firebase con predefinidas
        const todasCategorias = new Set([...categoriasPredefinidas, ...categorias]);
        const categoriasOrdenadas = Array.from(todasCategorias).sort();
        
        // Guardar valor seleccionado actual
        const valorActual = selectCategoria.value;
        
        // Limpiar y llenar el select
        selectCategoria.innerHTML = '<option value="">Seleccionar categoría...</option>';
        
        categoriasOrdenadas.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = this.formatearNombreCategoria(categoria);
            selectCategoria.appendChild(option);
        });
        
        // Restaurar valor si existía
        if (valorActual && categoriasOrdenadas.includes(valorActual)) {
            selectCategoria.value = valorActual;
        }
        
    } catch (error) {
        console.error('Error cargando categorías en select:', error);
        // Fallback: cargar solo las predefinidas
        this.cargarCategoriasPredefinidasEnSelect();
    }
}

// Método de respaldo para cargar categorías predefinidas
cargarCategoriasPredefinidasEnSelect() {
    const selectCategoria = document.getElementById('productoCategoria');
    if (!selectCategoria) return;
    
    const categorias = [
        'abarrotes', 'bebidas', 'bebidas_alcoholicas', 'botanas', 'carnes', 'cafe',
        'cereales', 'condimentos', 'congelados', 'conservas', 'cuidado_bebe',
        'cuidado_personal', 'deportes', 'dulces', 'electronica', 'enlatados', 'energizantes',
        'especias', 'farmacia', 'ferreteria', 'frutas', 'granos', 'harinas',
        'hogar', 'huevos', 'jardin', 'juguetes', 'lacteos', 'libros',
        'limpieza', 'mascotas', 'panaderia', 'pastas', 'postres', 'quesos',
        'ropa', 'sopas', 'tabaco', 'utensilios', 'verduras'
    ];
    
    selectCategoria.innerHTML = '<option value="">Seleccionar categoría...</option>';
    
    categorias.sort().forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = this.formatearNombreCategoria(categoria);
        selectCategoria.appendChild(option);
    });
}

// Método para formatear nombre de categoría (igual que en categorias.js)
formatearNombreCategoria(categoria) {
    const nombres = {
        'abarrotes': '🛒 Abarrotes',
        'bebidas': '🥤 Bebidas',
        'bebidas_alcoholicas': '🍺 Bebidas Alcohólicas',
        'botanas': '🍿 Botanas',
        'cafe': '☕ Café',
        'carnes': '🥩 Carnes',
        'cereales': '🌾 Cereales',
        'condimentos': '🧂 Condimentos',
        'congelados': '🧊 Congelados',
        'conservas': '🥫 Conservas',
        'cuidado_bebe': '👶 Cuidado del Bebé',
        'cuidado_personal': '🧴 Cuidado Personal',
        'deportes': '⚽ Deportes',
        'dulces': '🍬 Dulces',
        'electronica': '🔌 Electrodomésticos',
        'enlatados': '🥫 Enlatados',
        'energizantes': '⚡ Energizantes', 
        'especias': '🌶️ Especias',
        'farmacia': '💊 Farmacia',
        'ferreteria': '🛠️ Ferretería',
        'frutas': '🍎 Frutas',
        'granos': '🫘 Granos',
        'harinas': '🌾 Harinas',
        'hogar': '🏠 Hogar',
        'huevos': '🥚 Huevos',
        'jardin': '🌻 Jardín',
        'juguetes': '🧸 Juguetes',
        'lacteos': '🥛 Lácteos',
        'libros': '📚 Libros',
        'limpieza': '🧼 Limpieza',
        'mascotas': '🐾 Mascotas',
        'panaderia': '🥖 Panadería',
        'pastas': '🍝 Pastas',
        'postres': '🍰 Postres',
        'quesos': '🧀 Quesos', 
        'ropa': '👕 Ropa',
        'sopas': '🍜 Sopas',
        'tabaco': '🚬 Tabaco',
        'utensilios': '🍽️ Utensilios',
        'verduras': '🌾 Verduras'
    };
    
    return nombres[categoria] || `📁 ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;
}

async editarProducto(productoId) {
    try {
        const producto = this.productos.find(p => p.id === productoId);
        if (!producto) {
            this.mostrarMensaje('Producto no encontrado', 'warning');
            return;
        }

        this.currentProductoId = productoId;

        // Cargar categorías en el select antes de llenar el formulario
        await this.cargarCategoriasEnSelect();
        
        // Datos básicos
        document.getElementById('productoId').value = producto.id;
        document.getElementById('productoNombre').value = producto.nombre || '';
        document.getElementById('productoPrecio').value = producto.precio || '';
        document.getElementById('productoCategoria').value = producto.categoria || '';
        document.getElementById('productoStock').value = producto.stock || 0;
        document.getElementById('productoImagen').value = producto.imagen || '';
        document.getElementById('productoDescripcion').value = producto.descripcion || '';
        document.getElementById('productoDestacado').checked = producto.destacado || false;
        
        // Nuevos campos
        document.getElementById('productoCodigoBarras').value = producto.codigoBarras || '';
        document.getElementById('productoProveedor').value = producto.proveedor || '';
        document.getElementById('productoMarca').value = producto.marca || '';
        document.getElementById('productoPesoVolumen').value = producto.pesoVolumen || '';
        document.getElementById('productoUnidadMedida').value = producto.unidadMedida || 'PZ';
        document.getElementById('productoPrecioCompra').value = producto.precioCompra || '';
        document.getElementById('productoPuntoReorden').value = producto.puntoReorden || '';
        
        // Formatear fecha para input date (YYYY-MM-DD)
        if (producto.fechaVencimiento) {
            let fechaVencimiento = producto.fechaVencimiento;
            if (fechaVencimiento && fechaVencimiento.toDate) {
                fechaVencimiento = fechaVencimiento.toDate().toISOString().split('T')[0];
            }
            document.getElementById('productoFechaVencimiento').value = fechaVencimiento;
        } else {
            document.getElementById('productoFechaVencimiento').value = '';
        }

        document.getElementById('modalProductoTitulo').textContent = 'Editar Producto';

        const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
        modal.show();
    } catch (error) {
        console.error('Error preparando edición:', error);
        this.mostrarMensaje('Error al cargar el producto para editar', 'danger');
    }
}

    async eliminarProducto(productoId) {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            return;
        }

        try {
            await fb.eliminarProducto(productoId);
            await this.cargarProductosPorCategoria();
            this.mostrarMensaje('Producto eliminado correctamente', 'success');
        } catch (error) {
            console.error('Error eliminando producto:', error);
            this.mostrarMensaje('Error al eliminar el producto', 'danger');
        }
    }

    async guardarProducto() {
    const form = document.getElementById('formProducto');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        this.mostrarMensaje('Por favor, completa todos los campos requeridos', 'warning');
        return;
    }

    const productoId = document.getElementById('productoId').value;
    
    // Obtener fecha de vencimiento
    let fechaVencimiento = document.getElementById('productoFechaVencimiento').value;
    
    const productoData = {
        nombre: document.getElementById('productoNombre').value.trim(),
        precio: parseFloat(document.getElementById('productoPrecio').value),
        categoria: document.getElementById('productoCategoria').value,
        stock: parseFloat(document.getElementById('productoStock').value),
        imagen: document.getElementById('productoImagen').value.trim(),
        descripcion: document.getElementById('productoDescripcion').value.trim(),
        destacado: document.getElementById('productoDestacado').checked,
        codigoBarras: document.getElementById('productoCodigoBarras').value.trim(),
        proveedor: document.getElementById('productoProveedor').value.trim(),
        marca: document.getElementById('productoMarca').value.trim(),
        pesoVolumen: parseFloat(document.getElementById('productoPesoVolumen').value) || null,
        unidadMedida: document.getElementById('productoUnidadMedida').value,
        precioCompra: parseFloat(document.getElementById('productoPrecioCompra').value) || null,
        puntoReorden: parseInt(document.getElementById('productoPuntoReorden').value) || 0,
        
        fechaActualizacion: new Date()
    };
    
    // Solo agregar fechaVencimiento si tiene valor
    if (fechaVencimiento) {
        productoData.fechaVencimiento = fechaVencimiento;
    }

    // Validaciones
    if (productoData.precio <= 0) {
        this.mostrarMensaje('El precio debe ser mayor a 0', 'warning');
        document.getElementById('productoPrecio').focus();
        return;
    }

    if (productoData.stock < 0) {
        this.mostrarMensaje('El stock no puede ser negativo', 'warning');
        document.getElementById('productoStock').focus();
        return;
    }

    if (!productoData.imagen) {
        this.mostrarMensaje('Debes proporcionar una imagen', 'warning');
        document.getElementById('productoImagen').focus();
        return;
    }

    const guardarBtn = document.getElementById('guardarProducto');
    const originalText = guardarBtn.innerHTML;
    guardarBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Guardando...';
    guardarBtn.disabled = true;

    try {
        if (productoId) {
            await fb.actualizarProducto(productoId, productoData);
            this.mostrarMensaje('✅ Producto actualizado correctamente', 'success');
        } else {
            // Para nuevo producto, agregar fechaCreacion
            productoData.fechaCreacion = new Date();
            await fb.agregarProducto(productoData);
            this.mostrarMensaje('✅ Producto agregado correctamente', 'success');
        }

        await Promise.all([
            this.cargarCategorias(),
            this.cargarProductosPorCategoria()
        ]);

        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
            if (modal) modal.hide();
        }, 1000);

    } catch (error) {
        console.error('Error guardando producto:', error);
        this.mostrarMensaje(`❌ Error al guardar el producto: ${error.message}`, 'danger');
    } finally {
        guardarBtn.innerHTML = originalText;
        guardarBtn.disabled = false;
    }
}

    limpiarFormularioProducto() {
    document.getElementById('formProducto').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('modalProductoTitulo').textContent = 'Agregar Producto';
    
    // Resetear valores por defecto
    document.getElementById('productoUnidadMedida').value = 'PZ';
    document.getElementById('productoStock').value = 0;
    document.getElementById('productoPuntoReorden').value = 0;
    document.getElementById('productoDestacado').checked = false;
    
    // Recargar categorías en el select para nuevo producto
    this.cargarCategoriasEnSelect();
}

    // ==================== ACTUALIZACIÓN DE PEDIDOS Y STOCK ====================

    async actualizarEstadoPedido(pedidoId, nuevoEstado) {
        try {
            const pedido = this.pedidos.find(p => p.id === pedidoId);
            if (!pedido) {
                throw new Error('Pedido no encontrado');
            }
            const estadoAnterior = pedido.estado;

            await fb.actualizarEstadoPedido(pedidoId, nuevoEstado);
            
            if (nuevoEstado === 'entregado' && estadoAnterior !== 'entregado') {
                await this.restarStockDePedido(pedido);
                await this.cargarProductosPorCategoria();
            }

            pedido.estado = nuevoEstado;
            await this.cargarPedidos();
            
            this.mostrarMensaje('Estado actualizado correctamente', 'success');
        } catch (error) {
            console.error('Error actualizando estado:', error);
            this.mostrarMensaje('Error al actualizar el estado o stock: ' + error.message, 'danger');
        }
    }

    async restarStockDePedido(pedido) {
        if (!pedido.productos || pedido.productos.length === 0) return;

        for (const item of pedido.productos) {
            let cantidadReal = item.cantidad;
            if (item.cantidadPersonalizada && item.cantidadPersonalizadaValor) {
                cantidadReal = item.cantidadPersonalizadaValor;
            }

            try {
                const producto = await fb.obtenerProductoPorId(item.id);
                if (!producto) {
                    console.error(`Producto ${item.id} no encontrado`);
                    continue;
                }
                const nuevoStock = (producto.stock || 0) - cantidadReal;
                if (nuevoStock < 0) {
                    await fb.actualizarProducto(item.id, { stock: 0 });
                } else {
                    await fb.actualizarProducto(item.id, { stock: nuevoStock });
                }
            } catch (error) {
                console.error(`Error actualizando stock de ${item.id}:`, error);
                throw error;
            }
        }
    }

    // ==================== MÉTODOS DE UTILIDAD ====================

    formatearFecha(fechaFirestore) {
        try {
            if (fechaFirestore?.toDate) {
                return fechaFirestore.toDate().toLocaleDateString('es-MX');
            }
            return 'Fecha no disponible';
        } catch (error) {
            return 'Fecha no disponible';
        }
    }

    getBadgeColor(estado) {
        const colores = {
            pendiente: 'warning',
            confirmado: 'info',
            enviado: 'primary',
            entregado: 'success'
        };
        return colores[estado] || 'secondary';
    }

    mostrarCargaPedidos() {
        const container = document.getElementById('listaPedidos');
        if (container) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando pedidos...</span>
                    </div>
                    <p class="mt-2 text-muted">Cargando pedidos...</p>
                </div>
            `;
        }
    }

    mostrarErrorPedidos(mensaje) {
        const container = document.getElementById('listaPedidos');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>${mensaje}
                </div>
            `;
        }
    }

    mostrarCargaProductos() {
        const container = document.getElementById('listaProductos');
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando productos...</span>
                    </div>
                    <p class="mt-2 text-muted">Cargando productos...</p>
                </div>
            `;
        }
    }

    mostrarErrorProductos(mensaje) {
        const container = document.getElementById('listaProductos');
        if (container) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>${mensaje}
                    </div>
                </div>
            `;
        }
    }

    mostrarMensaje(mensaje, tipo = 'info') {
        const toastContainer = document.getElementById('toastContainer') || this.crearToastContainer();
        
        const toastId = 'toast-' + Date.now();
        const toastEl = document.createElement('div');
        toastEl.id = toastId;
        toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;
        toastEl.setAttribute('role', 'alert');
        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas ${this.getToastIcon(tipo)} me-2"></i>
                    ${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        toastContainer.appendChild(toastEl);
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });
        
        toast.show();
        
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }

    getToastIcon(tipo) {
        const icons = {
            'success': 'fa-check-circle',
            'danger': 'fa-exclamation-triangle',
            'warning': 'fa-exclamation-circle',
            'info': 'fa-info-circle'
        };
        return icons[tipo] || 'fa-info-circle';
    }

    crearToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(container);
        return container;
    }

    mostrarError(mensaje) {
        this.mostrarMensaje(mensaje, 'danger');
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    fb.auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = "login.html";
        } else {
            window.adminManager = new AdminManager();
        }
    });
});