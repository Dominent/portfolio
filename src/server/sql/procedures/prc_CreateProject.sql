DELIMITER $$
CREATE PROCEDURE `prc_CreateProject` (
	IN title NVARCHAR(100),
    IN description NVARCHAR(1000)
) BEGIN
	INSERT INTO tbl_Projects (
		Title,
		Description
	) VALUES (
		title,
		description
	);

	SELECT * FROM tbl_Projects WHERE ID = LAST_INSERT_ID();
END $$

-- CALL prc_CreateProject('Test Project', 'Amazing Project');