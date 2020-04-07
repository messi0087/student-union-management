const isEmail  = require('validator/lib/isEmail');

export const validateLogin = function  (num,pass) {

    let errors ={};
    let condition =true;


    //判断账号是否为空
    if(!num){
        errors.message = '邮箱不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断邮箱是否合法
        if( !isEmail(num) ){
            errors.message = '邮箱错误';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }


    //判断密码是否为空

    if(!pass){
        errors.message = '密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        if( pass.length<6 || pass.length>16 ){
            errors.message = '密码长度不能小于6位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }


    if(condition) {
        if (typeof (errors.message) == 'undefined'){
            errors.message='成功';
            return {
                errors,
                condition
            };
        }
    }
};


export const validateRegister = function (num,pass,confirmPass) {
    let errors ={};
    let condition =true;

    //判断邮箱是否为空
    if(!num) {
            errors.message = '邮箱不能为空';
            condition = false;
            return {
                errors,
                condition
            };
    }else {
        //判断邮箱是否合法
        if( !isEmail(num) ){
            errors.message = '邮箱错误';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }




    //判断密码是否为空
    if( !pass ){
        errors.message = '密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断密码是否合法
        if( pass.length>16 || pass.length<6 ){
            errors.message = '密码长度不能小于6位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断2密码是否为空
    if( !confirmPass ){
        errors.message = '确认密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断密码2是否合法
        if( confirmPass.length>16 && confirmPass.length<6 ){
            errors.message = '确认密码不能为空长度不能小于6位且不能大于16位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断密码是否相同
    if( confirmPass ) {
        errors.message = '两次输入的密码不一致';
        condition = false;
        return {
            errors,
            condition
        };
    }



    if(condition) {
        if (typeof (errors.message) == 'undefined'){
            errors.message='成功';
            return {
                errors,
                condition
            };
        }
    }
}
