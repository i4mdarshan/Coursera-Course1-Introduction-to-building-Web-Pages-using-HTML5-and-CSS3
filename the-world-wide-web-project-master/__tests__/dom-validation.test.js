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

test('Should check if there is a header and a paragraph element', () => {
    const headerElements = document.getElementsByTagName('h1');
    expect(headerElements.length).toBe(1);
    const paraElements = document.getElementsByTagName('p');
    expect(paraElements.length).toBe(1);
});

test('Should find if there is an anchor element under paragraph tag', () => {
    const parent = document.querySelector('a').parentElement.nodeName;
    expect(parent).toEqual('P');
})

test('Should check if there a dl element and 9 dt and 9 dd elements', () => {
    const definitionListElements = document.getElementsByTagName('dl');
    const defitionTermElements = document.getElementsByTagName('dt');
    const descriptionElements = document.getElementsByTagName('dd');
    expect(definitionListElements.length).toBe(1);
    expect(defitionTermElements.length).toBe(9);
    expect(descriptionElements.length).toBe(9);

});

test('Should check if dt and dd element has an anchor element as its child', () => {
    let child = document.querySelector('dt').firstElementChild.nodeName;
    expect(child).toEqual('A');
    child = document.querySelector('dd').firstElementChild.nodeName;
    expect(child).toEqual('A');
});

test('should have 25 anchor elements in the document totally',()=>{
    let anchorElements=document.getElementsByTagName('a');
    expect(anchorElements.length).toBe(25);
});