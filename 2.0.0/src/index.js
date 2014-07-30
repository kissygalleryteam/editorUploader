/**
 * @fileoverview
 * @author
 * @module editoruploader
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     *
     * @class Editoruploader
     * @constructor
     * @extends Base
     */
    function Editoruploader(comConfig) {
        var self = this;
        //调用父类构造函数
        Editoruploader.superclass.constructor.call(self, comConfig);
    }
    S.extend(Editoruploader, Base, /** @lends Editoruploader.prototype*/{

    }, {ATTRS : /** @lends Editoruploader*/{

    }});
    return Editoruploader;
}, {requires:['node', 'base']});



