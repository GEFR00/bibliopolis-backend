import { Libro } from "./libro";

export class ItemPedido {
    libro: Libro; 
    cantidad: number;  

    constructor(libro: Libro, cantidad: number) {
        this.libro = libro;
        this.cantidad = cantidad;
    }
}