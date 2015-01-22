KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('editoruploader', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/editoruploader/2.0.3/']});