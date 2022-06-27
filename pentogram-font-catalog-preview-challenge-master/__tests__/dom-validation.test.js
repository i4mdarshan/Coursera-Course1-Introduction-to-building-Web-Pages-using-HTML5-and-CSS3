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
})

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


test('Should check if there is one H1 element and 3 H2 elements one for each type of the font', () => {
    let headerElements = document.getElementsByTagName('h2');
    expect(headerElements.length).toBe(3);
    headerElements = document.getElementsByTagName('h1');
    expect(headerElements.length).toBe(1);
    console.log(headerElements.innerText);
});

test('Should find if there is an img element under header semantic tag', () => {
    const imageElement = document.getElementsByTagName('img');
    expect(imageElement.length).toBe(1);
    const parent = document.querySelector('img').parentElement.nodeName;
    expect(parent).toEqual('HEADER');
});

test('Should check if there are 3 ul elements, 1 Ol element and 364 li elements', () => {
    const unorderedListElements = document.getElementsByTagName('ul');
    const listElements = document.getElementsByTagName('li');
    expect(unorderedListElements.length).toBe(3);
    expect(listElements.length).toBeGreaterThan(300);
});

test('Should find if the parent is Section for unordered and ordered list', () => {
    let parent = document.querySelector('ul').parentElement.nodeName;
    expect(parent).toEqual('SECTION');
});

test('Should check whether id/class attribute is present for img,ul and ol elements', () => {
    let attr_name = document.getElementsByTagName('img')[0].attributes[0].name;
    if (attr_name.match(/^(id|class)$/))
        expect(attr_name).not.toBeUndefined;
    attr_name = document.getElementsByTagName('ul')[0].attributes[0].name;
    if (attr_name.match(/^(id|class)$/))
        expect(attr_name).not.toBeUndefined;
    attr_name = document.getElementsByTagName('ul')[1].attributes[0].name;
    if (attr_name.match(/^(id|class)$/))
        expect(attr_name).not.toBeUndefined;
    attr_name = document.getElementsByTagName('ul')[0].attributes[0].name;
    if (attr_name.match(/^(id|class)$/))
        expect(attr_name).not.toBeUndefined;
});

test('Should Check class/id values should not have dot/hash ', () => {
    let attr_value = document.getElementsByTagName('ul')[0].attributes[0].value;
    expect(attr_value).not.toMatch(/^(\.|#)/);
    attr_value = document.getElementsByTagName('li')[0].attributes[0].value;
    expect(attr_value).not.toMatch(/^(\.|#)/);
    attr_value = document.getElementsByTagName('ul')[0].attributes[0].value;
    expect(attr_value).not.toMatch(/^(\.|#)/);
    attr_value = document.getElementsByTagName('h2')[0].attributes[0].value;
    expect(attr_value).not.toMatch(/^(\.|#)/);
});

test('Should check if li element is having two child paragraph elements', () => {
    let child_name = document.getElementsByTagName('li')[0].firstElementChild.nodeName;
    expect(child_name).toEqual('P');
    child_name = document.getElementsByTagName('li')[0].lastElementChild.nodeName;
    expect(child_name).toEqual('P');
});

test('Should Check first <p> element should have class attribute and second <p> should have style attribute with font-family as value', () => {
    let attr_name = document.getElementsByTagName('li')[0].firstElementChild.attributes[0].name;
    expect(attr_name).toEqual('class');
    const attr_names = document.getElementsByTagName('li')[0].lastElementChild.attributes;
    let attr_value;
    if (attr_names != undefined) {
        for (i = 0; i < attr_names.length; i++) {
            attr_name = document.getElementsByTagName('li')[0].lastElementChild.attributes[i].name;
            if (attr_name === 'style') {
                attr_value = document.getElementsByTagName('li')[0].lastElementChild.attributes[i].value;
                break;
            }
        }
        expect(attr_value).toMatch(/font-family/);
    }
});