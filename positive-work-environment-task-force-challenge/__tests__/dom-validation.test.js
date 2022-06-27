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

test('Should check if there is H1,H2 and H3 header elements', () => {
    let headerElements = document.getElementsByTagName('h1');
    expect(headerElements.length).toBe(1);
    headerElements = document.getElementsByTagName('h2');
    expect(headerElements.length).toBe(9);
    headerElements = document.getElementsByTagName('h3');
    expect(headerElements.length).toBe(4);
});

test('Should check if there are more than 12 section elements and more than 40 paragraph elements', () => {
    const sectionElements = document.getElementsByTagName('section');
    expect(sectionElements.length).toBeGreaterThan(12);
    const paraElements = document.getElementsByTagName('p');
    expect(paraElements.length).toBeGreaterThan(40);
})

test('Should check if there are more than 10 ul elements,1 ol element and 1 dl element', () => {
    const unorderedListElements = document.getElementsByTagName('ul');
    expect(unorderedListElements.length).toBeGreaterThan(10);
    const orderedListElements = document.getElementsByTagName('ol');
    expect(orderedListElements.length).toBe(1);
    const definitionListElements = document.getElementsByTagName('dl');
    expect(definitionListElements.length).toBe(1);
})

test('Should check if there is a dl element and more than 25 dt and dd elements', () => {
    const defitionTermElements = document.getElementsByTagName('dt');
    const descriptionElements = document.getElementsByTagName('dd');
    expect(defitionTermElements.length).toBeGreaterThan(25);
    expect(descriptionElements.length).toBeGreaterThan(25);
});

test('Should check if there are more than 10 anchor elements', () => {
    const anchorElements = document.getElementsByTagName('a');
    expect(anchorElements.length).toBeGreaterThan(10);
});