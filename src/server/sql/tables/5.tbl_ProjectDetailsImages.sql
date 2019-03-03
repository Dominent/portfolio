CREATE TABLE tbl_ProjectDetailsImages
(
	Id INT IDENTITY PRIMARY KEY NOT NULL,
	ProjectDetailId INT NOT NULL FOREIGN KEY REFERENCES tbl_ProjectDetails(Id),
	ProjectImageId INT NOT NULL FOREIGN KEY REFERENCES tbl_ProjectsImages(Id)
)