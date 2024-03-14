/*
  Warnings:

  - Made the column `objSucursalId` on table `stkUsuarioTracking` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[stkSucursal] DROP CONSTRAINT [stkSucursal_objEmpresaId_fkey];

-- AlterTable
ALTER TABLE [dbo].[stkUsuarioTracking] ALTER COLUMN [objSucursalId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[stkUsuarioTracking] ADD CONSTRAINT [stkUsuarioTracking_objSucursalId_fkey] FOREIGN KEY ([objSucursalId]) REFERENCES [dbo].[stkSucursal]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[stkSucursal] ADD CONSTRAINT [stkSucursal_objEmpresaId_fkey] FOREIGN KEY ([objEmpresaId]) REFERENCES [dbo].[stkEmpresa]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
