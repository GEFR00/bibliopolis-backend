import { Injectable } from '@nestjs/common';
import { Libro } from 'src/models/libro';
import { Pedido } from 'src/models/pedido';
import { LibrosService } from '../libros/libros.service';

@Injectable()
export class PedidosService {

    private pedidos: Pedido[] = [];
    private libros: Libro[] = [];

    constructor( private readonly librosService: LibrosService ) {
    }

    // a. crear un nuevo pedido
    //     i. La fechaPedido debe ser igual a la fecha actual del sistema
    //     ii. El total se debe calcular en base al precio de cada libro en el pedido y su
    //     cantidad.
    //     iii. Se debe validar que exista stock para cada uno de los libros en el pedido.

    crearPedido(pedido: Pedido): boolean {
        const existePedido = this.obtenerPedidoPorId(pedido.id);
        
        if(!existePedido) {
            const fechaActual = new Date();
            pedido.fechaPedido = fechaActual;
    
            let total = 0;
            pedido.items.forEach(item => {

                const { libro } = item;

                this.libros = this.librosService.obtenerLibros(
                    libro.isbn, 
                    libro.genero
                );

                if(this.libros.length > 0) {
                    const libroEncontrado = this.libros[0];
                    if(libroEncontrado.stock >= item.cantidad) {
                        total += libroEncontrado.precio * item.cantidad;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }

            });

            pedido.total = total;

            this.pedidos.push(pedido);
            return true;

        } else {
            return false;
        }

    }

    // b. Obtener un pedido según su Id
    obtenerPedidoPorId( id: string ): Pedido {
        const pedido = this.pedidos.find( 
            ped => ped.id == id 
        );

        return pedido ? pedido : null;
    };


    // c. Obtener todos los pedidos y permitir filtrar por estado y/o usuario
    obtenerPedidos( estado: string, usuarioId: string ): Pedido[] {

        if(estado && usuarioId) {
            return this.pedidos.filter(pedido => 
                pedido.estado.toLowerCase() == estado.toLowerCase() && 
                pedido.usuario.id.toLowerCase() == usuarioId.toLowerCase()
            );

        } else if (estado) {

            return this.pedidos.filter(pedido => 
                pedido.estado.toLowerCase() == estado.toLowerCase()
            );

        } else if (usuarioId) {

            return this.pedidos.filter(pedido => 
                pedido.usuario.id == usuarioId.toLowerCase()
            );

        } else {
            return this.pedidos;
        }
       
    };


    // d. Modificar el estado de un pedido según su id
    //     i. Si el estado actual del pedido es "pendiente" solo debe permitir el valor
    //     "en proceso"
    //     ii. Si el estado actual del pedido es "en proceso" solo debe permitir el valor
    //     "enviado"
    //     iii. Si el estado actual del pedido es "enviado", sólo debe permitir el valor
    //     "entregado"
    //     iv. Si el estado actual del pedido es "entregado" no se puede modificar
    //     v. Si no debe devolver el 400 con el mensaje “estado incorrecto”

    modificarEstadoPedido( 
        id: string, 
        estado: 'pendiente' | 'en proceso' | 'enviado' | 'entregado'
    ): boolean {
        const pedidoExiste = this.obtenerPedidoPorId(id);

        if(pedidoExiste) {

            if( pedidoExiste.estado.toLowerCase() == "pendiente" ) {

                if(estado.toLowerCase() == "en proceso") {
                    pedidoExiste.estado = estado;
                    return true;
                } else {
                    return false;
                }

            } else if(pedidoExiste.estado.toLowerCase() == "en proceso") {

                if(estado == "enviado") {
                    pedidoExiste.estado = estado;
                    return true;
                } else {
                    return false;
                }

            } else if(pedidoExiste.estado.toLowerCase() == "enviado") {

                if(estado == "entregado") {
                    pedidoExiste.estado = estado;
                    return true;
                } else {
                    return false;
                }
                
            } else {
                return false;
            }

        } else {
            return false;
        }
    };


}
