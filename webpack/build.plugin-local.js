'use strict'
const path = require('path')
const fs = require('fs')

let DIST_DIR
let HTML_INPUT
let HTML_OUTPUT
let isRunned = false // run only once
let SCRIPT_URL

function BuildPluginLocal(options) {
    DIST_DIR = options.DIST_DIR
    HTML_INPUT = options.HTML_INPUT
    HTML_OUTPUT = options.HTML_OUTPUT
    SCRIPT_URL = options.SCRIPT_URL
}

BuildPluginLocal.prototype.apply = (compiler) =
>
{

    compiler.plugin('compilation', compilation = > {
        if(
    !isRunned
)
    {
        clean_dist_dir()
    }
})

    compiler.plugin('emit', (compilation, callback) = > {
        // console.log('Executing post-build scripts')
        callback()
    }
)

    compiler.plugin('done', (stats) = > {
        if(
    !isRunned
)
    {
        write_index_html()
    }
    isRunned = true
})
}

const clean_dist_dir = () =
>
{
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    }
    fs.readdir(DIST_DIR, (err, files) = > {
        if(
    !err
)
    {
        for (const file of files) {
            fs.unlink(path.join(DIST_DIR, file), err = > {
                if(err) throw err
            }
        )
        }
    }
})
}

const write_index_html = (hash_js) =
>
{

    const read_in_file = HTML_INPUT
    const write_out_file = HTML_OUTPUT

    fs.readFile(read_in_file, 'utf8', (err, data) = > {
        if(err) return console.log(err)

        // inject hash in template
        let result = data.replace(/{nx_client_script}/g, SCRIPT_URL)
        fs.writeFile(write_out_file, result, 'utf8', (err) = > {
        if(err) return console.log(err)
    }
)
})
}

module.exports = BuildPluginLocal