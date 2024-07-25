import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Usuario } from 'src/models/usuario';
import { UsuariosService } from 'src/services/usuarios/usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor( private readonly servicio: UsuariosService) {}

    // Registrar un nuevo usuario
    @Post()
    crearUsuario( @Body() usuario: Usuario, @Res() res: Response ): void {

        const usuarioFueCreado = this.servicio.crearUsuario(usuario);
        usuarioFueCreado ? 
            res.status(HttpStatus.CREATED).send() : 
            res.status(HttpStatus.CONFLICT).send();
    };

    // Obtener un usuario según su id, en caso de que el usuario no exista devolver el código 404.
    @Get(':id')
    obtenerUsuario( @Param('id') id: string, @Res() res: Response ): void {

        const usuario = this.servicio.obtenerUsuarioPorId(id);

        if( usuario ) {
            res.status(HttpStatus.OK).json(usuario);
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    };

    // Obtener todos los usuarios
    @Get()
    obtenerUsuarios( @Res() res: Response ): void {

        const usuarios = this.servicio.obtenerUsuarios();
        res.status(HttpStatus.OK).json(usuarios);
    };

    // Eliminar un usuario según su id
    @Delete(':id')
    eliminarUsuario( @Param('id') id: string, @Res() res: Response ): void {

        const usuarioFueEliminado = this.servicio.eliminarUsuario(id);
        usuarioFueEliminado ? 
            res.status(HttpStatus.OK).send() : 
            res.status(HttpStatus.NOT_FOUND).send();
    };

}
