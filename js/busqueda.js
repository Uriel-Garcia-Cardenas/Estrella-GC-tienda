// js/busqueda.js - Funcionalidad de búsqueda en tiempo real (incluyendo marcas)

class ManejadorBusqueda {
  constructor() {
    this.productos = [];
    this.searchInput = document.getElementById('searchInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.searchResults = document.getElementById('searchResults');
    
    this.init();
  }

  init() {
    // Cargar productos
    this.cargarProductos();
    
    // Event listeners
    this.searchInput.addEventListener('input', () => this.buscarProductos());
    this.searchBtn.addEventListener('click', () => this.buscarProductos());
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.buscarProductos();
    });

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (this.searchResults && !this.searchResults.contains(e.target) && e.target !== this.searchInput) {
        this.ocultarResultados();
      }
    });
  }

  cargarProductos() {
    // Escuchar cambios en la colección de productos de Firebase
    if (typeof db !== 'undefined') {
      db.collection("productos").onSnapshot((snapshot) => {
        this.productos = [];
        snapshot.forEach((doc) => {
          const producto = doc.data();
          producto.id = doc.id;
          this.productos.push(producto);
        });
      });
    }
  }

  buscarProductos() {
    const termino = this.searchInput.value.trim().toLowerCase();
    
    if (termino.length === 0) {
      this.ocultarResultados();
      return;
    }

    // Búsqueda por: nombre, descripción, categoría, y AHORA también por MARCA
    const resultados = this.productos.filter(producto => 
      (producto.nombre && producto.nombre.toLowerCase().includes(termino)) ||
      (producto.descripcion && producto.descripcion.toLowerCase().includes(termino)) ||
      (producto.categoria && producto.categoria.toLowerCase().includes(termino)) ||
      (producto.marca && producto.marca.toLowerCase().includes(termino))  // NUEVO: buscar por marca
    );

    this.mostrarResultados(resultados, termino);
  }

  mostrarResultados(resultados, termino) {
    if (!this.searchResults) return;

    if (resultados.length === 0) {
      this.searchResults.innerHTML = `
        <div class="p-3 text-center text-muted">
          <i class="fas fa-search me-2"></i>
          No se encontraron productos para "${termino}"
        </div>
      `;
    } else {
      // Agrupar resultados por marca para mejor visualización
      const resultadosPorMarca = this.agruparPorMarca(resultados);
      
      let html = '';
      
      // Mostrar primero los resultados agrupados por marca
      for (const [marca, productosMarca] of resultadosPorMarca) {
        if (marca !== 'Sin marca') {
          html += `
            <div class="px-2 py-1 bg-light border-bottom">
              <small class="fw-bold text-primary"><i class="fas fa-tag me-1"></i>${marca}</small>
            </div>
          `;
        }
        
        productosMarca.forEach(producto => {
          html += `
            <a href="#" class="producto-busqueda" data-id="${producto.id}">
              <img src="img/${producto.imagen || 'placeholder.jpg'}" 
                   alt="${producto.nombre}"
                   onerror="this.src='img/placeholder.jpg'">
              <div class="producto-info">
                <div class="producto-nombre">${producto.nombre}</div>
                <div class="producto-precio">$${producto.precio?.toFixed(2) || '0.00'}</div>
                <small class="text-muted">
                  <i class="fas fa-tag me-1"></i>${producto.marca || 'Sin marca'} | 
                  <i class="fas fa-folder me-1"></i>${producto.categoria || 'Sin categoría'}
                </small>
              </div>
            </a>
          `;
        });
      }
      
      this.searchResults.innerHTML = html;

      // Agregar event listeners a los resultados
      this.searchResults.querySelectorAll('.producto-busqueda').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.seleccionarProducto(e.currentTarget.dataset.id);
        });
      });
    }

    this.searchResults.classList.remove('d-none');
  }

  // NUEVO: Agrupar resultados por marca
  agruparPorMarca(productos) {
    const mapa = new Map();
    productos.forEach(producto => {
      const marca = producto.marca || 'Sin marca';
      if (!mapa.has(marca)) mapa.set(marca, []);
      mapa.get(marca).push(producto);
    });
    // Ordenar marcas alfabéticamente
    return new Map([...mapa.entries()].sort());
  }

  ocultarResultados() {
    if (this.searchResults) {
      this.searchResults.classList.add('d-none');
    }
  }

  seleccionarProducto(productoId) {
    const producto = this.productos.find(p => p.id === productoId);
    if (producto) {
      // Cerrar resultados de búsqueda
      this.ocultarResultados();
      this.searchInput.value = '';
      
      // Filtrar por la categoría del producto para mostrar todos los productos de esa categoría
      if (typeof manejadorCategorias !== 'undefined') {
        // Resetear filtro de marca primero
        manejadorCategorias.marcaActual = 'todas';
        // Filtrar por categoría
        manejadorCategorias.filtrarPorCategoria(producto.categoria);
        
        // Esperar a que se rendericen los productos y luego hacer scroll al producto específico
        setTimeout(() => {
          this.scrollAProducto(productoId);
        }, 800);
      }
    }
  }

  scrollAProducto(productoId) {
    // Buscar el producto específico en el DOM
    const productoElement = document.querySelector(`.agregar[data-id="${productoId}"]`);
    
    if (productoElement) {
      const card = productoElement.closest('.card');
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const absoluteCardTop = cardRect.top + window.pageYOffset;
        const middle = absoluteCardTop - (window.innerHeight / 2) + (cardRect.height / 2);
        
        // Hacer scroll suave hasta el producto (centrado en la pantalla)
        window.scrollTo({
          top: middle,
          behavior: 'smooth'
        });
        
        // Destacar sutilmente el producto
        card.style.transition = 'all 0.5s ease';
        card.style.boxShadow = '0 0 0 2px #28a745, 0 5px 15px rgba(0,0,0,0.2)';
        card.style.borderRadius = '8px';
        
        // Quitar el destaque después de 2 segundos
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 2000);
      }
    } else {
      // Si no se encuentra el producto, intentar nuevamente después de un tiempo
      console.log('Producto no encontrado, reintentando...');
      setTimeout(() => {
        this.scrollAProducto(productoId);
      }, 500);
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  new ManejadorBusqueda();
});