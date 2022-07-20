const ClientInvoker = require('./client-invoker');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const invoker = new ClientInvoker();

rl.addListener('line', input => {
    invoker.write(input);
})

