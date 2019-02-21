// import boroinvest from '../img/boroinvest.png';

export default [
    {
        header: 'Boroinvest',
        src: `${process.env.PUBLIC_URL}/img/boroinvest.png`,
        description: 'Website project for a travel agency',
        details: {
            header: 'Boroinvest',
            info: 'Website project for a travel agency',
            description: 'Website project I did for a travel agency. The tricky part of this project was that i needed to display vacation offers from partners. No API\'s were present so the data was scraped via a custom scraper I made, after that parsed and saved in a MySQL database (total sites that were scraped: 6). From there via SignalR the webpage was updated.Webpage was optimized for mobile devices.Hosted on Heroku and delivered on time.',
            images: [
                { src: `${process.env.PUBLIC_URL}/img/boroinvest.png`, alt: '' }
            ],
            tags: [
                'HTML5', 'CSS', 'Javascript', 'Heroku', 'Angular 4', '.NET Core', 'ASP.NET', 'SignalR'
            ]
        }
    },
    {
        header: 'Portfolio',
        src: `${process.env.PUBLIC_URL}/img/portfolio.png`,
        description: 'Personal Portfolio',
        details: {
            header: 'Personal Portfolio',
            info: 'Portfolio Website',
            description: 'Portfolio project build from scratch to showcase my work. front-end was build with React.js and the back-end is running Express.js. Hosted on Heroku, developed on GitHub',
            images: [
                { src: `${process.env.PUBLIC_URL}/img/portfolio.png`, alt: '' }
            ],
            tags: [
                'Node.js', 'HTML5', 'CSS', 'Javascript', 'Heroku', 'React.js'
            ],
            links: [
                {
                    href: 'https://github.com/Dominent/portfolio',
                    name: 'repository',
                }
            ]
        }
    },
    {
        header: 'UT Front React',
        src: `${process.env.PUBLIC_URL}/img/softwaregroup.png`,
        description: 'Contributor to UT Front React framework',
        details: {
            header: 'Contributor to UT Front React framework',
            info: 'Front end framework for React.js based applications',
            description: 'Developed several components for the framework. Created JSON editor, custom dropdown with multiple themes, added a responsive grid and fixed numerous issues',
            images: [
                { src: `${process.env.PUBLIC_URL}/img/softwaregroup.png`, alt: '' }
            ],
            tags: [
                'Javascript', 'React'
            ],
            links: [
                {
                    href: 'https://github.com/softwaregroup-bg/ut-front-react',
                    name: 'ut-front-react',
                }
            ]
        }
    },
    {
        header: 'Galiciq',
        src: `${process.env.PUBLIC_URL}/img/galiciq.png`,
        description: 'Website project for a local barber shop',
        details: {
            header: 'Galiciq',
            info: 'Website project for a local barber shop',
            description: 'Small website project I did for a local barber shop. It was a basic SPA application with an administration page and included authentication. Contacts form was configured to send email to a given recipient address. Webpage was optimized for mobile devices.Hosted on Heroku and delivered on time.',
            images: [
                { src: `${process.env.PUBLIC_URL}/img/galiciq.png`, alt: '' },
            ],
            tags: [
                'Node.js', 'HTML5', 'CSS', 'Javascript', 'Heroku'
            ]
        }
    },
    {
        header: 'JustFake - NPM',
        src: `${process.env.PUBLIC_URL}/img/npm.png`,
        description: 'Fake data extension for swagger via spec file',
        details: {
            header: 'JustFake - NPM',
            info: 'Fake data extension for swagger via spec file',
            description: 'This library extends the swagger functionality, adding support for Faker.js attributes in the swagger spec file, by default it is the swagger.yaml file. Also adds support for generating fake values dynamically on each request',
            images: [
                { src: `${process.env.PUBLIC_URL}/img/npm.png`, alt: '' }
            ],
            tags: [
                'Javascript', 'NPM', 'Swagger'
            ],
            links: [
                {
                    href: 'https://www.npmjs.com/package/justfake',
                    name: 'npm repository',
                }
            ]
        }
    },
    {
        header: 'Swagger',
        src: `${process.env.PUBLIC_URL}/img/swagger.png`,
        description: 'Contributor to Swagger',
        details: {
            header: 'Swagger',
            info: 'Contributor to Swagger',
            description: 'Swagger is a framework for describing your API using a common language that everyone can understand. My contribution to the projects was reporting several issues and developing fixes for them.',
            images: [
                { src: `${process.env.PUBLIC_URL}/img/swagger.png`, alt: '' }
            ],
            tags: [
                'Swagger', 'Javascript'
            ],
            links: [
                {
                    href: 'https://github.com/swagger-api',
                    name: 'swagger-api'
                }
            ]
        }
    },
    {
        header: 'Lioncraft',
        src: `${process.env.PUBLIC_URL}/img/lioncraft.png`,
        description: 'CMS project for a minecraft server',
        details: {
            header: 'Lioncraft',
            info: 'CMS project for a minecraft server',
            description: 'CMS project I did for a minecraft server. Included 4 pages. Home Page, Custom Shop, Handmade Forum and Administration Page. The Shop included cart and custom payment methods: SMS, PayPall and more. Forum had custom reward/point system. The Administration Page managed users, forum and payments. Website included User Creation, Authentication and Management. Another valuable feature was the dynamic translations for the whole CMS. Languages that were handled by default were: Bulgarian and English. Webpage was optimized for mobile devices. Delivered on time.',
            images: [
                { src: `${process.env.PUBLIC_URL}/img/lioncraft.png`, alt: '' }
            ],
            tags: [
                'Node.js', 'HTML5', 'CSS', 'Javascript', 'Heroku', 'Angular 4', '.NET', 'ASP.NET'
            ]
        }
    },
    
]


