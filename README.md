# poster-fe

> 海报实习项目

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 2018/4/9

1. 初始化项目(自带vue-router)
2. 安装vue-resource@1.5.0
3. 安装elementUI@2.3.3
4. 安装vue-awesome@3.0.0

## 2018/4/10

1. 基本路由已经配置好
2. 活动报名表单设计页面提交的api

  ``` json
    url: '/api/addActivity',
    methods: 'post',
    data: {
      "activityName": "五一活动",
      "startTime": "20180430",
      "endTime": "20180502",
      "activityStatus": 0,
      "posterDesign": false,
      "form": {
        "bgImgUrl": "url", //一个image url字符串,作报名表单背景图片
        "formName": {
            "type": "text", //type为text,则表单名称为文本,如果type为img,则表单名称为图片格式
            "content": "报名表单名称", //type为text,则content为文字,如果type为img,则表单名称为图片url
            "fontSize": 18, //type为text,则fontSize为字体大小,如果type为img,则fontSize为null
            "fontColor": "#aaaaaa", //字体颜色,type为img则为null,同上
            "position": {   //位置, 文本默认居中对齐, 图片可移动
                "x": 100,   //距离顶点向左为正,向右为负
                "y": 200    //距离顶点向下为正,向上为负
            },
            "size": {   //大小, 文本默认水平居中垂直对齐,图片可缩放
                "width": 100,   //宽度
                "height": 200   //高度
            },
            "rotate": 0,    //旋转角度,文本默认为0,图片可以旋转
        },
        "formDesc": {
            "type": "text", //type为text,则表单名称为文本,如果type为img,则表单名称为图片格式
            "content": "报名表单简述", //type为text,则content为文字,如果type为img,则表单名称为图片url
            "fontSize": 18, //type为text,则fontSize为字体大小,如果type为img,则fontSize为null
            "fontColor": "#aaaaaa", //字体颜色,type为img则为null,同上
            "position": {   //位置, 文本默认居中对齐, 图片可移动
                "x": 100,   //距离顶点向左为正,向右为负
                "y": 200    //距离顶点向下为正,向上为负
            },
            "size": {   //大小, 文本默认水平居中垂直对齐,图片可缩放
                "width": 100,   //宽度
                "height": 200   //高度
            },
            "rotate": 0,    //旋转角度,文本默认为0,图片可以旋转
        },
        "formContent": {
            "formImgUrl": "url",
            "paddingTop": 10,
            "paddingBottom": 10,
            "paddingRight": 10,
            "paddingLeft": 10,
            "position": {
                "x": 100,   //距离顶点向左为正,向右为负
                "y": 200    //距离顶点向下为正,向上为负
            },
            "size": {   //大小
                "width": 100,   //宽度
                "height": 200   //高度
            },
            "formitemMargin": 20, //表单项相隔距离
            "content": [    //表单项是按照数组顺序罗列的,位置也是都固定设置好的
                {
                    "type": "textfield", //单行文本,
                    "label": "单行文本名称",
                    "placeholder": "默认值",
                    "content": null
                },
                {
                    "type": "textarea", //多行文本,
                    "label": "多行文本名称",
                    "placeholder": "默认值",
                    "content": null
                },
                {
                    "type": "radio", //单选
                    "label": "单选名称",
                    "palceholder": "男",
                    "content": [
                        "男","女"
                    ]
                },
                {
                    "type": "checkbox", //多选
                    "label": "多选名称",
                    "palceholder": "广州",
                    "content": [
                        "广州","深圳","东莞","惠州"
                    ]
                },
                {
                    "type": "select", //下拉
                    "label": "下拉名称",
                    "palceholder": "请选择",
                    "content": [
                        "广州","深圳","东莞","惠州"
                    ]
                },
                {
                    "type": "uploadImg", //下拉
                    "label": "图片上传",
                    "palceholder": null,
                    "content": null
                },
                {
                    "type": "submitBtn", //提交按钮必须在表单内容最后一位,否则不能保存成功
                    "label": "提交",
                    "palceholder": "提交表单的url",
                    "content": null
                }
            ]
        }
      }
    }
  ```

## 2018/4/12

1. js浅拷贝和深拷贝
    1. js基本数据类型的浅拷贝就是新建一个值复制，而对对象类型的拷贝就是新建一个对象地址值复制；
    2. 浅拷贝对对象操作时会改变对象的值
        ```js
            var obj = { a:1, arr: [2,3] };
            var shallowObj = shallowCopy(obj);

            function shallowCopy(src) {
                var dst = {};
                for (var prop in src) {
                    if (src.hasOwnProperty(prop)) {
                    dst[prop] = src[prop];
                    }
                }
                return dst;
            }

            shallowObj.arr[1] = 5;
            obj.arr[1]   // = 5
            //这就是浅拷贝带来的弊端，不过现实有部分场景是需要浅拷贝解决的
        ```
    3. 深拷贝的解决方法
        ```js
            function deepCopy(p, c) {
        　　　　var c = c || {};
        　　　　for (var i in p) {
        　　　　　　if (typeof p[i] === 'object') {
        　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
        　　　　　　　　deepCopy(p[i], c[i]);
        　　　　　　} else {
        　　　　　　　　　c[i] = p[i];
        　　　　　　}
        　　　　}
        　　　　return c;
        　　}
            /*深拷贝，对对象和数组起效，递归调用，深层复制，但是效率低，性能差，大多数用json解决，简单粗暴*/
            var test ={
                name:{
                    xing:{
                        first:'张',
                        second:'李'
                    },
                    ming:'老头'
                },
                age :40,
                friend :['隔壁老王','宋经纪','同事']
            }
            var result = JSON.parse(JSON.stringify(test))
            /*局限性：无法复制函数；原型链没了，对象就是object，所属的类没了。*/
        ```
2. js中json对象方法
    1. JSON.stringify(value[,replacer[,space]]): json对象进去，返回字符串
        ```js
            /**
                value:必需， 要转换的 JavaScript 值（通常为对象或数组）。
                replacer:可选。用于转换结果的函数或数组。
                    如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。
                    如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。
                space:可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 有可以使用非数字，如：\t。
            */
        ```
    2. JSON.parse(text[, reviver]): json字符串进去，返回json对象
        ```js
            /**
                text:必需， 一个有效的 JSON 字符串。
                reviver: 可选，一个转换结果的函数， 将为对象的每个成员调用此函数。
            */
        ```

## 2018/4/13

1. 图片命名原则
    1. 图片名称分为头尾两部分用下划线分开
    2. 头部分类: banner, logo, button, menu, pic, title
    3. eg: banner_sohu.png, banner_sina.png, menu_aboutus.png, menu_job.png ...
    4. 鼠标感应效果: "图片名+\_+on/off", eg: menu1_on.png, menu1_off.png
2. vue组件传递数据方法(单向数据流: 父->子)
    1. 定义父组件father,子组件child
    2. 在父组件中引入子组件\<child\> 绑定父组件中的数据 \<child v-bind:send-msg="fmsg"\>
    3. 子组件在props: ['sendMsg']获取
    4. 传递对象时最好是复制一份,进行json对象转换,防止数据污染
    5. 子组件如果需要修改父组件的数据, 可以利用this.$emit("name", data)触发,或者修改this.$props.name的值;这时父组件需要绑定"name"的方法获取改变数据;
    6. 子组件触发让父组件去改,父组件改后又传递给子组件
    7. 非父子组件通信
        ```js
            /*bus.js*/
            import Vue from 'vue'
            export default new Vue();

            /*component A*/
            import Bus from '@/assets/bus';
            Bus.$emit("message", this.msg);

            /*component B*/
            import Bus from '@/assets/bus';
            Bus.$on("message",function(msg){
                this.msg = msg
            })
        ```
