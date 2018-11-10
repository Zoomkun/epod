<template>
    <section class="basic-box" @click="mask">
        <div class="basic-li">
            个人信息
        </div>
        <div class="basic-li">
            头像
            <img :src="userInfo.headIcon" alt="" @click="()=>{this.active = !this.active}" class="basic-head">
        </div>
        <div class="basic-li">
            昵称
            <router-link class="basic-name" to="/mine/rename">{{userInfo.nickName}}</router-link>
        </div>
        <div class="basic-li">
            手机号
            <span class="basic-phone">{{userInfo.userName}}</span>
        </div>
        <div class="basic-changeHead" :class="active === true ? 'basic-changeHead-enter' :'basic-changeHead-leave'">
            <p class="basic-changePhoto">从相册中选取
                <input class="basic-changePhotoBtn" type="file" id='uploadFile' accept="image/*"
                       v-on:change="upload($event)">
            </p>
            <p class="basic-changeCamera" @click="imgPreview">拍照</p>
            <p class="basic-changeE">取消</p>
        </div>
    </section>
</template>

<script>
    import Exif from 'exif-js'

    export default {
        name: 'basic',
        mounted() {
            let data = JSON.parse(localStorage.getItem('user'))
            this.userInfo = data
        },
        data() {
            return {
                userInfo: {},
                active: true,
            }
        },
        methods: {
            upload (e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.picValue = files[0];
                this.imgPreview(this.picValue);
                console.log(this.picValue)
            },
            imgPreview(file) {
                let self = this;
                let Orientation;
                //去获取拍照时的信息，解决拍出来的照片旋转问题
                Exif.getData(file, function () {
                    Orientation = Exif.getTag(this, 'Orientation');
                });
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;

                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    let reader = new FileReader();
                    // 将图片2将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        let result = this.result;
                        let img = new Image();
                        img.src = result;
                        //判断图片是否大于100K,是就直接上传，反之压缩图片
                        if (this.result.length <= (100 * 1024)) {
                            self.headerImage = this.result;
                            self.postImg();
                        } else {
                            img.onload = function () {
                                let data = self.compress(img, Orientation);
                                self.headerImage = data;
                                self.postImg();
                            }
                        }
                        // console.log(self.headerImage)
                    }
                }
            },
            postImg() {
                let self =this
                self.$ajax({
                    method: 'post',
                    url: '/user/photo/upload',

                    processData: false,
                    data: self.headerImage
                })
                    .then(function (data) {
                        if (data.code === 1) {
                            self.userInfo.headIcon = data.data.headIcon;
                            localStorage.setItem('user', JSON.stringify(self.userInfo))
                        } else {
                            alert('请稍后再试')
                        }
                    })
            },
            rotateImg(img, direction, canvas) {
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0;
                const max_step = 3;
                if (img == null) return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    //旋转到原位置，即超过最大值
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180;
                let ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            },
            compress(img, Orientation) {
                let self =this
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                //瓦片canvas
                let tCanvas = document.createElement("canvas");
                let tctx = tCanvas.getContext("2d");
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    console.log("大于400万像素")
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //        铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制
                let count;
                if ((count = width * height / 1000000) > 1) {
                    console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                    //            计算每块瓦片的宽和高
                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //修复ios上传图片的时候 被旋转的问题
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6://需要顺时针（向左）90度旋转
                            this.rotateImg(img, 'left', canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            this.rotateImg(img, 'right', canvas);
                            break;
                        case 3://需要180度旋转
                            this.rotateImg(img, 'right', canvas);//转两次
                            this.rotateImg(img, 'right', canvas);
                            break;
                    }
                }
                //进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.1);
                console.log('压缩前：' + initSize);
                console.log('压缩后：' + ndata.length);
                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                var formData = new FormData();   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数

                //convertBase64UrlToBlob函数是将base64编码转换;为Blob
                formData.append("file",self.convertBase64UrlToBlob(ndata), Date.now() + '.jpg');
                console.log(self.convertBase64UrlToBlob(ndata))
                return formData;
            },
            convertBase64UrlToBlob(base64Data){
                var byteString;
                if (base64Data.split(',')[0].indexOf('base64') >= 0){
                    byteString = atob(base64Data.split(',')[1]);
                }else{
                    byteString = unescape(base64Data.split(',')[1]);
                }
                var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], {type:mimeString});
            },
            mask(e) {
                let self = this
                if (e.target.parentElement.className.indexOf('basic-changeHead') === -1 && e.target.className.indexOf('basic-head') === -1) {
                    self.active = false
                }
            },
            readLocalFile() {
                var self = this;
                var $input = event.target;
                let inputFile = $input.files[0];

                let formData = new FormData();
                formData.append("file", inputFile);

                self.$ajax({
                    method: 'post',
                    url: '/user/photo/upload',

                    processData: false,
                    data: formData
                })
                    .then(function (data) {
                        if (data.code === 1) {
                            self.userInfo.headIcon = data.data.headIcon;
                            localStorage.setItem('user', JSON.stringify(self.userInfo))
                        } else {
                            alert('请稍后再试')
                        }
                    })
            }
        }
    }
</script>

<style lang="stylus">
    .basic-box
        position relative
        height 100%
        padding-top .3rem
        box-sizing border-box

    .basic-li
        text-align left
        font-size .16rem
        color #000000
        margin-bottom .3rem
        padding 0 .2rem

    .basic-li:nth-child(1)
        height .4rem
        line-height .4rem

    .basic-li:nth-child(3), .basic-li:nth-child(2)
        line-height .2rem
        height .2rem

    .basic-head
        float right
        width .4rem
        height .4rem
        border-radius .2rem

    .basic-name
        float right
        color #000000

    .basic-phone
        float right
        color #999

    .basic-changeHead
        width 100%
        font-size .15rem
        text-align center
        background-color #eeeeee
        line-height .4rem
        border-top 1px solid #dddddd
        position absolute
        bottom -1.33rem

    .basic-changeHead-enter
        animation basic-changeHead-in 0.5s ease 0s 1 normal
        animation-fill-mode forwards

    .basic-changeHead-leave
        animation basic-changeHead-out 0.5s ease 0s 1 normal
        animation-fill-mode forwards

    .basic-changePhoto
        border-top 1px solid #dddddd
        height .4rem
        position relative

    .basic-changePhotoBtn
        width 100%
        height 100%
        opacity 0
        position absolute
        top 0
        left 0
        z-index 1

    .basic-changeCamera
        border-top 1px solid #dddddd

    .basic-changeE
        margin-top .1rem

    @keyframes basic-changeHead-in
        from {
            bottom -1.33rem
        }
        to {
            bottom 0
        }

    @keyframes basic-changeHead-out {
        from {
            bottom 0
        }
        to {
            bottom -1.33rem
        }
    }
</style>


