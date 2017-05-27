var login = angular.module("login", []);
login.controller("loginController", ['$scope', function ($scope) {
    $scope.code_g = function () {
        var authCode="";
        var authCodeLength=4;//取几个随机数字
        var randomArray=[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z'];
        for(var i=0;i<authCodeLength;i++){
            var index=Math.floor(Math.random()*36);//随机取一位数
            authCode +=randomArray[index];//取四位数，并+相连
        }
        $scope.code_v  =authCode;
        return authCode;
    };
    $scope.code_v = $scope.code_g();

    $scope.checkName=function () {
        if(typeof ($scope.name) === "undefined"||$scope.name.trim().length<1){
            $("#name_err").text("用户名不能为空，请输入！");
            $("#name_err").removeClass("hide");
            return false;
        }else{
            return true;
        }
        /*return $.post( App.Config.testServerNameUrl,{
            type:'name',
            name:$scope.name

        },function (data, status) {
            if ("true"==data){

                if($("#name_err").is(":visible")){
                    $("#name_err").addClass("hide");
                }
            }else{
                $("#name_err").removeClass("hide");
                return false;
            }
        })*/;
    };
    $scope.hide_name_err = function () {
        if($("#name_err").is(":visible")){
            $("#name_err").addClass("hide");
        }
    };
    $scope.checkPwd = function () {
        if(typeof ($scope.pwd) === "undefined"||$scope.pwd.trim().length<1){
            $("#pwd_err").text("密码不能为空，请输入！");
            $("#pwd_err").removeClass("hide");
            return false;
        }else{
            return true;
        }
    }

    $scope.hide_pwd_err = function () {
        if($("#pwd_err").is(":visible")){
            $("#pwd_err").addClass("hide");
        }
    };

    $scope.checkCode = function () {
        if ("undefined" === typeof($scope.code)){
            $("#code_err").text("验证码不能为空，请输入！")
            $("#code_err").removeClass("hide");
            return false;

        }else{
            if($scope.code.toLowerCase()!==$scope.code_v.toLowerCase()){
                $("#code_err").text("验证码错误，请重新输入！")
                $("#code_err").removeClass("hide");
                return false;
            }else {
                if($("#code_err").is(":visible")){
                    $("#code_err").addClass("hide");
                }
                return true;
            }
        }
    };
    $scope.hide_code_err = function () {
        if($("#code_err").is(":visible")){
            $("#code_err").addClass("hide");
        }
    };

    $scope.submit = function () {
        if(!$scope.checkName()){
            return false;
        };
        if(!$scope.checkPwd()){
            return false;
        };
        if(!$scope.checkCode()){
            return false;
        };
        console.log(" $scope.name: "+ $scope.name);
        console.log(" $scope.pwd: "+ $scope.pwd);
        return $.post( App.Config.testloginServiceUrl+"login",
            {
                parameter:JSON.stringify({
                        loginNo: $scope.name,
                        loginPwd: $scope.pwd
                })
            }
            ,function (data, status) {

                data = JSON.parse(data);
                console.log(data);
                console.log("data.token: "+data.token);
                var t = data.token;
                console.log(t);
                switch (data.errcode) {
                    case 301:
                        $("#name_err").text("用户名不存在，请重新输入！");
                        $("#name_err").removeClass("hide");
                        $scope.code_v = $scope.code_g();
                        return false;
                    case 302:
                        $("#pwd_err").text("密码错误，请重新输入！");
                        $("#pwd_err").removeClass("hide");
                        $scope.code_v = $scope.code_g();
                        return false;
                    default:
                        window.location.href=App.Config.appRoot;
                        //
                        $.post( App.Config.testloginServiceUrl+"tokenCheck",
                            {
                                token:data.msg
                            },
                            function (data,status) {
                                console.log("status: " + status);
                                console.log("token_check: "+data)
                            });
                        break;
                }



                });
    };

    $scope.pwd_f = function () {

    };
}]);