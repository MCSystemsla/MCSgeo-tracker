import { getStkUsuariosTrackingInput } from 'src/stkUsuarioTracking/api/models/createStkUsuarioTracking.input';
import { stkUsuarioTrackingService } from 'src/stkUsuarioTracking/api/services/stkUsuarioTracking.service';
import { LoginInput } from '../models/auth.input';

export class AuthService {
  constructor(private stkUsuarioTrackingService: stkUsuarioTrackingService) {}

  async signIn(input: LoginInput) {
    const usuario = this.stkUsuarioTrackingService.solicitarUsuarioTracking(
      input.usuario,
    );
    console.log(usuario);
  }
}
