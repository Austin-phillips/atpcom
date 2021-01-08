require('dotenv').config();
var request = require("request");
const baseUrl = process.env.SendGrid_New_User_Url

function newUserEmail(id, companyName, email) {
    var options = { method: 'POST',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: 
     { 'content-type': 'application/json',
       authorization: `Bearer ${process.env.SendGrid_AK}` },
    body: 
     { personalizations: 
        [ { to: [ { email: email } ],
            dynamic_template_data: { companyName, url: `${baseUrl}?invitation=${id}` },
            subject: 'New Account Invitation' } ],
       from: { email: 'phillips.austin51@gmail.com', name: 'Apartment Comm' },
       reply_to: { email: 'phillips.austin51@gmail.com', name: 'Apartment Comm' },
       template_id: 'd-59c16c6ca06240a1aa060347ba41bf73' },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
}

module.exports = {
    newUserEmail
}