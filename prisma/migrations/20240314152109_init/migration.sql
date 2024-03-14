/*
  Warnings:

  - A unique constraint covering the columns `[cedula]` on the table `stkUsuarioTracking` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[stkUsuarioTracking] ADD CONSTRAINT [stkUsuarioTracking_cedula_key] UNIQUE NONCLUSTERED ([cedula]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
