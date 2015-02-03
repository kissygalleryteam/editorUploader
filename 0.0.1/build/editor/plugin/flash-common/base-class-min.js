/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: May 22 12:21
*/
KISSY.add("editor/plugin/flash-common/base-class","./utils,base,editor,../dialog-loader,../bubble,../contextmenu".split(","),function(i,b){var e=b("./utils"),f=b("base"),k=b("editor"),l=i.Node,m=b("../dialog-loader");b("../bubble");b("../contextmenu");return f.extend({initializer:function(){var a=this,d=a.get("cls"),c=a.get("editor"),b=c.get("prefixCls"),j=[],e=a.get("bubbleId"),f=a.get("contextMenuId"),g=a.get("contextMenuHandlers");i.each(g,function(a,c){j.push({content:c})});c.addContextMenu(f,
"."+d,{width:"120px",children:j,listeners:{click:function(a){a=a.target.get("content");g[a]&&g[a].call(this)}}});c.addBubble(e,function(a){return a.hasClass(d,void 0)&&a},{listeners:{afterRenderUI:function(){var d=this,h=d.get("contentEl");h.html(i.substitute(' <a class="{prefixCls}editor-bubble-url" target="_blank" href="#">{label}</a>   |    <span class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-change">\u7f16\u8f91</span>   |    <span class="{prefixCls}editor-bubble-link {prefixCls}editor-bubble-remove">\u5220\u9664</span>',
{label:a.get("label"),prefixCls:b}));var e=h.one("."+b+"editor-bubble-url"),f=h.one("."+b+"editor-bubble-change"),g=h.one("."+b+"editor-bubble-remove");k.Utils.preventFocus(h);f.on("click",function(c){a.show(d.get("editorSelectedEl"));c.halt()});g.on("click",function(a){if(i.UA.webkit){var b=c.getSelection().getRanges();if(b=b&&b[0]){b.collapse(true);b.select()}}d.get("editorSelectedEl").remove();d.hide();c.notifySelectionChange();a.halt()});d.on("show",function(){var b=d.get("editorSelectedEl");
b&&a._updateTip(e,b)})}}});c.docReady(function(){c.get("document").on("dblclick",a._dbClick,a)})},_getFlashUrl:function(a){return e.getUrl(a)},_updateTip:function(a,b){var c=this.get("editor").restoreRealElement(b);if(c){c=this._getFlashUrl(c);a.attr("href",c)}},_dbClick:function(a){var b=new l(a.target);if(b.nodeName()==="img"&&b.hasClass(this.get("cls"),void 0)){this.show(b);a.halt()}},show:function(a){var b=this.get("editor");m.useDialog(b,this.get("type"),this.get("pluginConfig"),a)}},{ATTRS:{cls:{},
type:{},label:{value:"\u5728\u65b0\u7a97\u53e3\u67e5\u770b"},bubbleId:{},contextMenuId:{},contextMenuHandlers:{}}})});
