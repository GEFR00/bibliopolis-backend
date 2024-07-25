import { ItemPedido } from "./itemPedido";
import { Usuario } from "./usuario";

export class Pedido {
    id: string;  
    usuario: Usuario;  
    fechaPedido: Date;  
    estado: 'pendiente' | 'en proceso' | 'enviado' | 'entregado'; 
    total: number;  
    items: ItemPedido[];  

    constructor(id: string, usuario: Usuario, fechaPedido: Date, estado: 'pendiente' | 'en proceso' | 'enviado' | 'entregado', total: number, items: ItemPedido[]) {
        this.id = id;
        this.usuario = usuario;
        this.fechaPedido = fechaPedido;
        this.estado = estado;
        this.total = total;
        this.items = items;
    }
}