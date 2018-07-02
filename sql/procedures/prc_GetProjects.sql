DELIMITER $$
CREATE PROCEDURE `prc_GetProjects` () BEGIN
	SELECT * FROM  tbl_Projects;
END $$