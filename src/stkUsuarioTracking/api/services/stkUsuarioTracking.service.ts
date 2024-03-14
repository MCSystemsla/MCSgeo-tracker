import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  UpdateStkUsuarioTrackingInput,
  createStkUsuarioTrackingInput,
  deleteStkUsuariosTrackingInput,
  getStkUsuariosTrackingInput,
} from '../models/createStkUsuarioTracking.input';

@Injectable()
export class stkUsuarioTrackingService {
  constructor(private prisma: PrismaService) {}

  async crearUsuarioTracking(input: createStkUsuarioTrackingInput) {
    const usuarioTrackingExiste =
      await this.prisma.stkUsuarioTracking.findUnique({
        where: {
          cedula: input.cedula,
        },
      });

    if (usuarioTrackingExiste) {
      return {
        errorName: 'Error Usuario',
        message: 'La cedula ingresada ya perteneces a otro usuario.',
      };
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

    const nuevoUsuarioTracking = await this.prisma.stkUsuarioTracking.create({
      data: {
        ...input,
        fechaCreacion: new Date().toISOString(),
      },
    });

    return nuevoUsuarioTracking;
  }

  async solicitarUsuarioTracking(input: getStkUsuariosTrackingInput) {
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
    const usuarioEliminado = await this.prisma.stkUsuarioTracking.delete({
      where: {
        id: input.id,
      },
    });
    return usuarioEliminado;
  }
}
