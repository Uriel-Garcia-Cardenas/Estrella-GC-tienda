
// Sistema de generación de tickets/comprobantes
class TicketGenerator {
    constructor() {
        this.tiendaNombre = "ESTRELLA G&C";
        this.tiendaDireccion = "Tienda en línea";
        this.tiendaTelefono = "5576872157";
        this.tiendaEmail = "estrellagc99@gmail.com";
    }

    // Generar ticket para impresión
    generarTicket(pedido, pedidoId) {
        const fecha = new Date().toLocaleString('es-MX');
        
        let ticketHTML = `
            <div class="ticket-container" id="ticketContent">
                <div class="ticket">
                    <!-- Encabezado del ticket -->
                    <div class="ticket-header text-center mb-3">
                        <h3 class="mb-1">${this.tiendaNombre}</h3>
                        <p class="mb-1">${this.tiendaDireccion}</p>
                        <p class="mb-1">Tel: ${this.tiendaTelefono}</p>
                        <p class="mb-2">${this.tiendaEmail}</p>
                        <hr>
                    </div>

                    <!-- Información del pedido -->
                    <div class="ticket-info mb-3">
                        <div class="row">
                            <div class="col-6">
                                <strong>Pedido #:</strong>
                            </div>
                            <div class="col-6 text-end">
                                ${pedidoId}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <strong>Fecha:</strong>
                            </div>
                            <div class="col-6 text-end">
                                ${fecha}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <strong>Cliente:</strong>
                            </div>
                            <div class="col-6 text-end">
                                ${pedido.cliente.nombre}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <strong>Teléfono:</strong>
                            </div>
                            <div class="col-6 text-end">
                                ${pedido.cliente.telefono}
                            </div>
                        </div>
                        ${pedido.metodoEntrega === 'domicilio' && pedido.cliente.direccion ? `
                        <div class="row">
                            <div class="col-6">
                                <strong>Dirección:</strong>
                            </div>
                            <div class="col-6 text-end">
                                ${pedido.cliente.direccion}
                            </div>
                        </div>
                        ` : ''}
                        <div class="row">
                            <div class="col-6">
                                <strong>Entrega:</strong>
                            </div>
                            <div class="col-6 text-end">
                                ${pedido.metodoEntrega === 'domicilio' ? 'A domicilio' : 'En sucursal'}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <strong>Pago:</strong>
                            </div>
                            <div class="col-6 text-end">
                                ${this.getMetodoPagoTexto(pedido.metodoPago)}
                            </div>
                        </div>
                    </div>

                    <!-- Productos -->
                    <div class="ticket-products mb-3">
                        <table class="table table-sm mb-0">
                            <thead>
                                <tr class="border-top">
                                    <th class="border-bottom-0">Producto</th>
                                    <th class="text-center border-bottom-0">Cant</th>
                                    <th class="text-end border-bottom-0">Total</th>
                                </tr>
                            </thead>
                            <tbody>
        `;

        // Agregar productos
        pedido.productos.forEach((producto, index) => {
            const subtotal = producto.precio * producto.cantidad;
            let nombreMostrar = producto.nombre;
            
            if (producto.cantidadPersonalizada) {
                nombreMostrar = `${producto.nombre} (${producto.cantidadPersonalizadaValor} ${producto.unidad})`;
            }
            
            ticketHTML += `
                <tr>
                    <td class="py-1">${nombreMostrar}</td>
                    <td class="text-center py-1">${producto.cantidad}</td>
                    <td class="text-end py-1">$${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        ticketHTML += `
                            </tbody>
                        </table>
                    </div>

                    <!-- Totales -->
                    <div class="ticket-totals">
                        <div class="row">
                            <div class="col-6">
                                <strong>Subtotal:</strong>
                            </div>
                            <div class="col-6 text-end">
                                $${pedido.total.toFixed(2)}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <strong>IVA (16%):</strong>
                            </div>
                            <div class="col-6 text-end">
                                $${(pedido.total * 0.16).toFixed(2)}
                            </div>
                        </div>
                        <div class="row border-top pt-1">
                            <div class="col-6">
                                <h5 class="mb-0">TOTAL:</h5>
                            </div>
                            <div class="col-6 text-end">
                                <h5 class="mb-0">$${(pedido.total * 1.16).toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>

                    <!-- Pie del ticket -->
                    <div class="ticket-footer text-center mt-4">
                        <hr>
                        <p class="mb-1"><strong>¡Gracias por su compra!</strong></p>
                        <p class="small mb-0">Conserve este ticket para cualquier aclaración</p>
                        <p class="small mb-0">Horario: Lunes a Sábado 8:00 - 21:30 hrs</p>
                        <p class="small mb-0">${new Date().getFullYear()} ${this.tiendaNombre}</p>
                    </div>
                </div>
            </div>
        `;

        return ticketHTML;
    }

    // Generar contenido para PDF
    generarContenidoPDF(pedido, pedidoId) {
        const fecha = new Date().toLocaleString('es-MX');
        let contenido = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Comprobante ${pedidoId}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .ticket { max-width: 400px; margin: 0 auto; border: 1px solid #000; padding: 20px; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .header h2 { margin: 0; }
                    .info { margin-bottom: 20px; }
                    .info div { margin-bottom: 5px; }
                    .products { margin-bottom: 20px; }
                    .products table { width: 100%; border-collapse: collapse; }
                    .products th, .products td { padding: 5px; text-align: left; border-bottom: 1px solid #ddd; }
                    .totals { margin-top: 20px; padding-top: 10px; border-top: 2px solid #000; }
                    .footer { text-align: center; margin-top: 30px; font-size: 12px; }
                    .text-right { text-align: right; }
                    .text-center { text-align: center; }
                    .bold { font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="header">
                        <h2>${this.tiendaNombre}</h2>
                        <p>${this.tiendaDireccion}</p>
                        <p>Tel: ${this.tiendaTelefono}</p>
                        <p>${this.tiendaEmail}</p>
                    </div>
                    
                    <div class="info">
                        <div><strong>Pedido #:</strong> ${pedidoId}</div>
                        <div><strong>Fecha:</strong> ${fecha}</div>
                        <div><strong>Cliente:</strong> ${pedido.cliente.nombre}</div>
                        <div><strong>Teléfono:</strong> ${pedido.cliente.telefono}</div>
                        ${pedido.metodoEntrega === 'domicilio' && pedido.cliente.direccion ? 
                        `<div><strong>Dirección:</strong> ${pedido.cliente.direccion}</div>` : ''}
                        <div><strong>Entrega:</strong> ${pedido.metodoEntrega === 'domicilio' ? 'A domicilio' : 'En sucursal'}</div>
                        <div><strong>Pago:</strong> ${this.getMetodoPagoTexto(pedido.metodoPago)}</div>
                    </div>
                    
                    <div class="products">
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th class="text-center">Cant</th>
                                    <th class="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
        `;

        pedido.productos.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            let nombreMostrar = producto.nombre;
            
            if (producto.cantidadPersonalizada) {
                nombreMostrar = `${producto.nombre} (${producto.cantidadPersonalizadaValor} ${producto.unidad})`;
            }
            
            contenido += `
                <tr>
                    <td>${nombreMostrar}</td>
                    <td class="text-center">${producto.cantidad}</td>
                    <td class="text-right">$${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        contenido += `
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="totals">
                        <div><strong>Subtotal:</strong> <span class="text-right">$${pedido.total.toFixed(2)}</span></div>
                        <div><strong>IVA (16%):</strong> <span class="text-right">$${(pedido.total * 0.16).toFixed(2)}</span></div>
                        <div style="margin-top: 10px;">
                            <strong>TOTAL:</strong> <span class="text-right bold">$${(pedido.total * 1.16).toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p><strong>¡Gracias por su compra!</strong></p>
                        <p>Conserve este comprobante para cualquier aclaración</p>
                        <p>Horario: Lunes a Sábado 8:00 - 21:30 hrs</p>
                        <p>${new Date().getFullYear()} ${this.tiendaNombre}</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        return contenido;
    }

    // Texto para métodos de pago
    getMetodoPagoTexto(metodo) {
        const metodos = {
            'tarjeta': 'Tarjeta de crédito/débito',
            'transferencia': 'Transferencia bancaria',
            'sucursal': 'Pago en sucursal'
        };
        return metodos[metodo] || metodo;
    }

    // Imprimir ticket
    imprimirTicket(pedido, pedidoId) {
        // Crear ventana de impresión
        const printWindow = window.open('', '_blank');
        printWindow.document.write(this.generarContenidoPDF(pedido, pedidoId));
        printWindow.document.close();
        
        // Esperar a que cargue el contenido
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
    }

    // Descargar ticket como PDF (usando jsPDF)
    descargarTicketPDF(pedido, pedidoId) {
        if (typeof jsPDF === 'undefined') {
            console.error('jsPDF no está cargado');
            this.imprimirTicket(pedido, pedidoId);
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a6'
        });

        // Configuración
        const margin = 10;
        let y = margin;
        
        // Encabezado
        doc.setFontSize(16);
        doc.text(this.tiendaNombre, 105, y, { align: 'center' });
        y += 8;
        
        doc.setFontSize(10);
        doc.text(this.tiendaDireccion, 105, y, { align: 'center' });
        y += 5;
        doc.text(`Tel: ${this.tiendaTelefono}`, 105, y, { align: 'center' });
        y += 5;
        doc.text(this.tiendaEmail, 105, y, { align: 'center' });
        y += 10;

        // Línea divisoria
        doc.line(margin, y, 200 - margin, y);
        y += 8;

        // Información del pedido
        doc.setFontSize(12);
        doc.text(`Pedido #: ${pedidoId}`, margin, y);
        y += 7;
        
        doc.setFontSize(10);
        doc.text(`Fecha: ${new Date().toLocaleString('es-MX')}`, margin, y);
        y += 5;
        doc.text(`Cliente: ${pedido.cliente.nombre}`, margin, y);
        y += 5;
        doc.text(`Teléfono: ${pedido.cliente.telefono}`, margin, y);
        y += 5;
        
        if (pedido.metodoEntrega === 'domicilio' && pedido.cliente.direccion) {
            doc.text(`Dirección: ${pedido.cliente.direccion}`, margin, y);
            y += 5;
        }
        
        doc.text(`Entrega: ${pedido.metodoEntrega === 'domicilio' ? 'A domicilio' : 'En sucursal'}`, margin, y);
        y += 5;
        doc.text(`Pago: ${this.getMetodoPagoTexto(pedido.metodoPago)}`, margin, y);
        y += 10;

        // Productos
        doc.setFontSize(12);
        doc.text('PRODUCTOS', margin, y);
        y += 8;

        doc.setFontSize(10);
        pedido.productos.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            let nombreMostrar = producto.nombre;
            
            if (producto.cantidadPersonalizada) {
                nombreMostrar = `${producto.nombre} (${producto.cantidadPersonalizadaValor} ${producto.unidad})`;
            }
            
            // Verificar si necesita nueva página
            if (y > 180) {
                doc.addPage();
                y = margin;
            }
            
            doc.text(nombreMostrar, margin, y);
            doc.text(`${producto.cantidad}`, 140, y);
            doc.text(`$${subtotal.toFixed(2)}`, 180, y, { align: 'right' });
            y += 6;
        });

        y += 10;

        // Totales
        doc.setFontSize(11);
        doc.text('Subtotal:', margin, y);
        doc.text(`$${pedido.total.toFixed(2)}`, 180, y, { align: 'right' });
        y += 7;

        doc.text('IVA (16%):', margin, y);
        doc.text(`$${(pedido.total * 0.16).toFixed(2)}`, 180, y, { align: 'right' });
        y += 10;

        doc.setFontSize(14);
        doc.text('TOTAL:', margin, y);
        doc.text(`$${(pedido.total * 1.16).toFixed(2)}`, 180, y, { align: 'right' });
        y += 15;

        // Pie de página
        doc.setFontSize(10);
        doc.line(margin, y, 200 - margin, y);
        y += 8;
        
        doc.text('¡Gracias por su compra!', 105, y, { align: 'center' });
        y += 6;
        doc.text('Conserve este ticket para cualquier aclaración', 105, y, { align: 'center' });
        y += 5;
        doc.text('Horario: Lunes a Sábado 8:00 - 21:30 hrs', 105, y, { align: 'center' });
        y += 5;
        doc.text(`${new Date().getFullYear()} ${this.tiendaNombre}`, 105, y, { align: 'center' });

        // Guardar PDF
        doc.save(`ticket_${pedidoId}.pdf`);
    }

    // Mostrar modal con ticket
    mostrarTicketModal(pedido, pedidoId) {
        // Crear modal para mostrar el ticket
        const modalHTML = `
            <div class="modal fade" id="ticketModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Comprobante de Compra #${pedidoId}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-center mb-4">
                                <button class="btn btn-primary me-2" onclick="ticketGenerator.imprimirTicket(${JSON.stringify(pedido).replace(/"/g, '&quot;')}, '${pedidoId}')">
                                    <i class="fas fa-print me-1"></i> Imprimir
                                </button>
                                <button class="btn btn-success" onclick="ticketGenerator.descargarTicketPDF(${JSON.stringify(pedido).replace(/"/g, '&quot;')}, '${pedidoId}')">
                                    <i class="fas fa-download me-1"></i> Descargar PDF
                                </button>
                            </div>
                            ${this.generarTicket(pedido, pedidoId)}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Agregar modal al DOM
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);

        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById('ticketModal'));
        modal.show();

        // Eliminar modal cuando se cierre
        document.getElementById('ticketModal').addEventListener('hidden.bs.modal', function () {
            modalContainer.remove();
        });
    }
}

// Crear instancia global
window.ticketGenerator = new TicketGenerator();