
const Account = require('../account');
const myacc = new Account('250b4030-f519-11e5-8535-970c12895890');

myacc.info()
  .then((result) => console.log(result))
  .catch((error) => console.error('Error!', error));
