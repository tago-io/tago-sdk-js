
const Account = require('../account');
const myacc = new Account('bf5fabfc-0f56-4d94-a4a3-7e52e3620574');

// myacc.buckets.list(1, ['id', 'name'], { name: 'q*'}).then(console.log);

// myacc.devices.list(1, ['id', 'name'], { name: '*' }).then(console.log);

// myacc.analysis.list(1, ['id', 'name'], { name: '*' }).then(console.log);

// myacc.actions.list(1, ['id', 'name'], { name: '*sms' }).then(console.log)

myacc.dashboards.list(1, ['id', 'name'], { label: '*map*' }).then(console.log);
