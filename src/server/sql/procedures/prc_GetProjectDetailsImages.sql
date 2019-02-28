CREATE PROCEDURE [dbo].[prc_GetProjectDetailsImages]
	@ProjectDetailId INT
AS
BEGIN
	SELECT 
		d.ProjectDetailId AS ProjectDetailId,
		i.Id AS ProjectImageId,
		i.Src,
		i.Alt
	FROM tbl_ProjectDetailsImages d
	JOIN tbl_ProjectsImages i
		ON d.ProjectImageId = i.Id 
	WHERE ProjectDetailId = @ProjectDetailId
END