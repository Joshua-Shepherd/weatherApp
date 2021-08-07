module.exports = (app) => {
//controller - Will setup later
    const forcasts = require('../controllers/forcastController.js')

    app.post('/api/weatherApi',forcasts.create)
    app.get('/api/weatherApi',forcasts.findAll)
    app.get('/api/weatherApi/:forcastId',forcasts.findOne)
    app.put('/api/weatherApi/:forcastId',forcasts.update)
    app.delete('/api/weatherApi/:forcastId',forcasts.delete)
}