BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[stkUsuarioDispositivo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [objDispositivoId] INT NOT NULL,
    [objUsuarioTrackingId] INT NOT NULL,
    [activo] BIT NOT NULL,
    [fechaCreacion] DATETIME NOT NULL,
    CONSTRAINT [stkUsuarioDispositivo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[stkUsuarioDispositivo] ADD CONSTRAINT [stkUsuarioDispositivo_objDispositivoId_fkey] FOREIGN KEY ([objDispositivoId]) REFERENCES [dbo].[stkDispositivo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[stkUsuarioDispositivo] ADD CONSTRAINT [stkUsuarioDispositivo_objUsuarioTrackingId_fkey] FOREIGN KEY ([objUsuarioTrackingId]) REFERENCES [dbo].[stkUsuarioTracking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
