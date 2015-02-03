/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: May 22 12:26
*/
KISSY.add("editor/plugin/table/dialog",["editor","../dialog","../menubutton"],function(h,l){function c(a,b){return h.substitute(a,{prefixCls:b})}function e(a){return 0!==f(a).length}function n(a){this.editor=a;i.Utils.lazyRun(this,"_prepareTableShow","_realTableShow")}var i=l("editor"),o=l("../dialog"),m=l("../menubutton"),p=11>h.UA.ieMode,q=h.Node,r=h.DOM,f=h.trim,s=i.Utils.addRes,t=i.Utils.destroyRes;h.augment(n,{_tableInit:function(){var a=this.editor.get("prefixCls"),b=(new o({width:"500px",mask:!0,
headerContent:"\u8868\u683c",bodyContent:c('<div style="padding:20px 20px 10px 20px;"><table class="{prefixCls}editor-table-config" style="width:100%"><tr><td><label>\u884c\u6570\uff1a <input  data-verify="^(?!0$)\\d+$"  data-warning="\u884c\u6570\u8bf7\u8f93\u5165\u6b63\u6574\u6570"  value="2"  class="{prefixCls}editor-table-rows {prefixCls}editor-table-create-only {prefixCls}editor-input" style="margin:0 5px 0 0;" size="6" /></label></td><td><label>\u5bbd&nbsp;&nbsp;&nbsp;\u5ea6\uff1a </label> <input  data-verify="^(?!0$)\\d+$"  data-warning="\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570" value="200" style="margin:0 5px 0 0;" class="{prefixCls}editor-table-width {prefixCls}editor-input" size="6"/><select class="{prefixCls}editor-table-width-unit" title="\u5bbd\u5ea6\u5355\u4f4d"><option value="px">\u50cf\u7d20</option><option value="%">\u767e\u5206\u6bd4</option></select></td></tr><tr><td><label>\u5217\u6570\uff1a <input  data-verify="^(?!0$)\\d+$"  data-warning="\u5217\u6570\u8bf7\u8f93\u5165\u6b63\u6574\u6570" class="{prefixCls}editor-table-cols {prefixCls}editor-table-create-only {prefixCls}editor-input" style="margin:0 5px 0 0;"value="3" size="6"/></label></td><td><label>\u9ad8&nbsp;&nbsp;&nbsp;\u5ea6\uff1a </label><input  data-verify="^((?!0$)\\d+)?$"  data-warning="\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570" value="" style="margin:0 5px 0 0;"class="{prefixCls}editor-table-height {prefixCls}editor-input" size="6"/> &nbsp;\u50cf\u7d20</td></tr><tr><td><label>\u5bf9\u9f50\uff1a </label><select class="{prefixCls}editor-table-align" title="\u5bf9\u9f50"><option value="">\u65e0</option><option value="left">\u5de6\u5bf9\u9f50</option><option value="right">\u53f3\u5bf9\u9f50</option><option value="center">\u4e2d\u95f4\u5bf9\u9f50</option></select></td><td><label>\u6807\u9898\u683c\uff1a</label> <select class="{prefixCls}editor-table-head {prefixCls}editor-table-create-only" title="\u6807\u9898\u683c"><option value="">\u65e0</option><option value="1">\u6709</option></select></td></tr><tr><td><label>\u8fb9\u6846\uff1a <input  data-verify="^\\d+$"  data-warning="\u8fb9\u6846\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570" value="1" style="margin:0 5px 0 0;"class="{prefixCls}editor-table-border {prefixCls}editor-input" size="6"/></label> &nbsp;\u50cf\u7d20 <label><input type="checkbox" style="vertical-align: middle; margin-left: 5px;" class="{prefixCls}editor-table-collapse" /> \u5408\u5e76\u8fb9\u6846</label></td><td><label class="{prefixCls}editor-table-cellpadding-holder">\u8fb9&nbsp;&nbsp;&nbsp;\u8ddd\uff1a <input  data-verify="^(\\d+)?$"  data-warning="\u8fb9\u6846\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570" value="0" style="margin:0 5px 0 0;"class="{prefixCls}editor-table-cellpadding {prefixCls}editor-input" size="6"/> &nbsp;\u50cf\u7d20</label></td></tr><tr><td colspan="2"><label>\u6807\u9898\uff1a <input class="{prefixCls}editor-table-caption {prefixCls}editor-input" style="width:380px;margin:0 5px 0 0;"></label></td></tr></table></div>',
a),footerContent:c('<div style="padding:5px 20px 20px;"><a class="{prefixCls}editor-table-ok {prefixCls}editor-button ks-inline-block" style="margin-right:20px;">\u786e\u5b9a</a> <a class="{prefixCls}editor-table-cancel {prefixCls}editor-button ks-inline-block">\u53d6\u6d88</a></div>',a)})).render(),d=b.get("body"),k=b.get("footer");b.twidth=d.one(c(".{prefixCls}editor-table-width",a));b.theight=d.one(c(".{prefixCls}editor-table-height",a));b.tborder=d.one(c(".{prefixCls}editor-table-border",a));b.tcaption=d.one(c(".{prefixCls}editor-table-caption",
a));b.talign=m.Select.decorate(d.one(c(".{prefixCls}editor-table-align",a)),{prefixCls:c("{prefixCls}editor-big-",a),width:80,menuCfg:{prefixCls:c("{prefixCls}editor-",a),render:d}});b.trows=d.one(c(".{prefixCls}editor-table-rows",a));b.tcols=d.one(c(".{prefixCls}editor-table-cols",a));b.thead=m.Select.decorate(d.one(c(".{prefixCls}editor-table-head",a)),{prefixCls:c("{prefixCls}editor-big-",a),width:80,menuCfg:{prefixCls:c("{prefixCls}editor-",a),render:d}});b.cellpaddingHolder=d.one(c(".{prefixCls}editor-table-cellpadding-holder",
a));b.cellpadding=d.one(c(".{prefixCls}editor-table-cellpadding",a));b.tcollapse=d.one(c(".{prefixCls}editor-table-collapse",a));var e=k.one(c(".{prefixCls}editor-table-ok",a)),k=k.one(c(".{prefixCls}editor-table-cancel",a));b.twidthunit=m.Select.decorate(d.one(c(".{prefixCls}editor-table-width-unit",a)),{prefixCls:c("{prefixCls}editor-big-",a),width:80,menuCfg:{prefixCls:c("{prefixCls}editor-",a),render:d}});this.dialog=b;e.on("click",this._tableOk,this);k.on("click",function(a){a.halt();b.hide()});
s.call(this,b,b.twidthunit,e,k)},_tableOk:function(a){a.halt();var b=this,d=b.dialog,a=d.get("el").all("input");if("%"===d.twidthunit.get("value")&&(d=parseInt(d.twidth.val(),10),!d||100<d||0>d)){alert("\u5bbd\u5ea6\u767e\u5206\u6bd4\uff1a\u8bf7\u8f93\u51651-100\u4e4b\u95f4");return}i.Utils.verifyInputs(a)&&(b.dialog.hide(),setTimeout(function(){b.selectedTable?b._modifyTable():b._genTable()},0))},_modifyTable:function(){var a=this.dialog,b=this.selectedTable,d=b.one("caption"),c=a.talign.get("value"),j=a.tborder.val();e(c)?b.attr("align",f(c)):b.removeAttr("align");
e(j)?b.attr("border",f(j)):b.removeAttr("border");!e(j)||"0"===j?b.addClass("ke_show_border",void 0):b.removeClass("ke_show_border",void 0);e(a.twidth.val())?b.css("width",f(a.twidth.val())+a.twidthunit.get("value")):b.css("width","");e(a.theight.val())?b.css("height",f(a.theight.val())):b.css("height","");a.tcollapse[0].checked?b.addClass("k-e-collapse-table",void 0):b.removeClass("k-e-collapse-table",void 0);a.cellpadding.val(parseInt(a.cellpadding.val(),10)||0);this.selectedTd&&this.selectedTd.css("padding",
a.cellpadding.val());e(a.tcaption.val())?(a=h.escapeHtml(f(a.tcaption.val())),d&&d[0]?d.html(a):(b=b[0].createCaption(),r.html(b,"<span>"+a+"</span>"))):d&&d.remove()},_genTable:function(){var a=this.dialog,b="<table ",d=parseInt(a.tcols.val(),10)||1,c=parseInt(a.trows.val(),10)||1,j=p?"":"<br/>",i=this.editor;e(a.talign.get("value"))&&(b+='align="'+f(a.talign.get("value"))+'" ');e(a.tborder.val())&&(b+='border="'+f(a.tborder.val())+'" ');var g=[];e(a.twidth.val())&&g.push("width:"+f(a.twidth.val())+
a.twidthunit.get("value")+";");e(a.theight.val())&&g.push("height:"+f(a.theight.val())+"px;");g.length&&(b+='style="'+g.join("")+'" ');g=[];(!e(a.tborder.val())||"0"===""+f(a.tborder.val()))&&g.push("ke_show_border");a.tcollapse[0].checked&&g.push("k-e-collapse-table");g.length&&(b+='class="'+g.join(" ")+'" ');b+=">";e(a.tcaption.val())&&(b+="<caption><span>"+h.escapeHtml(f(a.tcaption.val()))+"</span></caption>");if(a.thead.get("value")){b+="<thead><tr>";for(a=0;a<d;a++)b+="<th>"+j+"</th>";b+="</tr></thead>";
c-=1}b+="<tbody>";for(g=0;g<c;g++){b+="<tr>";for(a=0;a<d;a++)b+="<td>"+j+"</td>";b+="</tr>"}b=new q(b+"</tbody></table>",null,i.get("document")[0]);i.insertElement(b)},_fillTableDialog:function(){var a=this.dialog,b=this.selectedTable,d=b.one("caption");this.selectedTd&&a.cellpadding.val(parseInt(this.selectedTd.css("padding"),10)||"0");a.talign.set("value",b.attr("align")||"");a.tborder.val(b.attr("border")||"0");var c=b.style("width")||""+b.width();a.tcollapse[0].checked=b.hasClass("k-e-collapse-table",
void 0);a.twidth.val(c.replace(/px|%|(.*pt)/i,""));-1!==c.indexOf("%")?a.twidthunit.set("value","%"):a.twidthunit.set("value","px");a.theight.val((b.style("height")||"").replace(/px|%/i,""));c="";d&&(c=d.text());a.tcaption.val(c);d=b.first("thead");c=(b.one("tbody")?b.one("tbody").children().length:0)+(d?d.children("tr").length:0);a.trows.val(c);a.tcols.val(b.one("tr")?b.one("tr").children().length:0);a.thead.set("value",d?"1":"")},_realTableShow:function(){var a=this.editor.get("prefixCls"),b=this.dialog;
this.selectedTable?(this._fillTableDialog(),b.get("el").all(c(".{prefixCls}editor-table-create-only",a)).attr("disabled","disabled"),b.thead.set("disabled",!0)):(b.get("el").all(c(".{prefixCls}editor-table-create-only",a)).removeAttr("disabled"),b.thead.set("disabled",!1));this.selectedTd?b.cellpaddingHolder.show():b.cellpaddingHolder.hide();this.dialog.show()},_prepareTableShow:function(){this._tableInit()},show:function(a){h.mix(this,a);this._prepareTableShow()},destroy:function(){t.call(this)}});
return n});
