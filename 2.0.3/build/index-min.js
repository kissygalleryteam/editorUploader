/*!build time : 2015-01-22 11:43:52 AM*/
KISSY.add("kg/editoruploader/2.0.3/index",function(a,b,c){function d(a){a.tpl||(a.tpl='<div class="grid" style="margin:10px;"> <input type="file" class="g-u" id="{{prefix}}uploader-button" value="\u4e0a\u4f20\u56fe\u7247" name="imgFile"  accept="image/*" > <input type="hidden" id="J_Urls" name="urls" value="" /> </div> <div class="editor-uploader-queue-wrapper J_UploaderQueueWrapper" style="width:600px;margin-top: 20px;"> <table class="ks-editor-upload-list" width="100%" border="0" border-spacing="0" border-collapse="collapse"> <thead> <tr> <th>\u56fe\u7247</th> <th>\u5927\u5c0f</th> <th style="width:30%">\u4e0a\u4f20\u72b6\u6001</th> <th>\u56fe\u7247\u64cd\u4f5c</th> </tr> </thead> <tbody class="{{prefix}}uploader-queue"> </tbody> </table> <div class="uploader-footer"> <a class="ks-editor-button ks-editor-multiple-upload-ok ks-inline-block J_StartUpload">\u5f00\u59cb\u4e0a\u4f20</a> <a class="ks-editor-button ks-editor-multiple-upload-insertall ks-inline-block J_InsertContent" style="margin-left:20px;">\u5168\u90e8\u63d2\u5165</a> <a class="ks-editor-uploader-clear J_ClearQueue">\u6e05\u7a7a\u5217\u8868</a>    </div> </div>'),this.config=a||{}}return a.config("modules",{"editor/plugin/editor-upload/dialog":{alias:["kg/editoruploader/2.0.3/dialog"]}}),a.augment(d,{pluginRenderUI:function(a){var d=this,e=a.addButton("multipleUpload",{tooltip:"\u6279\u91cf\u63d2\u56fe",listeners:{click:function(){c.useDialog(a,"editor-upload",d.config)}},mode:b.WYSIWYG_MODE}),f=e.$el;f.children().addClass("ks-editor-toolbar-image")}}),d},{requires:["editor","editor/plugin/dialog-loader"]});