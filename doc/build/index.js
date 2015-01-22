/*
combined files : 

kg/editoruploader/2.0.1/index

*/
//批量上传模块
//by 明河
KISSY.add('kg/editoruploader/2.0.1/index',function (S, Editor, DialogLoader) {
    S.config('modules',{
        "editor/plugin/editor-upload/dialog": {alias: ['kg/editoruploader/2.0.1/dialog']}
    });
    function multipleUpload(config) {
        if(!config.tpl){
            config.tpl = '<div class="grid" style="margin:10px;"> ' +
                    '<input type="file" class="g-u" id="{{prefix}}uploader-button" value="上传图片" name="imgFile"  accept="image/*" > ' +
                    '<input type="hidden" id="J_Urls" name="urls" value="" />' +
                ' </div>' +
                ' <div class="editor-uploader-queue-wrapper J_UploaderQueueWrapper" style="width:600px;margin-top: 20px;">' +
                     ' <table class="ks-editor-upload-list" width="100%" border="0" border-spacing="0" border-collapse="collapse">' +
                         ' <thead> ' +
                             '<tr> <th>图片</th> <th>大小</th> <th style="width:30%">上传状态</th> <th>图片操作</th> </tr> ' +
                         '</thead>' +
                         ' <tbody class="{{prefix}}uploader-queue"> </tbody>' +
                     ' </table> ' +
                     '<div class="uploader-footer">' +
                         ' <a class="ks-editor-button ks-editor-multiple-upload-ok ks-inline-block J_StartUpload">开始上传</a> ' +
                         '<a class="ks-editor-button ks-editor-multiple-upload-insertall ks-inline-block J_InsertContent" style="margin-left:20px;">全部插入</a>' +
                         ' <a class="ks-editor-uploader-clear J_ClearQueue">清空列表</a>' +
                '    </div>' +
                ' </div>';
        }
        this.config = config || {};
    }

    S.augment(multipleUpload, {
        pluginRenderUI:function (editor) {
            var self = this;
            var button = editor.addButton("multipleUpload", {
                tooltip:"批量插图",
                listeners:{
                    click:function () {
                        DialogLoader.useDialog(editor, "editor-upload", self.config);
                    }
                },
                mode:Editor.WYSIWYG_MODE
            });
            var $el = button.$el;
            $el.children().addClass('ks-editor-toolbar-image');
        }
    });

    return multipleUpload;


}, {
    requires:['editor', 'editor/plugin/dialog-loader']
});
