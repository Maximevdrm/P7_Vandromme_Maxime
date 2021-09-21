const bcrypt = require('bcryptjs');
const connectUtils = require('../utils/connect');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    
    connectUtils.connection.query('SELECT * FROM `users` WHERE mail = ? AND deleted = 0',
    [req.body.mail],
    function(err,results){
        if(err){
            return res.status(500).json({ err });
        }
        if (results.length != 1){
            return res.status(401).json({ error: 'Utilisateur introuvable !' });
        }
        let user = results[0];
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe invalide !' });
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id, isAdmin: user.isAdmin },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    });
};

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        connectUtils.connection.query('INSERT INTO groupomania.users (lastname, firstname, birthday, mail, password, comment) VALUES (?,?,?,?,?,?)',
        [req.body.lastname, req.body.firstname, req.body.birthday, req.body.mail, hash, req.body.comment],
        function(err, results) {
            if(err){
                return res.status(500).json({ err });
            }
            else{
                return res.status(201).json({ message: 'Utilisateur créé !' });
            }
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
    if(res.locals.isAdmin){
        connectUtils.connection.query('UPDATE groupomania.users SET deleted = true WHERE id = ?',
        [req.body.userId],
        function(err, results){
            if(err){
                return res.status(500).json({ err });
            }
            else{
                return res.status(201).json({ message: 'Utilisateur supprimé !' });
            }
        });
    }
    else{
        return res.status(401).json({ message: 'Merci de contacter le service support !' });
    }
};

/*    connectUtils.connection.query('',
[],
function(err, results){

});     */