/*
  Warnings:

  - You are about to drop the column `stkUsuarioTrackingId` on the `stkEmpresa` table. All the data in the column will be lost.
  - Added the required column `objUsuarioCreacionId` to the `stkEmpresa` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[stkEmpresa] DROP CONSTRAINT [stkEmpresa_stkUsuarioTrackingId_fkey];

-- AlterTable
ALTER TABLE [dbo].[stkEmpresa] DROP COLUMN [stkUsuarioTrackingId];
ALTER TABLE [dbo].[stkEmpresa] ADD [objUsuarioCreacionId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[stkEmpresa] ADD CONSTRAINT [stkEmpresa_objUsuarioCreacionId_fkey] FOREIGN KEY ([objUsuarioCreacionId]) REFERENCES [dbo].[stkUsuarioTracking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
