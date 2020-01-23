const queries = require('../../db/queries')

exports.main = async (req, res, next) => {
    try {
        res.send('bla')
    } catch(err){
        next(err)
    } 
}

exports.getUser = async (req, res, next) => {
    queries.findUser(req.params.id)
           .then( user => {
                    res.send(user)
                }) 
                .catch(err => {
                    next(err)
                })
}

exports.deleteUser = async (req, res, next) => {
    queries.deleteUser(req.body.id)
    .then( deletedCount => {
        res.send('User was deleted successfully!')
    })
    .catch( err => {
            next(err)
    })
}

exports.logIn = async (req, res, next) => {
    console.log('user name in server: '+req.params.username)
    const usernameToSend = req.params.username
    console.log(usernameToSend)
    res.send(usernameToSend)
    // queries.findUser(req.params.id)
    //        .then( user => {
    //                 res.send(user)
    //             }) 
    //             .catch(err => {
    //                 next(err)
    //             })
}