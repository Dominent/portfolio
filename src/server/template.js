export default function ({ content, state }) {
    let clientBundlePath = 'client.bundle.js';
    let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="main.css"/>
        </head>
        <body>
            <div id="root">${content}</div>
            <script src="${clientBundlePath}"></script>
            <script>window.__STATE__ = '${JSON.stringify(state)}'</script>
        </body>
        </html>
    `;

    return template;
}