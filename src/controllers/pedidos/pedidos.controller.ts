import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Pedido } from 'src/models/pedido';
import { PedidosService } from 'src/services/pedidos/pedidos.service';

@Controller('pedidos')
export class PedidosController {

    constructor( private readonly servicio: PedidosService) {}

    // crear un nuevo pedido
    @Post()
    crearPedido( @Body() pedido: Pedido, @Res() res: Response ): void {
        const pedidoFueCreado = this.servicio.crearPedido(pedido);
        pedidoFueCreado ? 
            res.status(HttpStatus.CREATED).send() : 
            res.status(HttpStatus.CONFLICT).send();
    };

    // Obtener un pedido según su Id
    @Get(':id')
    obtenerPedido( @Param('id') id: string, @Res() res: Response ): void {
        const existePedido = this.servicio.obtenerPedidoPorId(id);

        existePedido ? 
            res.status(HttpStatus.OK).json(existePedido) : 
            res.status(HttpStatus.NOT_FOUND).send();
     
    };

    // Obtener todos los pedidos y permitir filtrar por estado y/o usuario
    @Get()
    obtenerLibros( 
        @Query('estado') estado: string, 
        @Query('usuario') usuario: string,
        @Res() res: Response 
    ): void {

        const pedidos = this.servicio.obtenerPedidos(estado, usuario);
        res.status(HttpStatus.OK).json(pedidos);
      
    };

    // Modificar el estado de un pedido según su id
    @Post(':id/estado')
    modificarEstadoPedido( 
        @Param('id') id: string, 
        @Body('estado') estado: 'pendiente' | 'en proceso' | 'enviado' | 'entregado', 
        @Res() res: Response 
    ): void {

        const pedidoFueModificado = this.servicio.modificarEstadoPedido(id, estado);

        pedidoFueModificado ? 
            res.status(HttpStatus.OK).send() : 
            res.status(HttpStatus.NOT_FOUND).send();
      
    };

}
