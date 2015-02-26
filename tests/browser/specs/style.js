/**
 * test style operation for editor
 * @author yiminghe@gmail.com
 */

var init = require('./init');
var Editor = require('editor');
var Selection = Editor.Selection;
var Range = Editor.Range;
var UA = require('ua');
var editor;

describe('Style', function () {
    describe('bold', function () {
        var BOLD_STYLE = new Editor.Style({
            element: 'strong',
            overrides: [
                {
                    element: 'b'
                },
                {
                    element: 'span',
                    attributes: {
                        style: 'font-weight: bold;'
                    }
                }
            ]
        });

        it('setup', function () {
            init(function (e) {
                editor = e;
            });
        });

        it('can process collapsed range in content strong on edge side', function () {
            var p;
            var document;
            runs(function () {
                editor.setData('<p>' +
                    '1234<strong>56</strong></p>');
            });
            waits(500);
            runs(function () {
                p = editor.get('document').one('p');
                var strong = p.one('strong');
                document = editor.get('document')[0];
                var range = new Range(document);
                range.setEnd(strong, 1);
                range.select();
                BOLD_STYLE.remove(document);
            });
            waits(500);
            runs(function () {
                var selection = new Selection(document);
                var startElement = selection.getStartElement(),
                    currentPath = new Editor.ElementPath(startElement);
                expect(BOLD_STYLE.checkActive(currentPath)).to.be(false);
                var lastChild;
                if (UA.webkit || UA.firefox) {
                    expect(p[0].childNodes.length).to.be(3);
                    if (UA.webkit) {
                        lastChild = p[0].lastChild;
                        expect(p[0].childNodes[2].nodeValue).to.be('\u200b');
                    }
                } else {
                    expect(p[0].childNodes.length).to.be(2);
                }

                var range2 = selection.getRanges()[0];

                if (range2.startContainer[0] === lastChild) {
                    // http://code.google.com/p/chromium/issues/detail?id=149894
                    // fixed on chrome 35 of 2014-06-12
                    expect(range2.startContainer[0]).to.be(lastChild);
                    expect(range2.endContainer[0]).to.be(lastChild);
                    expect(range2.startOffset).to.be(1);
                    expect(range2.endOffset).to.be(1);
                } else {
                    var len = p[0].childNodes.length;
                    if(UA.firefox){
                        len--;
                    }
                    // new chrome
                    expect(range2.startContainer[0]).to.be(p[0]);
                    expect(range2.endContainer[0]).to.be(p[0]);
                    expect(range2.startOffset).to.be(len);
                    expect(range2.endOffset).to.be(len);
                }
            });
        });

        it('can process collapsed range in empty strong', function () {
            runs(function () {
                editor.setData('<p>' +
                    '1234<strong>\u200b</strong></p>');
            });
            waits(500);
            var document, p;
            runs(function () {
                p = editor.get('document').one('p');
                var strong = p.one('strong');
                document = editor.get('document')[0];
                var range = new Range(document);
                range.setEnd(strong, 1);
                range.select();
            });
            waits(500);
            runs(function () {
                BOLD_STYLE.remove(document);
            });
            waits(500);
            runs(function () {

                var selection = new Selection(document);

                var startElement = selection.getStartElement(),
                    currentPath = new Editor.ElementPath(startElement);
                expect(BOLD_STYLE.checkActive(currentPath)).to.be(false);
                var lastChild;

                // TODO firefox??
                if (!UA.firefox) {
                    expect(p[0].childNodes.length).to.be(1);
                    lastChild = p[0].lastChild;
                    expect(lastChild.nodeValue).to.be('1234');
                }

                var range = selection.getRanges()[0];

                if (range.startContainer[0] === lastChild) {
                    // http://code.google.com/p/chromium/issues/detail?id=149894
                    // fixed on chrome 35 of 2014-06-12
                    expect(range.startContainer[0]).to.be(lastChild);
                    expect(range.endContainer[0]).to.be(lastChild);
                    expect(range.startOffset).to.be(4);
                    expect(range.endOffset).to.be(4);
                } else {
                    expect(range.startContainer[0]).to.be(p[0]);
                    expect(range.endContainer[0]).to.be(p[0]);
                    expect(range.startOffset).to.be(1);
                    expect(range.endOffset).to.be(1);
                }
            });
        });
    });
});
