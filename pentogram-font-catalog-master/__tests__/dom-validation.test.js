const path = require('path');
const { readFileSync } = require('fs');

const { JSDOM } = require('jsdom');
let document;
beforeAll(() => {
    const htmlFile = readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
    const dom = new JSDOM(htmlFile, { contentType: 'text/html' });
    document = dom.window.document;
    global.dom = dom;
});

test('Should check if there are 3 H3 Header elements one for each type of the font', () => {
    const headerElements = document.getElementsByTagName('h3');
    expect(headerElements.length).toBe(3);
});

test('Should find if there is an img element under div tag', () => {
    const imageElement = document.getElementsByTagName('img');
    expect(imageElement.length).toBe(1);
    const parent = document.querySelector('img').parentElement.nodeName;
    expect(parent).toEqual('DIV');

})

test('Should check if there are 2 ul elements, 1 Ol element and 364 li elements', () => {
    const unorderedListElements = document.getElementsByTagName('ul');
    const orderedListElements = document.getElementsByTagName('ol');
    const listElements = document.getElementsByTagName('li');
    expect(unorderedListElements.length).toBe(2);
    expect(orderedListElements.length).toBe(1);
    expect(listElements.length).toBeGreaterThan(300);
});

test('Should find if the parent is div for unordered and orderd list', () => {
    let parent = document.querySelector('ul').parentElement.nodeName;
    expect(parent).toEqual('DIV');
    parent = document.querySelector('ol').parentElement.nodeName;
    expect(parent).toEqual('DIV');
});