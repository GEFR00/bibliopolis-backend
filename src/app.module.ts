import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './controllers/usuarios/usuarios.controller';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { LibrosController } from './controllers/libros/libros.controller';
import { LibrosService } from './services/libros/libros.service';
import { PedidosController } from './controllers/pedidos/pedidos.controller';
import { PedidosService } from './services/pedidos/pedidos.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsuariosController,
    LibrosController,
    PedidosController
  ],
  providers: [
    AppService,
    UsuariosService,
    LibrosService,
    PedidosService
  ],
})
export class AppModule {}
