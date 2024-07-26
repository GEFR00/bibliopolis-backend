import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Libro } from 'src/models/libro';
import { LibrosService } from 'src/services/libros/libros.service';

@Controller('libros')
export class LibrosController {

    constructor( private readonly servicio: LibrosService) {}

    // Crear un nuevo libro
    @Post()
    crearLibro( @Body() libro: Libro, @Res() res: Response ): void {
        const libroFueCreado = this.servicio.crearLibro(libro);
        libroFueCreado ? 
            res.status(HttpStatus.CREATED).send() : 
            res.status(HttpStatus.CONFLICT).send();
    };

    // Obtener un libro según su ISBN
    @Get(':isbn')
    obtenerLibro( @Param('isbn') id: string, @Res() res: Response ): void {
        const libro = this.servicio.obtenerLibroPorISBN(id);

        if( libro ) {
            res.status(HttpStatus.OK).json(libro);
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    };

    // Obtener todos los libros y permitir filtrar por autor y/o género
    @Get()
    obtenerLibros( 
        @Query('autor') autor: string, 
        @Query('genero') genero: string,
        @Res() res: Response 
    ): void {
        const libros = this.servicio.obtenerLibros(autor, genero);
        res.status(HttpStatus.OK).json(libros);
    };

    // Eliminar un libro según su ISBN
    @Delete(':isbn')
    eliminarLibro( @Param('isbn') isbn: string, @Res() res: Response ): void {
        const libroFueEliminado = this.servicio.eliminarLibro(isbn);
        libroFueEliminado ? 
            res.status(HttpStatus.OK).send() : 
            res.status(HttpStatus.NOT_FOUND).send();
    };

}
