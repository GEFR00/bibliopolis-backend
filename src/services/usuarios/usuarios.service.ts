import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/models/usuario';

@Injectable()
export class UsuariosService {

    private usuarios: Usuario[] = [];

    // Registrar un nuevo usuario (Verificar si existe el usuario según el correo ingresado)
    crearUsuario(usuario: Usuario): boolean {
        const existeUsuario = this.usuarios.find( 
            user => user.correoElectronico == usuario.correoElectronico
        );
        
        if(!existeUsuario) {
            usuario.id = (this.usuarios.length + 1).toString();
            this.usuarios.push(usuario);

            return true;
        } else {
            return false;
        }
    };

    // Obtener un usuario según su id
    obtenerUsuarioPorId(id: string): Usuario {
        const usuario = this.usuarios.find( 
            usuario => usuario.id == id 
        );

        return usuario ? usuario : null;
    };

    // Obtener todos los usuarios (Excluir la password en la lista )
    obtenerUsuarios(): Usuario[] {
        return this.usuarios.map( usuario => {
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                correoElectronico: usuario.correoElectronico,
                direccion: usuario.direccion,
                historialPedidos: usuario.historialPedidos
            }
        });
    };

    // Eliminar un usuarios según su id
    eliminarUsuario( id: string ): boolean {

        const existeUsuario = this.obtenerUsuarioPorId(id);

        if( existeUsuario ) {
            this.usuarios.forEach((usuario) => {
                if(usuario.id == id) {
                    this.usuarios.splice(usuario.id.indexOf(id) - 1, 1);
                }
            });

            return true;
        } else {
            return false;
        }
    };


}
