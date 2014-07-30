/*
combined files : 

kg/editoruploader/2.0.0/dialog

*/
KISSY.add('kg/editoruploader/2.0.0/dialog',function (S,Node,Editor,Dialog4E,XTemplate) {
    var $ = Node.all;
    //批量上传模块
    //by 明河
    function UploaderDialog(editor,config) {
        this.editor = editor;
        this.config = config;
    }

    S.augment(UploaderDialog, {
        hide: function () {
            this.dialog.hide();
        },
        //显示上传对话框
        show: function () {
            var self = this;
            var dialog = self.dialog;
            if(!dialog){
                var html = new XTemplate(self.config.tpl).render({
                    prefix:self.config.prefix || 'editor-'
                });
                //实例化弹出层
                dialog = self.dialog = new Dialog4E({
                    width: 610,
                    mask: true,
                    headerContent: '批量上传',
                    bodyContent: html
                }).render();

                self._renderUploader();
            }
            dialog.show();
            dialog.center();
        },
        //实例化上传组件
        _renderUploader:function(){
            var self = this;
            var config = self.config;
            if(self.uploader) return false;
            var target = '#'+config.prefix+'uploader-button';
            var queueTarget = '.'+config.prefix+'uploader-queue';

            S.use('gallery/uploader/1.5/aliUploader,gallery/uploader/1.5/plugins/auth/auth,gallery/uploader/1.5/plugins/proBars/proBars,gallery/uploader/1.5/themes/editorMultipleUploader/index,gallery/uploader/1.5/themes/editorMultipleUploader/style.css', function (S, AliUploader,Auth,ProBars,ImageUploader) {
                var uploader = new AliUploader(target,config);
                self.uploader = uploader;
                //使用主题
                uploader.theme(new ImageUploader({ queueTarget: queueTarget }));
                //验证插件
                uploader.plug(new Auth(config.auth || {}))
                //进度条集合
                    .plug(new ProBars({isHide:false}));

                var $queueWrapper = $(queueTarget).parent().parent('.J_UploaderQueueWrapper');
                var $insert = $queueWrapper.all('.J_InsertContent');

                $insert.on('click',self._insertHandler,self);
                uploader.on('add',function(ev){
                    if($queueWrapper.css('display') == 'none'){
                        $queueWrapper.fadeIn(0.5);
                    }
                })
                uploader.on('remove',function(ev){
                    if(!uploader.get('queue').get('files').length){
                        $queueWrapper.fadeOut(0.5);
                    }
                })
                var queue = uploader.get('queue');
                $('.J_ClearQueue').on('click',function(ev){
                    ev.preventDefault();
                    queue.clear();
                })
                $('.J_StartUpload').on('click',function(){
                    uploader.uploadFiles('waiting');
                })
            })
        },
        /**
         * 点击全部插入后触发
         * @private
         */
        _insertHandler:function(){
            var self = this;
            var editor = self.editor;
            var editorDoc = editor.get("document")[0];
            var uploader = self.uploader;
            var queue = uploader.get('queue');
            var files = queue.getFiles('success');
            if(!files.length){
                alert('不存在成功上传的图片！');
                return false;
            }
            S.each(files,function(file){
                var url = file.result.url;
                // chrome refer empty in empty src iframe
                new Image().src = url;
                editor.insertElement($("<p>&nbsp;<img src='" + url + "'/>&nbsp;</p>", editorDoc));

                queue.remove(file.id);
            })
            var dialog = self.dialog;
            dialog.hide();
        }
    });

    return UploaderDialog;
}, {
    requires:['node','editor','editor/plugin/dialog','xtemplate']
});
