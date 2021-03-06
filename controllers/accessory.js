const { mapError } = require("../services/util.js");

module.exports = {
    get(req, res) {
        res.render('createAccessory', { title: 'Create accessory' });   
    },
    async post(req, res) {
        //console.log(req.body);
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined,
            price: Number(req.body.price),
            owner: req.session.user.id
        };
        try {
            await req.accessory.createAccessory(accessory);
            res.redirect('/');
        }catch(err){
            console.log('Error creating accessory');
            //console.log(err.message);
            res.locals.errors = mapError(err);
            res.render('createAccessory', { title: 'Create accessory', accessory });
        }
        
    }
};