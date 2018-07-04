export default [
    {
        header: 'Galiciq',
        src: `${process.env.PUBLIC_URL}/img/galiciq-portfolio.png`,
        description: 'Sample Website for a local barber shop',
        details: {
            header: 'Galiciq',
            info: 'Sample Website for a local barber shop',
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain',
            images: [{
                src: '/img/galiciq-portfolio.png',
                alt: ''
            },
            {
                src: '/img/base-portfolio.png',
                alt: ''
            },
            {
                src: '/img/galiciq-portfolio.png',
                alt: ''
            }].map(x => Object.assign(x, {
                src: x.src + process.env.PUBLIC_URL
            })),
            tags: [
                'Node.js', 'HTML5', 'CSS', 'Javascript', 'Heroku'
            ]
        }
    },
    {
        header: 'Galiciq',
        src: `${process.env.PUBLIC_URL}/img/base-portfolio.png`,
        description: 'Sample Website for a local barber shop',
        details: {
            header: 'Galiciq',
            info: 'Sample Website for a local barber shop',
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain',
            images: [{
                src: '/img/galiciq-portfolio.png',
                alt: ''
            },
            {
                src: '/img/base-portfolio.png',
                alt: ''
            },
            {
                src: '/img/galiciq-portfolio.png',
                alt: ''
            }].map(x => Object.assign(x, {
                src: x.src + process.env.PUBLIC_URL
            })),
            tags: [
                'Node.js', 'HTML5', 'CSS', 'Javascript', 'Heroku'
            ]
        }
    }
]