CREATE PROCEDURE [dbo].[prc_GetProjectDetailsTags]
	@ProjectDetailId INT
AS
BEGIN
	SELECT 
		d.ProjectDetailId AS ProjectDetailId,
		i.Id AS ProjectTagId,
		i.Name
	FROM tbl_ProjectDetailsTags d
	JOIN tbl_ProjectsTags i
		ON d.ProjectTagId = i.Id 
	WHERE ProjectDetailId = @ProjectDetailId
END