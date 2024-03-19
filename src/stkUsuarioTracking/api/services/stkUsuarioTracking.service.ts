import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  UpdateStkUsuarioTrackingInput,
  createStkUsuarioTrackingInput,
  deleteStkUsuariosTrackingInput,
  getStkUsuarioTrackingInput,
  getMultiplesStkUsuariosTrackingInput,
} from '../models/stkUsuarioTracking.input';
const bcrypt = require('bcrypt');

@Injectable()
export class stkUsuarioTrackingService {
  constructor(private prisma: PrismaService) {}

  async crearUsuarioTracking(input: createStkUsuarioTrackingInput) {
    const saltRounds = 10;

    const usuarioTrackingExiste =
      await this.prisma.stkUsuarioTracking.findFirst({
        where: {
          OR: [
            {
              cedula: input.cedula,
            },
            {
              email: input.email,
            },
          ],
        },
      });

    if (usuarioTrackingExiste) {
      if (usuarioTrackingExiste.cedula === input.cedula) {
        return {
          errorName: 'Error Usuario',
          message: 'La cedula ingresada ya pertenece a otro usuario.',
        };
      } else if (usuarioTrackingExiste.email === input.email) {
        return {
          errorName: 'Error Usuario',
          message: 'El email ingresado ya pertenece a otro usuario.',
        };
      }
    }
    if (input.objSucursalId) {
      const sucursalExiste = await this.prisma.stkSucursal.findUnique({
        where: {
          id: input.objSucursalId,
        },
      });
      if (!sucursalExiste)
        return {
          errorName: 'Error Sucursal',
          message: 'La sucursal que se intento añadir al usuario no existe',
        };
    }

    const hash = bcrypt.hashSync(input.clave, saltRounds);

    const nuevoUsuarioTracking = await this.prisma.stkUsuarioTracking.create({
      data: {
        ...input,
        fechaCreacion: new Date().toISOString(),
        clave: hash,
      },
    });

    return nuevoUsuarioTracking;
  }

  async solicitarUsuarioTracking(input: getStkUsuarioTrackingInput) {
    let searchById = { id: input.id ? input.id : 0 };
    let searchByEmail = { email: input.email ? input.email : '' };
    let searchArgument = input.id ? searchById : searchByEmail;

    const usuarioTracking = await this.prisma.stkUsuarioTracking.findUnique({
      where: {
        ...searchArgument,
      },
    });

    if (!usuarioTracking) {
      return {
        errorName: 'Error Usuario',
        message: 'El usuario solicitado no existe',
      };
    }

    return usuarioTracking;
  }

  async solicitarMultiplesUsuarioTracking(
    input: getMultiplesStkUsuariosTrackingInput,
  ) {
    let searchById = { id: { in: input.usuarios } };
    let searchByEmail = { email: { in: input.emails } };
    let searchArgument = input.usuarios ? searchById : searchByEmail;
    let usuariosEsperados = input.usuarios
      ? input.usuarios.length
      : input.emails.length;
    const usuariosTracking = await this.prisma.stkUsuarioTracking.findMany({
      where: {
        ...searchArgument,
      },
    });

    const usuarios = {
      usuarios: usuariosTracking,
    };
    if (usuarios.usuarios.length !== usuariosEsperados) {
      return {
        errorName: 'Error Usuario',
        message: 'Alguno de los Usuarios no existe',
      };
    }

    return usuarios;
  }

  async actualizarUsuarioTracking(input: UpdateStkUsuarioTrackingInput) {
    const { id } = input;
    delete input.id;

    const usuarioTrackingExiste =
      await this.prisma.stkUsuarioTracking.findUnique({
        where: {
          id: id,
        },
      });

    if (!usuarioTrackingExiste)
      return {
        errorName: 'Error Usuario',
        message: 'El usuario seleccionado no existe',
      };
    const usuarioActualizado = await this.prisma.stkUsuarioTracking.update({
      where: {
        id: id,
      },
      data: {
        ...input,
      },
    });

    return usuarioActualizado;
  }

  async eliminarUsuarioTracking(input: deleteStkUsuariosTrackingInput) {
    const usuarioTrackingExiste =
      await this.prisma.stkUsuarioTracking.findUnique({
        where: {
          id: input.id,
        },
      });

    if (!usuarioTrackingExiste)
      return {
        errorName: 'Error Usuario',
        message: 'El usuario no existe',
      };

    const usuarioEliminado = await this.prisma.stkUsuarioTracking.delete({
      where: {
        id: input.id,
      },
    });
    return usuarioEliminado;
  }
}
