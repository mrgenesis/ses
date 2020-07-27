// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var variavel = 'Varável';
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create sendEmail params 
var params = {
  Destination: { /* required */
    ToAddresses: [
      'mrgenesis@hotmail.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: `Olá ${variavel}. Isso é um test de envio de email usando SES AWS.`
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: `${variavel} - Email de test`
     }
    },
  Source: 'api@webservico.com', /* required */
  ReplyToAddresses: [
     'contato@correiomsnews.com',
    /* more items */
  ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
