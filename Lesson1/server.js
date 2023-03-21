// Modules
const fs = require('fs')
const http = require('http')
const path = require('path')

// const file = fs.readFileSync(__dirname + "/text.txt")
// console.log(file.toString());
// Create a webserver
const server = http.createServer((request, response) => {
    // Header
    response.writeHead(200, {
        "Content-Type": "text/html"
    })
    if (request.url == "/") {
        const home = fs.readFileSync(path.join(__dirname, "text.txt"), "utf-8")
        response.write(home)
    } else if(request.url == "/product") {
        const html = `
        <html>
            <body>
                <h1>Product</h1>
            </body>
        </html>
        `
        response.write(html)
    }

    response.end()
})

server.listen(8000, () => {
    console.log("Server running at port 8000");
})