<template>
    <div class="form-title-img" id="formTitleImg">
        <div id="operation" class="operation" :style="{ top: position.Y + 'px', left: position.X + 'px', transform: 'rotate('+rotateAngle+'deg)'}" :class="{operationActive: isActive}" @click.stop="operationClick">
            <div class="lefttop" v-show="clickshow"></div>
            <div class="leftbottom" v-show="clickshow"></div>
            <div class="righttop" v-show="clickshow"></div>
            <div class="rightbottom" v-show="clickshow" @mousedown.stop="rightbottomStart"></div>
            <div class="image" :style="{width: image.width + 'px', height: image.height + 'px', backgroundImage: 'url('+image.src+')'}"></div>
            <div id="rotate" :style="{width: image.width*0.1 + 'px', height: image.height*0.1 + 'px', top:image.height*0.45+10  + 'px', left: image.width*0.45+10 +'px'}" class="rotate" v-show="clickshow" @mousedown.stop="rotateStart"></div>
        </div>
        <div class="rotateCenter" style="width:2px;height: 2px;background-color: blue;position: absolute;z-index: 90;" :style="{top:rotateCenter.Y-2  + 'px',left:rotateCenter.X-2  + 'px'}"></div>
    </div>
</template>
<style scoped>
.titleImg {
    position: absolute;
    z-index: 10;
}
.form-title-img {
    background: transparent;
    /* position: absolute; */
}

.operation {
    position: absolute;
    display: inline-block;
    padding: 12px;
}

.operationActive {
    border: 2px dotted #aaaaaa;
    padding: 10px;
}

.operation:hover {
    cursor: move;
}

.lefttop,
.leftbottom,
.righttop,
.rightbottom,
.top,
.bottom,
.right,
.left {
    border-radius: 10px;
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: lightblue;
    z-index: 1;
}

.lefttop:hover,
.leftbottom:hover,
.righttop:hover,
.rightbottom:hover,
.top:hover,
.bottom:hover,
.right:hover,
.left:hover {
    background-color: lightgreen;
}

.lefttop:hover,
.leftbottom:hover,
.righttop:hover {
    cursor: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQzOS45NjMgNDM5Ljk2MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM5Ljk2MyA0MzkuOTYzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQyMS44MzYsMTM0LjMzYy0xMS42MTEtMjcuMTIxLTI3LjE3Mi01MC40ODctNDYuNjg2LTcwLjA4OWMtMTkuNTAyLTE5LjYwNC00Mi44MjQtMzUuMjE1LTY5Ljk0OC00Ni44MjUgICBDMjc4LjA4OCw1LjgwNiwyNDkuNjc0LDAsMjE5Ljk4NSwwYy0yOS42OTIsMC01OC4xMDEsNS44MDktODUuMjI0LDE3LjQxNmMtMjcuMTI0LDExLjYxLTUwLjQ0MSwyNy4yMTgtNjkuOTQ5LDQ2LjgyNSAgIEM0NS4zMDMsODMuODQzLDI5Ljc0LDEwNy4yMDksMTguMTMsMTM0LjMzQzYuNTIxLDE2MS40NTMsMC43MTUsMTg5Ljk1OCwwLjcxNSwyMTkuODM4YzAsMjkuODgxLDUuODA2LDU4LjQzMiwxNy40MTUsODUuNjQ4ICAgYzExLjYxMywyNy4yMjMsMjcuMTcyLDUwLjYyNyw0Ni42ODIsNzAuMjM2YzE5LjUwOCwxOS42MDUsNDIuODI1LDM1LjIxNyw2OS45NDksNDYuODE4YzI3LjEyMywxMS42MTUsNTUuNTMxLDE3LjQyMiw4NS4yMjQsMTcuNDIyICAgYzI5LjY5MywwLDU4LjEwMy01LjgwNyw4NS4yMTctMTcuNDIyYzI3LjEyNC0xMS42MDcsNTAuNDQ2LTI3LjIxMyw2OS45NDgtNDYuODE4YzE5LjUxNC0xOS42MDksMzUuMDc0LTQzLjAxNCw0Ni42ODYtNzAuMjM2ICAgYzExLjYxMS0yNy4yMTcsMTcuNDEyLTU1Ljc2OCwxNy40MTItODUuNjQ4QzQzOS4yNDQsMTg5Ljk1OCw0MzMuNDQ3LDE2MS40NTMsNDIxLjgzNiwxMzQuMzN6IE05MC4wNzgsMzA1LjE5OCAgIGMtMTYuOTQtMjYuMDY2LTI1LjQxLTU0LjUzMi0yNS40MDYtODUuMzY0YzAtMjguMTY3LDYuOTQ5LTU0LjI0MywyMC44NDMtNzguMjI3YzEzLjg5MS0yMy45ODIsMzIuNzM4LTQyLjkxOSw1Ni41MjctNTYuODE4ICAgYzIzLjc5MS0xMy44OTQsNDkuNzcyLTIwLjgzOSw3Ny45NDMtMjAuODM5YzMxLjQxMSwwLDU5Ljk1Miw4LjY2MSw4NS42NTIsMjUuOTgxTDkwLjA3OCwzMDUuMTk4eiBNMzYzLjAxMywyODAuNTExICAgYy04LjE4NywxOS4zMTgtMTkuMjE5LDM1LjkyNy0zMy4xMTMsNDkuODIzYy0xMy45LDEzLjg5NS0zMC40MDksMjQuOTgyLTQ5LjUzOSwzMy4yNTRjLTE5LjEzLDguMjc3LTM5LjI1OSwxMi40MjItNjAuMzgyLDEyLjQyMiAgIGMtMzAuNDUyLDAtNTguNzE3LTguNDY2LTg0Ljc5NC0yNS40MTNsMjE1LjI3My0yMTQuOTg1YzE2LjU2NiwyNS41MDUsMjQuODM4LDUzLjU4MSwyNC44MzgsODQuMjIzICAgQzM3NS4yOTEsMjQwLjk2NSwzNzEuMTk4LDI2MS4xODcsMzYzLjAxMywyODAuNTExeiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=),
        auto;
}

.rightbottom:hover {
    cursor: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2LjEgMjYuMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjYuMSAyNi4xIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KICA8Zz4KICAgIDxwYXRoIGQ9Im0xNiwyNS4wNDJ2LTJjMC0wLjYgMC40LTEgMS0xaDFjMC40LDAgMC43LTAuNSAwLjQtMC45bC00LTRjLTAuNC0wLjQtMC40LTEgMC0xLjRsMS40LTEuNGMwLjQtMC40IDEtMC40IDEuNCwwbDQsNGMwLjMsMC4zIDAuOSwwLjEgMC45LTAuNHYtMWMwLTAuNiAwLjQtMSAxLTFoMmMwLjYsMCAxLDAuNCAxLDF2OGMwLDAuNi0wLjQsMS0xLDFoLThjLTAuNywwLjEtMS4xLTAuMy0xLjEtMC45eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgPHBhdGggZD0ibTguOSwxMS43NDJsLTQtNGMtMC4zLTAuMy0wLjktMC4xLTAuOSwwLjR2MWMwLDAuNi0wLjQsMS0xLDFoLTJjLTAuNiwwLTEtMC40LTEtMXYtOGMwLTAuNiAwLjQtMSAxLTFoOGMwLjYsMCAxLDAuNCAxLDF2MmMwLDAuNi0wLjQsMS0xLDFoLTFjLTAuNCwwLTAuNywwLjUtMC40LDAuOWw0LDRjMC40LDAuNCAwLjQsMSAwLDEuNGwtMS40LDEuNGMtMC4zLDAuMy0wLjksMC4zLTEuMy0wLjF6IiBmaWxsPSIjMDAwMDAwIi8+CiAgPC9nPgo8L3N2Zz4K),
        auto;
}

.lefttop {
    top: -10px;
    left: -10px;
}

.leftbottom {
    bottom: -10px;
    left: -10px;
}

.righttop {
    top: -10px;
    right: -10px;
}

.rightbottom {
    bottom: -10px;
    right: -10px;
}

.left {
    top: calc(50% - 10px);
    left: -11px;
}

.right {
    top: calc(50% - 10px);
    right: -11px;
}

.top {
    left: calc(50% - 10px);
    top: -11px;
}

.bottom {
    left: calc(50% - 10px);
    bottom: -11px;
}

.rotate {
    position: absolute;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 2;
}

.rotate:hover {
    cursor: url(../assets/img/refresh-button-hover.png),
        auto;
}

.bg {
    width: 100%;
    height: 100%;
    background-color: lightsalmon;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
}

.clearfix {
    zoom: 1;
}

.image {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
}

.test {
    width: 10px;
    height: 10px;
    position: absolute;
    background-color: green;
    z-index: 4;
}
</style>

<script>
export default {
    name: "formTitleImg",
    props: [
        'formImgurl'
    ],
    data() {
        return {
            clickshow: false,
            isActive: false,

            position: {
                X: 0,
                Y: 0
            },
            image: {
                width: 0,
                height: 0,
                // src: 'ChMkJlfJWDiIJwULAAmCdZ-7FYwAAU-IwH2mdoACYKN321.jpg'
                src: ""
            },
            rotateCenter: {
                X: 0,
                Y: 0
            },
            rotateAngle: 0,
            scaleTime: 1.0,
            startRange: 0,
            initWidth: 0,
            initHeight: 0
        };
    },
    methods: {
        operationClick(e) {
            e.preventDefault();
            this.isActive = true;
            this.clickshow = true;
            var that = this;
            var positionX = this.position.X;
            var positionY = this.position.Y;
            var operation = e.target;
            document.onmousedown = function(e) {
                // console.log("移动初始位置: X-%d, Y-%d", e.clientX, e.clientY);
                var initX = e.clientX;
                var initY = e.clientY;
                var initCenterX = that.rotateCenter.X;
                var initCenterY = that.rotateCenter.Y;
                document.onmousemove = function(e) {
                    // console.log("移动位置: X-%d, Y-%d", e.clientX, e.clientY);
                    var left = e.clientX - initX;
                    var top = e.clientY - initY;
                    // console.log("left:%d,top:%d", left, top)
                    that.position.X = left + positionX;
                    that.position.Y = top + positionY;
                    document.onmouseup = function() {
                        document.onmousemove = null;
                        that.rotateCenter.X = left + initCenterX;
                        that.rotateCenter.Y = top + initCenterY;
                    };
                };
            };
        },
        windowClick(e) {
            if (e.path[0].id != "img") {
                this.isActive = false;
                this.clickshow = false;
            }
        },
        lefttopStart(e) {
            console.log("lefttopStart");
            console.log("X:%d,Y:%d", e.clientX, e.clientY);
        },
        lefttopMove(e) {
            console.log("lefttopMove");
            console.log("X:%d,Y:%d", e.clientX, e.clientY);
        },
        lefttopEnd(e) {
            console.log("lefttopEnd");
            console.log("X:%d,Y:%d", e.clientX, e.clientY);
        },
        leftbottomStart(e) {
            console.log("leftbottomStart");
        },
        righttopStart(e) {
            console.log("righttopStart");
        },
        rightbottomStart(e) {
            console.log("this.scaleTime: ", this.scaleTime);
            var that = this;
            console.log("rightbottomStart");
            console.log("X:%d,Y:%d", e.clientX, e.clientY);
            var rotateX = this.rotateCenter.X;
            var rotateY = this.rotateCenter.Y;
            this.startRange = Math.sqrt(
                Math.pow(e.clientX - this.rotateCenter.X, 2) +
                    Math.pow(e.clientY - this.rotateCenter.Y, 2)
            );
            var rotateCenterX = this.rotateCenter.X;
            var rotateCenterY = this.rotateCenter.Y;
            document.onmousemove = function(e) {
                var range = Math.sqrt(
                    Math.pow(e.clientX - that.rotateCenter.X, 2) +
                        Math.pow(e.clientY - that.rotateCenter.Y, 2)
                );
                that.scaleTime = range / that.startRange;
                that.image.width = that.initWidth * that.scaleTime;
                that.image.height = that.initHeight * that.scaleTime;
                document.onmouseup = function() {
                    console.log("this.scaleTime: ", that.scaleTime);
                    document.onmousemove = null;
                    that.initWidth = that.image.width;
                    that.initHeight = that.image.height;
                    // that.rotateCenter.X = rotateX * that.scaleTime;
                    // that.rotateCenter.Y = rotateY * that.scaleTime;
                    that.rotateCenter.X =
                        that.image.width / 2 + 12 + that.position.X;
                    that.rotateCenter.Y =
                        that.image.height / 2 + 12 + that.position.Y;
                };
            };
        },
        rotateStart(e) {
            var that = this;
            console.log(
                "rotateCenter: X: %d, Y: %d",
                that.rotateCenter.X,
                that.rotateCenter.Y
            );
            console.log("rotateDown");
            var initAngle = this.rotateAngle;
            console.log("initAngle: ", initAngle);
            document.onmousemove = function(e) {
                console.log("移动位置： X-%d,Y%d", e.clientX, e.clientY);
                var angle =
                    Math.atan(
                        Math.abs(e.clientX - that.rotateCenter.X) /
                            Math.abs(e.clientY - that.rotateCenter.Y)
                    ) *
                    180 /
                    Math.PI;
                if (
                    that.rotateCenter.X >= e.clientX &&
                    that.rotateCenter.Y >= e.clientY
                ) {
                    angle = 360 - angle;
                } else if (
                    that.rotateCenter.X >= e.clientX &&
                    that.rotateCenter.Y <= e.clientY
                ) {
                    angle = 180 + angle;
                } else if (
                    that.rotateCenter.X <= e.clientX &&
                    that.rotateCenter.Y <= e.clientY
                ) {
                    angle = 180 - angle;
                }
                console.log("angle: ", angle);
                that.rotateAngle = angle;
                document.onmouseup = function() {
                    document.onmousedown = null;
                    document.onmousemove = null;
                };
            };
        }
    },
    mounted() {
        var that = this;
        console.log("test: ",this.formImgurl)
        window.addEventListener("click", this.windowClick);
        var img = new Image();
        img.src = this.formImgurl;
        img.onload = function() {
            console.log(this.src);
            that.image.width = this.width;
            that.image.height = this.height;
            that.image.src = this.src;
            that.initWidth = this.width;
            that.initHeight = this.height;
            that.rotateCenter.X = (this.width + 24) / 2;
            that.rotateCenter.Y = (this.height + 24) / 2;
        };
    }
};
</script>

