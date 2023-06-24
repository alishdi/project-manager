const { indexRouter } = require('./router/router');

module.exports = class Application {
    #express = require('express');
    #app = this.#express()
    constructor(PORT, DB_URL) {
        this.configDatabase(DB_URL)
        this.configApplication()
        this.createServer(PORT)
        this.creteRoutes()
        this.errorHandler()
    }

    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')));
        this.#app.use(this.#express.json())
        this.#app.use(this.#express.urlencoded({ extended: true }))

    }
    createServer(PORT) {
        this.#app.listen(PORT, () => {
            console.log(`server run on port ${PORT} http://localhost:${3000}`);
        })
    }
    configDatabase(DB_URL) {
        const mongoose = require('mongoose');
        mongoose.connect(DB_URL).then(() => {
            console.log('server connected to mongodb');
        },
            (err) => { console.log(err.message) });
    };
    errorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode: 404,
                msg: 'Notfound Err'
            })
        })
        this.#app.use((error, req, res, next) => {
            console.log(error);
            return res.status(error?.status || 500).json({
                statusCode: error?.status || 500,
                msg: error?.message || 'Notfound Err'
            })
        })
    }
    creteRoutes() {
        this.#app.get('/', (req, res, next) => {
            return res.json({
                msg: 'this is a new express application'
            })
        })
        this.#app.use(indexRouter)

        // this.#app.use((err,req, res, next) => {
        //     try {
        //     } catch (error) {
        //         next(error)
        //     }
        // })
    }
}