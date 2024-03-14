/*
  Warnings:

  - Added the required column `fechaCreacion` to the `stkSucursal` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[stkSucursal] ADD [fechaCreacion] DATETIME NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[stkDispositivo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [imei] NVARCHAR(50) NOT NULL,
    [objSucursalId] INT NOT NULL,
    [activo] BIT NOT NULL,
    [fechaCreacion] DATETIME NOT NULL,
    [objUsuarioCreacionId] INT NOT NULL,
    CONSTRAINT [stkDispositivo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[stkDispositivo] ADD CONSTRAINT [stkDispositivo_objSucursalId_fkey] FOREIGN KEY ([objSucursalId]) REFERENCES [dbo].[stkSucursal]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[stkDispositivo] ADD CONSTRAINT [stkDispositivo_objUsuarioCreacionId_fkey] FOREIGN KEY ([objUsuarioCreacionId]) REFERENCES [dbo].[stkUsuarioTracking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
