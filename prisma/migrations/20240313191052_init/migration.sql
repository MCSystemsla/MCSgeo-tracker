/*
  Warnings:

  - You are about to drop the column `objSucursalId` on the `stkDispositivo` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[stkDispositivo] DROP CONSTRAINT [stkDispositivo_objSucursalId_fkey];

-- AlterTable
ALTER TABLE [dbo].[stkDispositivo] DROP COLUMN [objSucursalId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
