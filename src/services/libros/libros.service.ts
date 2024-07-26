import { Injectable } from '@nestjs/common';
import { Libro } from 'src/models/libro';

@Injectable()
export class LibrosService {

    private libros: Libro[] = [];


    // Crear un nuevo libro, debe verificar que el ISBN no exista.
    crearLibro( libro: Libro ): boolean {
        const existeLibro = this.obtenerLibroPorISBN(libro.isbn);
        
        if(!existeLibro) {
            libro.isbn = (this.libros.length + 1).toString();
            this.libros.push(libro);

            return true;
        } else {
            return false;
        }
    };

    // Obtener un libro según su ISBN
    obtenerLibroPorISBN( isbn: string ): Libro {
        const libro = this.libros.find( 
            libro => libro.isbn == isbn 
        );

        return libro ? libro : null;
    };
    

    // Obtener todas los libros y permitir filtrar por autor y/o género (Si no se envían
    // los filtros de autor o género debe devolver todos los libros)
    obtenerLibros( autor: string, genero: string ): Libro[] {
        if(autor && genero) {
            return this.libros.filter(libro => 
                libro.autor.toLowerCase() == autor.toLowerCase() && 
                libro.genero.toLowerCase() == genero.toLowerCase()
            );
        } else {
            return this.libros;
        }
    };

    // Eliminar un libro según su ISBN
    eliminarLibro( isbn: string ): boolean {

        const existeLibro = this.obtenerLibroPorISBN(isbn);

        if( existeLibro ) {
            this.libros.forEach((libro) => {
                if(libro.isbn == isbn) {
                    this.libros.splice(libro.isbn.indexOf(isbn) - 1, 1);
                }
            });

            return true;
        } else {
            return false;
        }
    };


}
