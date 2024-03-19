BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[stkEmpresa] DROP CONSTRAINT [stkEmpresa_objUsuarioCreacionId_fkey];

-- AlterTable
ALTER TABLE [dbo].[stkEmpresa] ALTER COLUMN [objUsuarioCreacionId] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[stkEmpresa] ADD CONSTRAINT [stkEmpresa_objUsuarioCreacionId_fkey] FOREIGN KEY ([objUsuarioCreacionId]) REFERENCES [dbo].[stkUsuarioTracking]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
