const { CloudantV1 } = require('@ibm-cloud/cloudant');

const client = CloudantV1.newInstance({ serviceName: 'CLOUDANT' });

client.getServerInformation().then(response => console.log(response));

client.getAllDbs().then(response => console.log(response));

client.putDatabase({
    db: 'products',
    partitioned: false
  }).then(response => console.log(response));