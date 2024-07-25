import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './controllers/usuarios/usuarios.controller';
import { UsuariosService } from './services/usuarios/usuarios.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsuariosController
  ],
  providers: [
    AppService,
    UsuariosService
  ],
})
export class AppModule {}
