// TEST DATA
const cars = [{id: 1, make: 'Pontiac', model: 'Fiero'}, {id: 2, make: 'BMW', model: 320}, {id: 3, make: 'DMC', model: 'DeLorean'}];

// .GET ENDPOINT HANDLER
const getCars = (req, res, next) => { // request, response, next
  res.status(200).json(cars);
};

const addCar = (req, res, next) => {
  // User sends us a req and we strip off the body and work with it here.
  if (!req.body.id) res.status(500).json({message: 'Malformed Request'});
  else {
      cars.push(req.body);
      res.status(200).json(cars);
    }
};

const updateCar = (req, res, next) => {
  const selected = cars.filter(car => car.id === +req.params.id)[0];
  if (!selected) res.status(500).json({message: 'Not Found'});
  selected.make = req.body.make; 
  // would likely want to account for various updates (like make and model)
  res.status(200).json(cars);
};

const deleteCar = (req, res, next) => {
  const selected = cars.findIndex(val => val.id === +req.params.id);
  cars.splice(selected, 1);
  res.status(200).json(cars);
};

// EXPORT THE CARS FUNCTION
module.exports = {
  // getCars: getCars // Same as what's below (object shorthand)
  getCars,
  addCar,
  updateCar,
  deleteCar
};