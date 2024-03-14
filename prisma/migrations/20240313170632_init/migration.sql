/*
  Warnings:

  - You are about to drop the column `stkEmpresaId` on the `stkSucursal` table. All the data in the column will be lost.
  - Added the required column `objEmpresaId` to the `stkSucursal` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[stkSucursal] DROP CONSTRAINT [stkSucursal_stkEmpresaId_fkey];

-- AlterTable
ALTER TABLE [dbo].[stkSucursal] DROP COLUMN [stkEmpresaId];
ALTER TABLE [dbo].[stkSucursal] ADD [objEmpresaId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[stkSucursal] ADD CONSTRAINT [stkSucursal_objEmpresaId_fkey] FOREIGN KEY ([objEmpresaId]) REFERENCES [dbo].[stkEmpresa]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
