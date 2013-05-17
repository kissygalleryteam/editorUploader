/**
 * @fileoverview 请修改组件描述
 * @author minghe<minghe12@126.com>
 * @module editorUploader
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 请修改组件描述
     * @class EditorUploader
     * @constructor
     * @extends Base
     */
    function EditorUploader(comConfig) {
        var self = this;
        alert(1);
        //调用父类构造函数
        EditorUploader.superclass.constructor.call(self, comConfig);
    }
    S.extend(EditorUploader, Base, /** @lends EditorUploader.prototype*/{

    }, {ATTRS : /** @lends EditorUploader*/{

    }});
    return EditorUploader;
}, {requires:['node', 'base']});



