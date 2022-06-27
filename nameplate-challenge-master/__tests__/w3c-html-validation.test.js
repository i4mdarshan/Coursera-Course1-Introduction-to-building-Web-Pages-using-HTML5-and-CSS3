const path = require('path');
const { readFileSync } = require('fs');
const validator = require('html-validator');

test('Check if the HTML Page meets W3C Specification', async() => {
    const options = {
        data: readFileSync(path.join(__dirname, '../index.html'), 'utf8'),
        format: 'json'
    };

    const results = await validator(options);
    if (results.messages.length > 0) {
        console.log("The Following Rules W3C Rules aren't being adhered")
        results.messages.map(console.error);
    }
    expect(results.messages.length).toBe(0);
});