const fs = require('fs')
const path = require('path')

fs.readdir(path.resolve(__dirname), (err, data) => {
    if (!err) {
        const result = data.map(item => item.split('.')[0])
        console.log(result)
    }
})
