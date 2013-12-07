## 综述

kissy editor的图片上传由于是使用flash上传，很有可能会出现session丢失的bug，所以写了这个插件用于替换editor的上传插件。

v1.4基于kissy1.4，使用[uploader1.5](http://gallery.kissyui.com/uploader/1.5/guide/index.html)。

demo请看[http://sell.2.taobao.com/publish/editorUploader.htm](http://sell.2.taobao.com/publish/editorUploader.htm)（请使用淘宝账号登陆）。

## 使用说明

### html结构

<div id="editorContainer"> </div>

editorContainer为editor使用的容器。


###初始化editor

    KISSY.use("editor", function (S, Editor) {
        var cfg = {
            // 是否初始聚焦
            focused:true,
            attachForm:true,
            render:'#editorContainer',
            width:'80%',
            height:"400px"
        };
        KISSY.use("editor/plugin/source-area," +
                "editor/plugin/font-size," +
                "editor/plugin/code,"+
                "gallery/editorUploader/1.4/index", function (S, SourceArea, FontSize,Code,EditorUploader) {
            //初始化上传插件
            var editorUploader = new EditorUploader({
                prefix:'demo-',
                multiple:true,
                autoUpload:false,
                auth:{
                    //最多上传个数
                    max:15,
                    //图片最大允许大小
                    maxSize:1024
                },
                listeners:{
                    add:function(ev){
                        S.log(ev.file);
                    }
                }
            });
            cfg.plugins = [SourceArea, FontSize,Code,editorUploader];

            new Editor(cfg).render();
        });

    });

use gallery/editorUploader/1.4/index插件，EditorUploader的配置请看Uploader组件。prefix是插件特有的，用于给目标元素钩子打上特殊的前缀。

其他都是editor的配置。

