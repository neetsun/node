const got = require('got');

const url = 'http://api.open-notify.org/iss-now.json';

got(url,{json:true})
  .then (iss =>{
    console.log(iss.body)
  })
  .catch(error =>{
    console.log(error.response.body)
  });
