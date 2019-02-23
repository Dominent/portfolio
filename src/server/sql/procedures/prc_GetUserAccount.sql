CREATE PROCEDURE [dbo].[prc_GetUserAccount]
	@Email NVARCHAR(100)
AS
BEGIN
	SELECT
		Id,
		Username,
		Email,
		Password
	FROM tbl_Users
	WHERE Email = @Email
END