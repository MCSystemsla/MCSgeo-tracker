BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[stkUsuarioTracking] DROP CONSTRAINT [stkUsuarioTracking_objSucursalId_fkey];

-- AlterTable
ALTER TABLE [dbo].[stkUsuarioTracking] ALTER COLUMN [objSucursalId] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[stkUsuarioTracking] ADD CONSTRAINT [stkUsuarioTracking_objSucursalId_fkey] FOREIGN KEY ([objSucursalId]) REFERENCES [dbo].[stkSucursal]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
