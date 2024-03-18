import { stkUsuarioTrackingService } from 'src/stkUsuarioTracking/api/services/stkUsuarioTracking.service';
import { LoginInput } from '../models/auth.input';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private stkUsuarioTrackingService: stkUsuarioTrackingService) {}

  async login(input: LoginInput) {
    console.log(input.clave);
    const usuario =
      await this.stkUsuarioTrackingService.solicitarUsuarioTracking(
        input.usuario,
      );

    if ('errorName' in usuario) {
      return 'error llamando al usuario';
    }

    if (usuario.clave == input.clave) {
      console.log('login exitoso');
      return 'Login exitoso';
    } else {
      console.log('login fallido');
    }

    console.log(usuario);
    return 'Hello World!';
  }
}
