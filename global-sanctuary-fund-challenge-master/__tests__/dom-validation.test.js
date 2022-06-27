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

test('Should check that embedded style sheets are not used', () => {
    const styleTag = document.getElementsByTagName('style');
    expect(styleTag.length).toEqual(0);
});

test('Should check if link tag is used referring to an external file within the project', () => {
    const linkTag = document.getElementsByTagName('link');
    let href_value;
    if (linkTag != undefined) {
        for (i = 0; i < linkTag.length; i++) {
            href_value = document.getElementsByTagName('link')[i].attributes.getNamedItem("href").value;
            if (!href_value.match(/http/))
                break;
        }
        expect(href_value).not.toMatch(/http/);
    }
});

test('Should have nav element and footer element',()=>{
    const navElement=document.getElementsByTagName('nav');
    expect(navElement.length).toEqual(1);
    const footerElement=document.getElementsByTagName('footer');
    expect(footerElement.length).toEqual(1);
});

test('Should have more than 5 ul elements',()=>{
    const navElement=document.getElementsByTagName('ul');
    expect(navElement.length).toBeGreaterThan(5);
});

test('Should Check class/id values should not have dot/hash for nav element', () => {
    let attr_value = document.getElementsByTagName('nav')[0].attributes[0].value;
    expect(attr_value).not.toMatch(/^(\.|#)/);
});