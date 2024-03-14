BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[stkUsuarioTracking] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cedula] NVARCHAR(50) NOT NULL,
    [primerNombre] NVARCHAR(50) NOT NULL,
    [segundoNombre] NVARCHAR(50) NOT NULL,
    [primerApellido] NVARCHAR(50) NOT NULL,
    [segundoApellido] NVARCHAR(50) NOT NULL,
    [objSucursalId] NVARCHAR(1000),
    [activo] BIT NOT NULL,
    [fechaCreacion] DATETIME NOT NULL,
    CONSTRAINT [stkUsuarioTracking_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
