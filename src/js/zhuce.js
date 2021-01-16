define([], function() {
    return {
        init: function() {
            const $form = $('#formAction'); //form表单
            const $tel = $('[name=tel]'); //手机
            const $confirm = $('[name=telConfirm]'); //手机验证码
            const $pwd = $('[name=password]'); //密码
            const $tips = $('.error-tips'); //提示语
            const $check = $('.ok'); //验证通过

            let $telflag = true;
            let $confirmflag = true;
            let $pwdflag = true;


            //手机号检测
            //得到焦点
            $tel.on('focus', function() {
                $tips.eq(0).html('请输入11位正确的手机号码').css('color', '#999');
            });
            //失去焦点
            $tel.on('blur', function() {
                let $value = $(this).val(); //获取当前表单的值
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        // $check.eq(0).css('display', 'inline');
                        // $tips.eq(0).html('');
                        $telflag = true;

                        //手机号格式没有问题，将手机号传给后端。
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.160.88/mi/php/reg.php',
                            data: {
                                tel: $tel.val(),
                                password: $pwd.val()
                            }
                        }).done(function(data) {
                            if (!data) { //不存在
                                $check.eq(0).css('display', 'inline');
                                $tips.eq(0).html('');
                            } else { //存在
                                $tips.eq(0).html('该手机号已注册').css('color', 'red');
                            }
                        });
                    } else {
                        $tips.eq(0).html('手机号码格式有误').css('color', 'red');
                        $telflag = false;
                    }
                } else {
                    $tips.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
            });

            //验证密码
            $pwd.on('focus', function() {
                $tips.eq(1).html('请输入密码,长度为8-14个字符').css('color', '#999');
            });
            $pwd.on('input', function() {
                if ($(this).val().length >= 8 && $(this).val().length <= 14) {
                    let $regnum = /\d+/;
                    let $reguppercase = /[A-Z]+/;
                    let $reglowercase = /[a-z]+/;
                    let $other = /[\W_]+/; //特殊字符%&^$#@!*
                    let $count = 0; //字符种类的统计结果
                    if ($regnum.test($(this).val())) {
                        $count++;
                        console.log($count);
                    }
                    if ($reguppercase.test($(this).val())) {
                        $count++;
                    }
                    if ($reglowercase.test($(this).val())) {
                        $count++;
                    }
                    if ($other.test($(this).val())) {
                        $count++;
                    }
                    switch ($count) {
                        case 1:
                            $tips.eq(1).html('弱').css('color', 'red');
                            $pwdflag = false;
                            break;
                        case 2:
                        case 3:
                            $tips.eq(1).html('中').css('color', 'orange');
                            $pwdflag = true;
                            break;
                        case 4:
                            $tips.eq(1).html('强').css('color', 'green');
                            $pwdflag = true;
                            break;
                    }
                } else {
                    $tips.eq(1).html('密码长度有误').css('color', 'red');
                    $pwdflag = false;
                }
            });
            $pwd.on('blur', function() {
                if ($(this).val() !== '') {
                    if ($pwdflag) {
                        $check.eq(1).css('display', 'inline');
                        $tips.eq(1).html('');
                    } else {
                        $tips.eq(1).html('密码不能为空').css('color', 'red');
                        $pwdflag = false;
                    }
                } else {
                    $tips.eq(1).html('');
                }
            });

            //阻止表单的直接跳转。
            $form.on('submit', function() {
                if ($tel.val() === '') {
                    $tips.eq(0).html('手机号码不能为空').css('color', 'red');
                    $telflag = false;
                }
                if ($password.val() === '') {
                    $tips.eq(1).html('密码不能为空').css('color', 'red');
                    $passflag = false;
                }

                if (!$telflag || !$passflag) {
                    return false;
                }
            });


        }
    }
})