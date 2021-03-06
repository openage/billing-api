'use strict'

const webServer = require('config').webServer

var about = require('../package.json')

const spec = {
    swagger: '2.0',
    info: {
        version: about.version,
        title: about.name
    },
    host: webServer.url.replace(/(^\w+:|^)\/\//, ''),
    basePath: '/api',
    schemes: [],
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'
    ],
    paths: {},
    definitions: {}
}

exports.get = () => {
    purge('./definitions')
    purge('./paths')

    spec.definitions = require('./definitions')
    spec.paths = require('./paths').paths()
    return spec
}

exports.routes = () => {
    return require('./paths').routes()
}
const purge = (path) => {
    var id = require.resolve(path)
    if (require.cache[id] !== undefined) {
        delete require.cache[id]
    }
}
