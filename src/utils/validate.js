const isEmail  = require('validator/lib/isEmail')

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
}


export const validateRegister = function (data) {
    let errors ={};
    let condition =true;

    //判断邮箱是否为空
    if(!data.account) {
            errors.message = '邮箱不能为空';
            condition = false;
            return {
                errors,
                condition
            };
    }else {
        //判断邮箱是否合法
        if( !isEmail(data.account) ){
            errors.message = '邮箱错误';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }




    //判断密码是否为空
    if(!data.password){
        errors.message = '密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        if( data.password.length<6 || data.password.length>16 ){
            errors.message = '密码长度不能小于6位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断2密码是否为空
    if( !data.confirmPassword ){
        errors.message = '确认密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断密码2是否合法
        if( data.confirmPassword.length>16 || data.confirmPassword.length<6 ){
            errors.message = '确认密码长度不能小于6位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断密码是否相同
    if( data.confirmPassword !==data.password ) {
        errors.message = '两次输入的密码不一致';
        condition = false;
        return {
            errors,
            condition
        };
    }

    //判断名字为空
    if( !data.name ){
        errors.message = '姓名不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }

    //判断电话号码为空
    if( !data.phone ){
        errors.message = '电话号码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }

    //判断部门为空
    if( !data.departmentChoice ){
        errors.message = '部门选择不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }

    //判断职位为空
    if( !data.positionChoice ){
        errors.message = '职位选择不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }


    if(condition) {
        if (typeof (errors.message) == 'undefined'){
            errors.message='注册成功';
            return {
                errors,
                condition
            };
        }
    }
}


export const validateChangePassword = function (data) {
    let errors ={};
    let condition =true;

    //判断邮箱是否为空
    if(!data.email) {
        errors.message = '邮箱不能为空';
        condition = false;
        return {
            errors,
            condition
        };
    }else {
        //判断邮箱是否合法
        if( !isEmail(data.email) ){
            errors.message = '邮箱错误';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }


    //判断密码是否为空
    if(!data.currntPassword){
        errors.message = '原密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        if( data.currntPassword.length<6 || data.currntPassword.length>16 ){
            errors.message = '原密码长度不能小于6位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断2密码是否为空
    if( !data.newPassward ){
        errors.message = '新密码不能为空';
        condition =false;
        return {
            errors,
            condition
        };
    }else {
        //判断密码2是否合法
        if( data.newPassward.length>16 || data.newPassward.length<6 ){
            errors.message = '新密码长度不能小于6位';
            condition = false;
            return {
                errors,
                condition
            };
        }
    }

    //判断密码是否相同
    if( data.currntPassword === data.newPassward ) {
        errors.message = '两次输入的密码一致，新密码和旧密码不能相同';
        condition = false;
        return {
            errors,
            condition
        };
    }

    if(condition) {
        if (typeof (errors.message) == 'undefined'){
            errors.message='修改成功';
            return {
                errors,
                condition
            };
        }
    }
}

export const validateNewActivity = function (data) {
    let errors ={};
    let condition =true;

    //判断主题是否为空
    if(!data.theme) {
        errors.message = '主题不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断内容是否为空
    if(!data.content) {
        errors.message = '活动信息不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断地址是否为空
    if(!data.address) {
        errors.message = '地址不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断费用是否为空
    if(!data.charge && !isNaN(data.charge)) {
        errors.message = '费用不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }
    else if(isNaN(data.charge)) {
        errors.message = '费用必须是数字'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断时间是否为空
    if(!data.time) {
        errors.message = '时间不能为空'
        condition = false
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

export const validateNewMeeting = function (data) {
    let errors ={};
    let condition =true;

    //判断主题是否为空
    if(!data.theme) {
        errors.message = '主题不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断内容是否为空
    if(!data.content) {
        errors.message = '会议内容不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断地址是否为空
    if(!data.address) {
        errors.message = '地址不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断时间是否为空
    if(!data.startTime) {
        errors.message = '会议时间不能为空'
        condition = false
        return {
            errors,
            condition
        };
    }

    //判断时长是否为空
    if(!data.endTime) {
        errors.message = '会议时长不能为空'
        condition = false
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

