-- GRANT EXECUTE TO [user]

SET IDENTITY_INSERT tbl_Projects ON
INSERT INTO tbl_Projects (
	Id,
	Header,
	ImageSrc,
	Description
) VALUES
	(1, 'Boroinvest', 'img/boroinvest.png', 'Website project for a travel agency'),
	(2, 'Portfolio', 'img/portfolio.png', 'Personal Portfolio'),
	(3, 'UT Front React', 'img/softwaregroup.png', 'Contributor to UT Front React framework'),
	(4, 'Galiciq', 'img/galiciq.png', 'Website project for a local barber shop'),
	(5, 'JustFake - NPM', 'img/npm.png', 'Fake data extension for swagger via spec file'),
	(6, 'Swagger', 'img/swagger.png', 'Contributor to Swagger'),
	(7, 'Lioncraft', 'img/lioncraft.png', 'CMS project for a minecraft server')
SET IDENTITY_INSERT tbl_Projects OFF

SET IDENTITY_INSERT tbl_ProjectDetails ON
INSERT INTO tbl_ProjectDetails (
	Id,
	ProjectId,
	Header,
	Info,
	Description
) VALUES
	(1, 1, 'Boroinvest', 'Website project for a travel agency', 'Website project I did for a travel agency. The tricky part of this project was that i needed to display vacation offers from partners. No API\''s were present so the data was scraped via a custom scraper I made, after that parsed and saved in a MySQL database (total sites that were scraped: 6). From there via SignalR the webpage was updated.Webpage was optimized for mobile devices.Hosted on Heroku and delivered on time.'),
	(2, 2, 'Personal Portfolio', 'Portfolio Website', 'Portfolio project build from scratch to showcase my work. front-end was build with React.js and the back-end is running Express.js. Hosted on Heroku, developed on GitHub'),
	(3, 3, 'Contributor to UT Front React framework', 'Front end framework for React.js based applications', 'Developed several components for the framework. Created JSON editor, custom dropdown with multiple themes, added a responsive grid and fixed numerous issues'),
	(4, 4, 'Galiciq', 'Website project for a local barber shop', 'Small website project I did for a local barber shop. It was a basic SPA application with an administration page and included authentication. Contacts form was configured to send email to a given recipient address. Webpage was optimized for mobile devices.Hosted on Heroku and delivered on time.'),
	(5, 5, 'JustFake - NPM', 'Fake data extension for swagger via spec file', 'This library extends the swagger functionality, adding support for Faker.js attributes in the swagger spec file, by default it is the swagger.yaml file. Also adds support for generating fake values dynamically on each request'),
	(6, 6, 'Swagger', 'Contributor to Swagger', 'Swagger is a framework for describing your API using a common language that everyone can understand. My contribution to the projects was reporting several issues and developing fixes for them.'),
	(7, 7, 'Lioncraft', 'CMS project for a minecraft server', 'CMS project I did for a minecraft server. Included 4 pages. Home Page, Custom Shop, Handmade Forum and Administration Page. The Shop included cart and custom payment methods: SMS, PayPall and more. Forum had custom reward/point system. The Administration Page managed users, forum and payments. Website included User Creation, Authentication and Management. Another valuable feature was the dynamic translations for the whole CMS. Languages that were handled by default were: Bulgarian and English. Webpage was optimized for mobile devices. Delivered on time.')
SET IDENTITY_INSERT tbl_ProjectDetails OFF

SET IDENTITY_INSERT tbl_ProjectsTags ON
INSERT INTO tbl_ProjectsTags (
	Id,
	Name
) VALUES 
	(1, 'HTML5'),
	(2, 'CSS'),
	(3, 'Javascript'),
	(4, 'Heroku'),
	(5, 'Angular 4'),
	(6, '.NET Core'),
	(7, 'ASP.NET'),
	(8, 'SignalR'),
	(9, 'Node.js'),
	(10, 'React.js'),
	(11, 'Swagger'),
	(12, '.NET'),
	(13, 'NPM')
SET IDENTITY_INSERT tbl_ProjectsTags OFF


INSERT INTO tbl_ProjectDetailsTags (
	ProjectDetailId,
	ProjectTagId
) VALUES 
	(1, 1),(1, 2),(1, 3),(1, 4),(1, 5),(1, 6),(1, 7),(1, 8),
	(2, 9),(2, 1),(2, 2),(2, 3),(2, 4),(2, 10),
	(3, 3),(3, 10),
	(4, 9),(4, 1),(4, 2),(4, 3),(4, 4),
	(5, 3),(5, 13),(5, 11),
	(6, 3),(6, 11),
	(7, 9),(7, 1),(7, 2),(7, 3),(7, 4),(7, 5),(7, 12),(7, 7)

SET IDENTITY_INSERT tbl_ProjectsImages ON
INSERT INTO tbl_ProjectsImages (
	Id,
	Src,
	Alt
) VALUES 
	(1, 'img/boroinvest.png', ''),
	(2, 'img/portfolio.png', ''),
	(3, 'img/softwaregroup.png', ''),
	(4, 'img/galiciq.png', ''),
	(5, 'img/npm.png', ''),
	(6, 'img/swagger.png', ''),
	(7, 'img/lioncraft.png', '')
SET IDENTITY_INSERT tbl_ProjectsImages OFF

INSERT INTO tbl_ProjectDetailsImages (
	ProjectDetailId,
	ProjectImageId
) VALUES 
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 4),
	(5, 5),
	(6, 6),
	(7, 7)

