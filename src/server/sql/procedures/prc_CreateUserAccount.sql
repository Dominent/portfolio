CREATE PROCEDURE [dbo].[prc_CreateUserAccount]
	@Username NVARCHAR(100),
	@Password NVARCHAR(300),
	@Email NVARCHAR(100),
	@Error NVARCHAR(Max) OUTPUT
AS
BEGIN
IF EXISTS (SELECT *
		FROM tbl_Users
		WHERE Email = @Email) 
	BEGIN
		DECLARE @ErrorsTVP tvp_Errors;

		INSERT INTO @ErrorsTVP (Name)
		VALUES ('user.email.exists')

		SET @Error = (SELECT * FROM @ErrorsTVP FOR JSON AUTO)
	END
	ELSE
	BEGIN
		INSERT INTO tbl_Users (
			Username,
			Password,
			Email ) 
		VALUES (
			@Username,
			@Password,
			@Email )
	END
END