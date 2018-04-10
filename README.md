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