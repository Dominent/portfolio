CREATE PROCEDURE [dbo].[prc_GetAllProjects]
AS
BEGIN
	SELECT 
		p.Id,
		p.Header,
		p.ImageSrc,
		p.Description,
		d.Id AS ProjectDetailsId,
		d.Description AS ProjectDetailsDescription,
		d.Header AS ProjectDetailsHeader,
		d.Info AS ProjectDetailsInfo
	FROM tbl_Projects p
	JOIN tbl_ProjectDetails d
		ON p.Id = d.ProjectId
END