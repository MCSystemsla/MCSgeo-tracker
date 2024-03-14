BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[stkEmpresa] (
    [id] INT NOT NULL IDENTITY(1,1),
    [codigo] NVARCHAR(100) NOT NULL,
    [nombre] NVARCHAR(100) NOT NULL,
    [descripcion] NVARCHAR(150) NOT NULL,
    [activo] BIT NOT NULL,
    [fechaCreacion] DATETIME NOT NULL,
    [stkUsuarioTrackingId] INT NOT NULL,
    CONSTRAINT [stkEmpresa_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[stkSucursal] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(100) NOT NULL,
    [stkEmpresaId] INT NOT NULL,
    CONSTRAINT [stkSucursal_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[stkEmpresa] ADD CONSTRAINT [stkEmpresa_stkUsuarioTrackingId_fkey] FOREIGN KEY ([stkUsuarioTrackingId]) REFERENCES [dbo].[stkUsuarioTracking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[stkSucursal] ADD CONSTRAINT [stkSucursal_stkEmpresaId_fkey] FOREIGN KEY ([stkEmpresaId]) REFERENCES [dbo].[stkEmpresa]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
