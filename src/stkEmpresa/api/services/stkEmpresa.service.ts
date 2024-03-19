import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  UpdateStkEmpresaInput,
  createStkEmpresaInput,
  deleteStkEmpresaInput,
  getStkEmpresaInput,
  getStkMultiplesEmpresasInput,
} from '../models/stkEmpresa.input';

@Injectable()
export class stkEmpresaService {
  constructor(private prisma: PrismaService) {}

  async crearEmpresa(input: createStkEmpresaInput) {
    const empresaExiste = await this.prisma.stkEmpresa.findUnique({
      where: {
        codigo: input.codigo,
      },
    });

    if (empresaExiste) {
      return {
        errorName: 'Error Empresa',
        message: 'El codigo ingresado ya pertenece a otra empresa.',
      };
    }

    if (input.objUsuarioCreacionId) {
      const usuarioTrackingExiste =
        await this.prisma.stkUsuarioTracking.findUnique({
          where: {
            id: input.objUsuarioCreacionId,
          },
        });

      if (!usuarioTrackingExiste) {
        return {
          errorName: 'Error Usuario Tracking',
          message: 'El usuario de tracking no existe.',
        };
      }
    }

    const nuevaEmpresa = await this.prisma.stkEmpresa.create({
      data: {
        ...input,
        fechaCreacion: new Date().toISOString(),
      },
    });

    return nuevaEmpresa;
  }

  async solicitarEmpresa(input: getStkEmpresaInput) {
    const searchById = { id: input.id };
    const searchByCodigo = { codigo: input.codigo };
    const searchArgument = input.id ? searchById : searchByCodigo;

    const empresa = await this.prisma.stkEmpresa.findUnique({
      where: {
        ...searchArgument,
      },
    });

    if (!empresa) {
      return {
        message: 'Error Empresa',
        errorName: 'La empresa no existe.',
      };
    }

    return empresa;
  }

  async solicitarMultiplesEmpresas(input: getStkMultiplesEmpresasInput) {
    const searchById = { id: { in: input.id } };
    const searchByCodigo = { codigo: { in: input.codigo } };
    const searchArgument = input.id ? searchById : searchByCodigo;
    const empresasEsperadas = input.id ? input.id.length : input.codigo.length;

    const stkEmpresas = await this.prisma.stkEmpresa.findMany({
      where: {
        ...searchArgument,
      },
    });

    if (!stkEmpresas) {
      return {
        message: 'Error Empresa',
        errorName: 'La empresa no existe.',
      };
    }

    const empresas = {
      empresas: stkEmpresas,
    };
    if (empresas.empresas.length !== empresasEsperadas) {
      return {
        errorName: 'Error Empresa',
        message: 'Alguna de las Empresas no existe',
      };
    }

    return empresas;
  }

  async actualizarEmpresa(input: UpdateStkEmpresaInput) {
    const { id } = input;
    delete input.id;

    const empresaExiste = await this.prisma.stkEmpresa.findUnique({
      where: {
        id: id,
      },
    });

    if (!empresaExiste) {
      return {
        errorName: 'Error Empresa',
        message: 'La empresa no existe.',
      };
    }

    const empresaActualizada = await this.prisma.stkEmpresa.update({
      where: {
        id: id,
      },
      data: {
        ...input,
      },
    });

    return empresaActualizada;
  }

  async eliminarEmpresa(input: deleteStkEmpresaInput) {
    const empresaExiste = await this.prisma.stkEmpresa.findUnique({
      where: { id: input.id },
    });

    if (!empresaExiste) {
      return {
        errorName: 'Error Empresa',
        message: 'La empresa no existe.',
      };
    }
    const empresaEliminada = await this.prisma.stkEmpresa.delete({
      where: {
        id: input.id,
      },
    });
    return empresaEliminada;
  }
}
