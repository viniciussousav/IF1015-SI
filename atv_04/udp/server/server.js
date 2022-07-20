const ServerInvoker = require('./server-invoker');

const invocationHandler = (expression) => {
    
    const elements = expression.toString().split(' ');

    const firstElement = Number.parseInt(elements[0]);
    const operator = elements[1];
    const secondElement = Number.parseInt(elements[2]);
    
    if (operator == '+')
        return  firstElement + secondElement;
    if (operator == '-')
        return firstElement - secondElement;
    if (operator == '/')
        return firstElement / secondElement;
    if (operator == '*')
        return firstElement * secondElement;

    throw 'Invalid Expression';
}

const server = new ServerInvoker(invocationHandler);