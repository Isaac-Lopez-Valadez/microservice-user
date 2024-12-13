const awsServerlessExpress = require('aws-serverless-express');

module.exports.handler = async (event, context) => {
  const event2 = event;
  if (event.Records) event = JSON.parse(event.Records[0].body);

  const response = await awsServerlessExpress.proxy(
    awsServerlessExpress.createServer(require('./routes')),
    event,
    context,
    'PROMISE').promise;
  if (response.statusCode !== 200 && event2.Records) { context.fail('Final job.'); }
  return response;
};