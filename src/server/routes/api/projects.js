import express from 'express';
import sql from 'mssql';

const router = express.Router();

function flatten(arr) {
    return [].concat(...arr)
}

// @route   GET api/projects
// @desc    Returns all projects
// @access  Public
router.get("/", (req, res) => {
    return new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }).connect()
        .then((pool) => pool.request()
            .execute('prc_GetAllProjects')
            .then(projects => {
                return Promise.all(
                    projects.recordset.map(p => pool.request()
                        .input('ProjectDetailId', sql.Int, p.ProjectDetailsId)
                        .execute('prc_GetProjectDetailsImages')
                    )
                ).then(images => {
                    return Promise.all(
                        projects.recordset.map(p => pool.request()
                            .input('ProjectDetailId', sql.Int, p.ProjectDetailsId)
                            .execute('prc_GetProjectDetailsTags')
                        )
                    ).then(tags => {
                        const t = flatten(tags.map(x => x.recordset));
                        const i = flatten(images.map(x => x.recordset));
                        const result = projects.recordset
                            .map(project => ({
                                ...project,
                                tags: t.filter(tag => tag.ProjectDetailId === project.ProjectDetailsId),
                                images: i.filter(image => image.ProjectDetailId === project.ProjectDetailsId),
                            }))

                        return result;
                    })
                })
            })
        ).then((projects) => {
            res.status(201).json(projects);
        }).catch(err => {
            console.log(err)

            res.status(400).json(err);
        });
});

export default router;