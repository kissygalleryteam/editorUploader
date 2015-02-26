/**
 * Test walker for Editor
 * @author yiminghe@gmail.com
 */

/*jshint quotmark:false*/
var Editor = require('editor');
var $ = require('node');
var Walker = Editor.Walker;
var Range = Editor.Range;

describe("walker", function () {
    it("simple works", function () {
        var div = $("<div>" +
            "<span>" +
            "1" +
            "<span>" +
            "1-1" +
            "</span>" +
            "</span>" +
            "<span>" +
            "<span>" +
            "2-1" +
            "</span>" +
            "2" +
            "</span>" +
            "<span>" +
            "3" +
            "<span>" +
            "3-1" +
            "</span>" +
            "</span>" +
            "</div>").appendTo('body');

        var range = new Range(document);
        range.setStart(div, 1);
        range.setEnd(div, 3);
        var walker = new Walker(range);
        var node = walker.next();
        expect(node[0].nodeType).to.be(1);
        expect(node.html().toLowerCase()).to.be("<span>2-1</span>2");

        node = walker.next();
        expect(node[0].nodeType).to.be(1);
        expect(node.html().toLowerCase()).to.be("2-1");

        for (var i = 0; i < 6; i++) {
            walker.next();
        }

        // 越界
        node = walker.next();
        expect(node).to.be(null);
        div.remove();
    });

    it("evaluator works", function () {
        var div = $("<div>" +
            "<span>" +
            "1" +
            "<span>" +
            "1-1" +
            "</span>" +
            "</span>" +
            "<span>" +
            "<span>" +
            "2-1" +
            "</span>" +
            "2" +
            "</span>" +
            "<span>" +
            "3" +
            "<span>" +
            "3-1" +
            "</span>" +
            "</span>" +
            "</div>").appendTo('body');

        var range = new Range(document);
        range.setStart(div, 1);
        range.setEnd(div, 3);
        var walker = new Walker(range);
        walker.evaluator = function (node) {
            // 只取文字节点
            return node.nodeType === 3;
        };
        var node = walker.next();
        expect(node[0].nodeType).to.be(3);
        expect(node.text()).to.be("2-1");

        node = walker.next();
        expect(node[0].nodeType).to.be(3);
        expect(node.text()).to.be("2");

        node = walker.next();
        expect(node[0].nodeType).to.be(3);
        expect(node.text()).to.be("3");

        node = walker.next();
        expect(node[0].nodeType).to.be(3);
        expect(node.text()).to.be("3-1");

        expect(walker.next()).to.be(null);

        div.remove();
    });

    it("breakOnFalse works", function () {
        var div = $("<div>" +
            "<span>" +
            "1" +
            "<span>" +
            "1-1" +
            "</span>" +
            "</span>" +
            "<span id='start'>" +
            "<span id='startInner'>" +
            "2-1" +
            "</span>" +
            "2" +
            "</span>" +
            "<span id='end'>" +
            "3" +
            "<span id='endInner'>" +
            "3-1" +
            "</span>" +
            "</span>" +
            "</div>").appendTo('body');

        var range = new Range(document);
        range.setStart(div, 1);
        range.setEnd(div, 3);
        var walker = new Walker(range);

        walker.evaluator = function (node) {
            // 只取文字节点
            return node.nodeType === 3;
        };


        var node = walker._iterator(false, true);

        expect(node).to.be(false);

        expect(walker.current.attr('id')).to.be("start");

        node = walker._iterator(false, true);

        expect(node).to.be(false);

        expect(walker.current.attr('id')).to.be("startInner");

        node = walker._iterator(false, true);

        expect(node).to.be(false);

        expect(walker.current.attr('id')).to.be("end");

        node = walker._iterator(false, true);

        expect(node).to.be(false);

        expect(walker.current.attr('id')).to.be("endInner");

        expect(walker._iterator(false, true)).to.be(null);

        div.remove();
    });

    it("checkForward works", function () {

        var div = $("<div>" +
            "<span>" +
            "1" +
            "<span>" +
            "1-1" +
            "</span>" +
            "</span>" +
            "</div>").appendTo('body');

        var div2 = $("<div>" +
            "<span>" +
            "1" +
            "<span>" +
            "1-1" +
            "</span>" +
            "</span>" +
            "</div>").appendTo('body');

        var range = new Range(document);
        range.setStart(div, 0);
        range.setEnd(div2, 1);
        var walker = new Walker(range);

        walker.evaluator = function (node) {
            return  node.nodeName.toLowerCase() !== 'div';
        };

        expect(walker.checkForward()).to.be(false);

        div.remove();
        div2.remove();
    });
});
