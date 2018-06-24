'use strict'

const path = require('path')
const fs = require('fs')

let DIST_DIR
let HASH_LENGTH
let HTML_INPUT
let HTML_OUTPUT
let SCRIPT_URL

function BuildPlugin(options) {
    DIST_DIR = options.DIST_DIR
    HASH_LENGTH = options.HASH_LENGTH
    HTML_INPUT = options.HTML_INPUT
    HTML_OUTPUT = options.HTML_OUTPUT
    SCRIPT_URL = options.SCRIPT_URL
}

BuildPlugin.prototype.apply = (compiler) =
>
{

    compiler.plugin('compilation', compilation = > {
        clean_dist_dir()
    }
)

    compiler.plugin('emit', (compilation, callback) = > {
        // console.log('Executing post-build scripts')
        callback()
    }
)

    compiler.plugin('done', (stats) = > {
        const hash_js = stats.compilation.fullHash.substring(0, HASH_LENGTH)
        write_index_html(hash_js)
    }
)
}

const clean_dist_dir = () =
>
{

    console.log('Clean dist dir ... ', DIST_DIR)

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

    console.log('Dist HTML  ...', write_out_file)

    fs.readFile(read_in_file, 'utf8', (err, data) = > {
        if(err) return console.log(err)

        // inject hash in template
        const scriptWithHash = SCRIPT_URL.replace(/{hash_js}/g, hash_js)
        let result = data.replace(/{nx_client_script}/g, scriptWithHash)
        fs.writeFile(write_out_file, result, 'utf8', (err) = > {
        if(err) return console.log(err)
    }
)
})
}

module.exports = BuildPlugin