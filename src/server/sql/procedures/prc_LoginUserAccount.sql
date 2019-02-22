CREATE PROCEDURE [dbo].[prc_LoginUserAccount]
	@Username NVARCHAR(100),
	@Password NVARCHAR(300)
AS
BEGIN
	SELECT 
		Username,
		Email
	FROM tbl_Users
	WHERE Username = @Username AND Password = @Password
END