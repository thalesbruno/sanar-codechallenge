var fs = require('fs')
const request = require("request")

var options = {                 
    method: 'GET',             
    uri: 'https://api.mundipagg.com/core/v1/customers',                    
    headers: {               
      'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
      'Content-Type': 'application/json'              
    },
};    

request(options, (error, response, body) => {  
    console.log(response.body);
})