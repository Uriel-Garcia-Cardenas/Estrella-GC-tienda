// js/categorias.js - Manejo de categorías y marcas

class ManejadorCategorias {
  constructor() {
    this.categorias = new Set();
    this.marcas = new Set();
    this.productos = [];
    this.categoriaActual = 'todas';
    this.marcaActual = 'todas';  // Nueva variable para filtro de marca
  }

  // Extraer categorías y marcas únicas de los productos
  extraerCategorias(productos) {
    this.productos = productos;
    this.categorias = new Set(productos.map(p => p.categoria).filter(Boolean));
    this.marcas = new Set(productos.map(p => p.marca).filter(Boolean));
    
    // Ordenar marcas alfabéticamente
    this.marcas = new Set([...this.marcas].sort());
    
    // Renderizar en todos los lugares
    this.renderizarCategorias();
    this.renderizarCategoriasDropdown();
    this.renderizarMarcas();  // NUEVO: renderizar marcas
    this.renderizarMarcasDropdown(); // NUEVO: marcas en dropdown móvil

    return this.categorias;
  }

  // Renderizar navegación de categorías (botones)
  renderizarCategorias() {
    const contenedor = document.getElementById('categoriasNav');
    if (!contenedor) return;

    const categoriasArray = ['todas', ...Array.from(this.categorias)].sort();
    
    contenedor.innerHTML = categoriasArray.map(categoria => `
      <button class="btn btn-outline-primary btn-categoria ${categoria === this.categoriaActual ? 'active' : ''}" 
              data-categoria="${categoria}">
        ${this.formatearNombreCategoria(categoria)}
      </button>
    `).join('');

    // Agregar event listeners
    document.querySelectorAll('.btn-categoria').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filtrarPorCategoria(e.target.dataset.categoria);
      });
    });
  }

  // NUEVO: Renderizar navegación de marcas (botones)
  renderizarMarcas() {
    const contenedor = document.getElementById('marcasNav');
    if (!contenedor) return;

    const marcasArray = ['todas', ...Array.from(this.marcas)].sort();
    
    // Limitar a mostrar máximo 15 marcas para no saturar, el resto en "Ver más"
    const marcasMostrar = marcasArray.slice(0, 16);
    const tieneMas = marcasArray.length > 16;
    
    contenedor.innerHTML = marcasMostrar.map(marca => `
      <button class="btn btn-outline-secondary btn-marca ${marca === this.marcaActual ? 'active' : ''}" 
              data-marca="${marca}">
        ${this.formatearNombreMarca(marca)}
      </button>
    `).join('');
    
    if (tieneMas) {
      contenedor.innerHTML += `
        <div class="dropdown d-inline-block">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            Ver más marcas
          </button>
          <ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
            ${marcasArray.slice(16).map(marca => `
              <li><a class="dropdown-item btn-marca-dropdown" href="#" data-marca="${marca}">${this.formatearNombreMarca(marca)}</a></li>
            `).join('')}
          </ul>
        </div>
      `;
      
      // Event listeners para dropdown de marcas
      document.querySelectorAll('.btn-marca-dropdown').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.filtrarPorMarca(e.target.dataset.marca);
        });
      });
    }

    // Agregar event listeners a los botones de marca
    document.querySelectorAll('.btn-marca').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filtrarPorMarca(e.target.dataset.marca);
      });
    });
  }

  // NUEVO: Renderizar marcas en dropdown de la navbar (móvil)
  renderizarMarcasDropdown() {
    const contenedor = document.getElementById('marcasDropdown');
    if (!contenedor) return;

    const marcasArray = ['todas', ...Array.from(this.marcas)].sort();
    
    contenedor.innerHTML = marcasArray.map(marca => `
      <li>
        <a class="dropdown-item btn-marca-dropdown-item" href="#" data-marca="${marca}">
          ${this.formatearNombreMarca(marca)}
        </a>
      </li>
    `).join('');

    // Agregar event listeners para el dropdown de marcas
    document.querySelectorAll('.btn-marca-dropdown-item').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.filtrarPorMarca(e.target.dataset.marca);
        
        // Cerrar dropdown en móvil
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }

  // Renderizar categorías en el dropdown de la navbar
  renderizarCategoriasDropdown() {
    const contenedor = document.getElementById('categoriasDropdown');
    if (!contenedor) return;

    const categoriasArray = ['todas', ...Array.from(this.categorias)].sort();
    
    contenedor.innerHTML = categoriasArray.map(categoria => `
      <li>
        <a class="dropdown-item btn-categoria-dropdown" href="#" data-categoria="${categoria}">
          ${this.formatearNombreCategoria(categoria)}
        </a>
      </li>
    `).join('');

    // Agregar event listeners para el dropdown
    document.querySelectorAll('.btn-categoria-dropdown').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.filtrarPorCategoria(e.target.dataset.categoria);
        
        // Cerrar dropdown en móvil
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }

  // NUEVO: Filtrar por marca
  filtrarPorMarca(marca) {
    this.marcaActual = marca;
    this.categoriaActual = 'todas'; // Resetear categoría al filtrar por marca
    
    // Actualizar UI de marcas (botones)
    document.querySelectorAll('.btn-marca').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.marca === marca);
    });

    // Actualizar UI del dropdown de marcas
    document.querySelectorAll('.btn-marca-dropdown-item').forEach(link => {
      const isActive = link.dataset.marca === marca;
      link.classList.toggle('active', isActive);
      link.classList.toggle('text-white', isActive);
      link.classList.toggle('bg-primary', isActive);
    });

    // Actualizar UI de categorías (resetear active)
    document.querySelectorAll('.btn-categoria, .btn-categoria-dropdown').forEach(btn => {
      btn.classList.remove('active');
      if (btn.classList.contains('btn-categoria-dropdown')) {
        btn.classList.remove('text-white', 'bg-primary');
      }
    });

    // Mostrar/ocultar filtro activo
    const filtroActivo = document.getElementById('filtroActivo');
    const categoriaActual = document.getElementById('categoriaActual');
    
    if (marca === 'todas') {
      filtroActivo.style.display = 'none';
    } else {
      filtroActivo.style.display = 'flex';
      categoriaActual.textContent = this.formatearNombreMarca(marca);
    }

    // Renderizar productos filtrados
    this.renderizarProductos();
    
    // Scroll suave a los productos
    const productosSection = document.querySelector('.productos');
    if (productosSection) {
      productosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Filtrar productos por categoría
  filtrarPorCategoria(categoria) {
    this.categoriaActual = categoria;
    this.marcaActual = 'todas'; // Resetear marca al filtrar por categoría
    
    // Actualizar UI de categorías (botones)
    document.querySelectorAll('.btn-categoria').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.categoria === categoria);
    });

    // Actualizar UI del dropdown de categorías
    document.querySelectorAll('.btn-categoria-dropdown').forEach(link => {
      const isActive = link.dataset.categoria === categoria;
      link.classList.toggle('active', isActive);
      link.classList.toggle('text-white', isActive);
      link.classList.toggle('bg-primary', isActive);
    });

    // Resetear UI de marcas
    document.querySelectorAll('.btn-marca, .btn-marca-dropdown-item').forEach(btn => {
      btn.classList.remove('active');
      if (btn.classList.contains('btn-marca-dropdown-item')) {
        btn.classList.remove('text-white', 'bg-primary');
      }
    });

    // Mostrar/ocultar filtro activo
    const filtroActivo = document.getElementById('filtroActivo');
    const categoriaActual = document.getElementById('categoriaActual');
    
    if (categoria === 'todas') {
      filtroActivo.style.display = 'none';
    } else {
      filtroActivo.style.display = 'flex';
      categoriaActual.textContent = this.formatearNombreCategoria(categoria);
    }

    // Renderizar productos filtrados
    this.renderizarProductos();
    
    // Scroll suave a los productos
    const productosSection = document.querySelector('.productos');
    if (productosSection) {
      productosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Renderizar productos organizados
  renderizarProductos() {
    const contenedor = document.getElementById('productosPorCategoria');
    if (!contenedor) return;

    let productosFiltrados = this.productos;
    
    // Aplicar filtro por categoría
    if (this.categoriaActual !== 'todas') {
      productosFiltrados = productosFiltrados.filter(p => p.categoria === this.categoriaActual);
    }
    
    // Aplicar filtro por marca
    if (this.marcaActual !== 'todas') {
      productosFiltrados = productosFiltrados.filter(p => p.marca === this.marcaActual);
    }

    if (productosFiltrados.length === 0) {
      contenedor.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-warning">
            <h4>No hay productos</h4>
            <p>No se encontraron productos con los filtros seleccionados</p>
          </div>
        </div>
      `;
      return;
    }

    // Si estamos filtrando por marca O por categoría, mostrar lista simple agrupada por marca
    if (this.marcaActual !== 'todas') {
      // Filtrando por marca específica: mostrar solo productos de esa marca (sin subgrupos)
      this.renderizarListaSimple(contenedor, productosFiltrados);
    } else if (this.categoriaActual !== 'todas') {
      // Filtrando por categoría: mostrar productos agrupados por marca dentro de la categoría
      this.renderizarPorMarcas(contenedor, productosFiltrados);
    } else {
      // Mostrar todos: categorías → marcas → productos
      this.renderizarPorCategoriasYMarcas(contenedor);
    }
  }

  // NUEVO: Renderizar productos agrupados por marcas (cuando se filtra por categoría)
  renderizarPorMarcas(contenedor, productos) {
    const productosPorMarca = this.agruparPorMarca(productos);
    const marcasOrdenadas = Array.from(productosPorMarca.keys()).sort();
    
    contenedor.innerHTML = marcasOrdenadas.map(marca => {
      const productosMarca = productosPorMarca.get(marca);
      
      if (productosMarca.length === 0) return '';
      
      return `
        <div class="categoria-section mb-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="categoria-titulo">${this.formatearNombreMarca(marca)}</h3>
            <span class="badge bg-primary">${productosMarca.length} productos</span>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            ${productosMarca.map(producto => this.crearCardProducto(producto)).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // NUEVO: Renderizar todo organizado por Categoría → Marca → Productos
  renderizarPorCategoriasYMarcas(contenedor) {
    const productosPorCategoria = this.agruparPorCategoria();
    
    contenedor.innerHTML = Array.from(this.categorias).map(categoria => {
      const productosCategoria = productosPorCategoria[categoria] || [];
      
      if (productosCategoria.length === 0) return '';
      
      // Agrupar productos de esta categoría por marca
      const productosPorMarca = this.agruparPorMarca(productosCategoria);
      const marcasOrdenadas = Array.from(productosPorMarca.keys()).sort();
      
      return `
        <div class="categoria-section mb-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="categoria-titulo">${this.formatearNombreCategoria(categoria)}</h3>
            <span class="badge bg-primary">${productosCategoria.length} productos</span>
          </div>
          
          ${marcasOrdenadas.map(marca => `
            <div class="marca-subseccion mb-4">
              <h4 class="marca-titulo h5 text-secondary mb-3">
                <i class="fas fa-tag me-2"></i>${this.formatearNombreMarca(marca)}
              </h4>
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                ${productosPorMarca.get(marca).map(producto => this.crearCardProducto(producto)).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  }

  // Renderizar lista simple (cuando se filtra por una marca específica)
  renderizarListaSimple(contenedor, productos) {
    contenedor.innerHTML = `
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        ${productos.map(producto => this.crearCardProducto(producto)).join('')}
      </div>
    `;
  }

  // Agrupar productos por categoría
  agruparPorCategoria() {
    return this.productos.reduce((grupos, producto) => {
      const categoria = producto.categoria || 'sin-categoria';
      if (!grupos[categoria]) grupos[categoria] = [];
      grupos[categoria].push(producto);
      return grupos;
    }, {});
  }

  // NUEVO: Agrupar productos por marca
  agruparPorMarca(productos) {
    const mapa = new Map();
    productos.forEach(producto => {
      const marca = producto.marca || 'Sin marca';
      if (!mapa.has(marca)) mapa.set(marca, []);
      mapa.get(marca).push(producto);
    });
    return mapa;
  }

  // Formatear nombre de categoría para mostrar
  formatearNombreCategoria(categoria) {
    if (categoria === 'todas') return '📦 Todos los productos';
    
    // En categorias.js, dentro del método formatearNombreCategoria()
const nombres = {
    'bebidas': '🥤 Bebidas',
    'cafe': '☕ Café',  // <-- NUEVO: Café
    'condimentos': '🧂 Condimentos',
    'botanas': '🍿 Botanas',
    'utensilios': '🍽️ Utensilios',
    'bebidas_alcoholicas': '🍺 Bebidas Alcohólicas',
    'energizantes': '⚡ Energizantes',  // <-- NUEVO: Energizantes
    'huevos': '🥚 Huevos',
    'cuidado_personal': '🧴 Cuidado Personal',
    'cuidado_bebe': '👶 Cuidado del Bebé',
    'limpieza': '🧼 Limpieza',
    'abarrotes': '🛒 Abarrotes',
    'lacteos': '🥛 Lácteos',
    'quesos': '🧀 Quesos',
    'galletas': '🍪 Galletas',
    'verduras': '🌾 Verduras',
    'frutas': '🍎 Frutas',
    'panaderia': '🥖 Panadería',
    'carnes': '🥩 Carnes',
    'congelados': '🧊 Congelados',
    'enlatados': '🥫 Enlatados',
    'cereales': '🌾 Cereales',
    'dulces': '🍬 Dulces',
    'mascotas': '🐾 Mascotas',
    'electronica': '🔌 Electrodomésticos',
    'ropa': '👕 Ropa',
    'juguetes': '🧸 Juguetes',
    'deportes': '⚽ Deportes',
    'libros': '📚 Libros',
    'jardin': '🌻 Jardín',
    'ferreteria': '🛠️ Ferretería',
    'farmacia': '💊 Farmacia',
    'automotriz': '🚗 Automotriz',
    'conservas': '🥫 Conservas',
    'especias': '🌶️ Especias',
    'granos': '🫘 Granos',
    'harinas': '🌾 Harinas',
    'hogar': '🏠 Hogar',
    'pastas': '🍝 Pastas',
    'postres': '🍰 Postres',
    'sopas': '🍜 Sopas',
    'tabaco': '🚬 Tabaco'
};

    return nombres[categoria] || `📁 ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;
  }

  // NUEVO: Formatear nombre de marca para mostrar
  formatearNombreMarca(marca) {
    if (marca === 'todas') return '🏷️ Todas las marcas';
    return `🏷️ ${marca}`;
  }

  // Crear card de producto (reutilizable)
  // Crear card de producto (reutilizable)
crearCardProducto(producto) {
  //const categoriasCantidadPersonalizada = ['verduras', 'huevos', 'frutas', 'carnes'];
  //const necesitaCantidadPersonalizada = categoriasCantidadPersonalizada.includes(producto.categoria);
  //const precioPorUnidad = producto.precio;
  const unidadMedida = (producto.unidadMedida || '').toLowerCase();
  const unidadesPersonalizadas = ['kg', 'kilogramo', 'g', 'gramo'];
  const necesitaCantidadPersonalizada = unidadesPersonalizadas.includes(unidadMedida);
  const precioPorUnidad = producto.precio;
  
  // Obtener código de barras (puede venir como 'codigoBarras' o 'codigo')
  const codigoBarras = producto.codigoBarras || producto.codigo || '';

  let controlCantidad = '';
  if (necesitaCantidadPersonalizada) {
    controlCantidad = `
      <div class="cantidad-personalizada mt-3">
        <label class="form-label small">Cantidad (kg):</label>
        <div class="input-group input-group-sm">
          <button class="btn btn-outline-secondary btn-decrementar" type="button">-</button>
          <input type="number" class="form-control text-center cantidad-input" data-id="${producto.id}" value="1" step="0.1" min="0.1"data-unidad="${unidadMedida}">
          <button class="btn btn-outline-secondary btn-incrementar" type="button">+</button>
        </div>
        <div class="precio-calculado mt-2">
          <small class="text-muted">Total: <strong class="text-success">$${precioPorUnidad.toFixed(2)}</strong></small>
        </div>
      </div>
    `;
  } else {
    controlCantidad = `
      <div class="cantidad-unidad mt-3">
        <label class="form-label small">Cantidad:</label>
        <div class="input-group input-group-sm" style="width: 120px;">
          <button class="btn btn-outline-secondary btn-decrementar" type="button">-</button>
          <span class="form-control text-center cantidad-valor" style="background-color: white;">1</span>
          <button class="btn btn-outline-secondary btn-incrementar" type="button">+</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="col">
      <div class="card h-100 tarjeta">
        <img src="${producto.imagen ? 'img/' + producto.imagen : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='}"
          loading="lazy"
          onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='"
        <div class="card-body">
          <h3 class="card-title h5">${producto.nombre}</h3>
          <p class="card-text">${producto.descripcion || 'Sin descripción'}</p>
          ${codigoBarras ? `<small class="text-muted font-monospace d-block mb-2">Código: ${codigoBarras}</small>` : ''}
          <p class="price">$${precioPorUnidad.toFixed(2)} ${necesitaCantidadPersonalizada ? (unidadMedida === 'g' || unidadMedida === 'gramo' ? 'por 100g' : 'por kg') : ''}</p>
          ${producto.stock < 5 ? '<span class="badge bg-warning">Poco stock</span>' : ''}
          ${producto.destacado ? '<span class="badge bg-success">Destacado</span>' : ''}
          ${controlCantidad}
        </div>
        <div class="card-footer bg-transparent">
          <button class="btn agregar w-100" 
                  data-id="${producto.id}" 
                  data-nombre="${producto.nombre}" 
                  data-precio="${precioPorUnidad}"
                  data-codigo-barras="${codigoBarras}"
                  data-unidad-medida="${unidadMedida}"
                  data-cantidad-personalizada="${necesitaCantidadPersonalizada ? 'true' : 'false'}"
                  ${producto.stock === 0 ? 'disabled' : ''}>
            <i class="fas fa-cart-plus me-2"></i>
            ${producto.stock === 0 ? 'Sin stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  `;
}
}

// Instancia global
const manejadorCategorias = new ManejadorCategorias();

// Event listener para el botón "Mostrar todos"
document.addEventListener('DOMContentLoaded', function() {
  const mostrarTodosBtn = document.getElementById('mostrarTodos');
  if (mostrarTodosBtn) {
    mostrarTodosBtn.addEventListener('click', () => {
      manejadorCategorias.filtrarPorCategoria('todas');
    });
  }
});