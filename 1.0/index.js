/**
 * multipleUpload button
 * @author yiminghe@gmail.com
 */
KISSY.add(function (S, Editor, DialogLoader) {
    S.config('modules',{
        "editor/plugin/editor-upload/dialog": {alias: ['gallery/editorUploader/1.0/dialog']}
    });
    function multipleUpload(config) {
        this.config = config || {};
    }

    S.augment(multipleUpload, {
        pluginRenderUI:function (editor) {
            var self = this;
            editor.addButton("multipleUpload", {
                tooltip:"批量插图",
                listeners:{
                    click:function () {
                        DialogLoader.useDialog(editor, "editor-upload", self.config);
                    }
                },
                mode:Editor.WYSIWYG_MODE
            });
        }
    });

    return multipleUpload;


}, {
    requires:['editor', 'editor/plugin/dialog-loader/index']
});