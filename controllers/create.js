module.exports = {
    get(req, res) {
      res.render('create', {title: 'Create Listing'});  
    },
    async post(req, res) {
      //console.log(req.body);
      const car = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl || undefined,
        price: Number(req.body.price)
      };
      try {
        await req.storage.createCar(car);
         res.redirect('/');
      } catch(car){
        console.log('Error creating record');
        res.redirect('/create');
      }
      
     
    }
};