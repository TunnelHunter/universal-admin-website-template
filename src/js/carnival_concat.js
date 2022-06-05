/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/15
 * Time: 10:21
 */

var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/selected',{
            templateUrl: 'html/selected.html',
            controller: 'selectedCtrl'
        })
        .when('/all',{
            templateUrl: 'html/all.html',
            controller: 'allCtrl'
        })
        .when('/addNew',{
            templateUrl: 'html/addNew.html',
            controller: 'addNewCtrl'
        })
        .otherwise({redirectTo:'/selected'})
}]);
/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/15
 * Time: 10:23
 */
//统一接口注册
app.service('ajaxService', function () {


    // var ROOT_HTTP = '../../../../GCPI';
    // var ROOT_HTTP = 'http://211.161.10.70:19091/carnival/question'; //新创建的测试ip
    var ROOT_HTTP = 'https://www.easy-mock.com/mock/5b88b7ab76b79510db91766a/example';

    /**
     * 查询已选择问题
     * @type {string}
     */
    var querySelected = ROOT_HTTP + '/questionBank/1';
    this.querySelected = function () {
        return querySelected;
    };

    /**
     * 查询未选择问题
     * @type {string}
     */
    var queryNotSelected = ROOT_HTTP + '/questionBank/0';
    this.queryNotSelected = function () {
        return queryNotSelected;
    };

    /**
     * 查询全部问题
     * @type {string}
     */
    var queryAll = ROOT_HTTP + '/questionBank/2';
    this.queryAll = function () {
        return queryAll;
    };

    /**
     * 添加新问题
     * @type {string}
     */
        // var addQuestion = ROOT_HTTP + '/addQuestion';
        // this.addQuestion = function () {
        //     return addQuestion;
        // };
    var addQuestion = ROOT_HTTP + '/xxx';
    this.addQuestion = function () {
        return addQuestion;
    };

    /**
     * 删除问题
     * @type {string}
     */
        // var deleteQuestions = ROOT_HTTP + '/deleteQuestions/';
        // this.deleteQuestions = function () {
        //     return deleteQuestions;
        // };
    var deleteQuestions = ROOT_HTTP + '/xxx';
    this.deleteQuestions = function () {
        return deleteQuestions;
    };


    /**
     * 移入移除问题
     * @type {string}
     */
        // var moveQuestions = ROOT_HTTP + '/moveQuestions';
        // this.moveQuestions = function () {
        //     return moveQuestions;
        // };
    var moveQuestions = ROOT_HTTP + '/xxx';
    this.moveQuestions = function () {
        return moveQuestions;
    };

    /**
     * 移入移除问题
     * @type {string}
     */
        // var updateQuestion = ROOT_HTTP + '/updateQuestion';
        // this.updateQuestion = function () {
        //     return updateQuestion;
        // };
    var updateQuestion = ROOT_HTTP + '/xxx';
    this.updateQuestion = function () {
        return updateQuestion;
    };


});

/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/15
 * Time: 10:27
 */

app.run(['$rootScope', 'ajaxService', '$http', '$timeout'
    , function ($rootScope, ajaxService, $http, $timeout) {

        $rootScope.var_common_appDownloadShow = false;
        $rootScope.var_selectedNumber = 0;
        $rootScope.var_allNumber = 0;

        $rootScope.selectedData = [];
        $rootScope.allData = [];

        /**
         * 检查用户是否登录，没有登录就跳转到 login.html 页面
         */
        $rootScope.fn_checkLogin = function () {
            var hash = window.location.hash;
            if (hash.indexOf("login") > 0) {
                return;
            } else {
                if (localStorage.getItem("username") == null || localStorage.getItem("username") === '') {
                    window.location.href = 'html/login.html#login';
                }
            }
        };
        $rootScope.fn_checkLogin();

        /**
         * 用户退出方法
         */
        $rootScope.fn_logout = function () {
            localStorage.clear();
            window.location.href = 'html/login.html#login';
        };

        $rootScope.fn_checkPage = function () {
            console.log("111111111");
            var hash = window.location.hash;
            console.log(hash);
            var menu = document.getElementById("sidebar-menu").children[0].children;
            if (hash === "#/selected") {
                angular.element(menu[0].children[0]).addClass('active');
                angular.element(menu[1].children[0]).removeClass('active');
                angular.element(menu[2].children[0]).removeClass('active');
                angular.element(menu[3].children[0]).removeClass('active');
            } else if (hash === "#/all") {
                angular.element(menu[0].children[0]).removeClass('active');
                angular.element(menu[1].children[0]).addClass('active');
                angular.element(menu[2].children[0]).removeClass('active');
                angular.element(menu[3].children[0]).removeClass('active');

            } else if (hash === "#/addNew") {
                angular.element(menu[0].children[0]).removeClass('active');
                angular.element(menu[1].children[0]).removeClass('active');
                angular.element(menu[2].children[0]).addClass('active');
                angular.element(menu[3].children[0]).removeClass('active');

            }

        };

        $rootScope.fn_preloader = function () {
            var preloader = document.getElementById("preloader");
            angular.element(preloader).addClass("loading_comment");
            setTimeout(function () {
                preloader.style.display = "none";
            }, 1300);

        };
        $rootScope.fn_preloader();

        $rootScope.fn_button_popovers = function () {
            $('[data-toggle="popover"]').popover();
        };


        /**
         * 获取题目的数目
         */
        $rootScope.fn_getQuestionsNumber = function (type) {
            var queryType =  -1;
            queryType = type;
            var http_url = "";
            if (queryType === 0) {
                http_url = ajaxService.querySelected();
            } else if(queryType === 1){
                http_url = ajaxService.queryAll();
            }else {
                return;
            }

            $http({
                method: "get",
                url: http_url,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.length !== 0) {
                        if (type === 0) {
                            $rootScope.var_selectedNumber = response.diffcultQuestions.length + response.commonQuestions.length + response.simpleQuestions.length;
                            $rootScope.selectedData = [response.diffcultQuestions.length,response.commonQuestions.length,response.simpleQuestions.length];
                            console.log("selected scope selectedNumber:" + $rootScope.var_selectedNumber);
                        } else if(type === 1){
                            $rootScope.var_allNumber = response.diffcultQuestions.length + response.commonQuestions.length + response.simpleQuestions.length;
                            $rootScope.allData = [response.diffcultQuestions.length,response.commonQuestions.length,response.simpleQuestions.length];
                            console.log("selected scope allNumber:" + $rootScope.var_allNumber);
                        }
                    }

                })
                .error(function (response) {

                });
        };


        /**
         * 模态窗口方法
         * @param type
         * @param message
         */
        $rootScope.fn_show_alertModel = function (type,message,ms) {
            var alert = document.getElementById("myAlert");
            if(type ===0){
                angular.element(alert).addClass("alert-primary");
            }else if(type ===1){
                angular.element(alert).addClass("alert-warning");
            }else {
                angular.element(alert).addClass("alert-danger");
            }
            $('#exampleModal').modal('show');
            $rootScope.alertMessage = message;
            setTimeout(function () {
                $('#exampleModal').modal('hide');
            },ms);
        };

        $rootScope.alertMessage = "";

        /**
         * 关闭弹框
         */
        $rootScope.fn_close_alertModel = function () {
            $('#exampleModal').modal('hide');
        };



        //对特殊字符 的 转码
        //utils.fn_escape = function(str){
        //    return escape(str);
        //};

        /*
         //大于零的整数或者小数的JS正则
         //var reg_greaterThanZero =/^[+]?(([1-9]\d*[.]?)|(0.))(\d{0,10})?$/;

         * 只有 0-9[a-Z] $ - _ . + ! * ' ( ) , 以及某些保留字，才能不经过编码直接用于 URL。
         例如：搜索的中文关键字，复制网址之后再粘贴就会发现该URL已经被转码。

         1、escape 和 unescape
         原理：对除ASCII字母、数字、标点符号 @  *  _  +  -  .  / 以外的其他字符进行编码。
         编码：escape('http://www.baidu.com?name=zhang@xiao@jie&order=1')
         　　　结果："http%3A//www.baidu.com%3Fname%3Dzhang@xiao@jie%26order%3D1"
         　　　escape('张') 结果："%u5F20"
         解码：unescape

         2、encodeURI 和 decodeURI
         原理：返回编码为有效的统一资源标识符 (URI) 的字符串，不会被编码的字符：! @ # $ & * ( ) = : / ; ? + '
         　　  encodeURI()是Javascript中真正用来对URL编码的函数。
         编码：encodeURI('http://www.baidu.com?name=zhang@xiao@jie&order=1')
         　　　结果："http://www.baidu.com?name=zhang@xiao@jie&order=1"
         解码：decodeURI

         3、encodeURIComponent 和 decodeURIComponent
         原理：对URL的组成部分进行个别编码，而不用于对整个URL进行编码
         编码：encodeURIComponent('http://www.baidu.com?name=zhang@xiao@jie&order=1')
         　　　结果："http%3A%2F%2Fwww.baidu.com%3Fname%3Dzhang%40xiao%40jie%26order%3D1"
         解码：decodeURIComponent
         * */

        // //这个可以将任意字符 都转码处理 - 转码
        // utils.fn_encodeURIComponent = function (str) {
        //     return encodeURIComponent(str);
        // };
        // //这个可以将任意字符 都转码处理 - 解码
        // utils.fn_decodeURIComponent = function (str) {
        //     return decodeURIComponent(str);
        // };
        //
        // /**
        //  * 异或运算 密钥 加密解密方法，后端接受后，做同样的异或运算，就可以了
        //  * 前端需要 charCodeAt转ASCII码 ，而后端异或运算，就直接已转ASCII码。则可直接 异或 字符串，
        //  * @return {string}
        //  */
        // utils.CodeAndEncode = function ( pkey, str )
        // {
        //     var codedStr = "";
        //     for( i = 0; i < str.length; i++ )
        //     {
        //         var str_ = str.charCodeAt(i);
        //         //console.log(date.charCodeAt(i));
        //         for( j = 0; j < pkey.length; j++ )
        //         {
        //             //console.log(pkey.charCodeAt(j));
        //             //在128-255的ASCII字符，大于255的是汉字
        //             //charCodeAt 返回的是 字符的 Unicode 编码 /  ASCII字符
        //             str_ ^= pkey.charCodeAt(j);
        //         }
        //         //fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串,
        //         //保证原始字符长度和转码后的长度一致
        //         codedStr += String.fromCharCode( str_ );
        //         //console.log(codedStr);
        //     }
        //     //console.log(codedStr);
        //     return codedStr;
        // };
        //
        // //拖拽
        // utils.common_onmousedown = function(id){
        //     //console.log('load drag');
        //
        //     var oDiv=document.getElementById(id);
        //
        //     oDiv.onmousedown=function (ev)
        //     {
        //         var oEvent=ev||event;
        //
        //         var target = oEvent.target || oEvent.srcElement;
        //         //var id = ev.target.getAttribute('id');
        //
        //         //正则匹配，只要class里 包含 allow_drag_move 就可以
        //         //var allow_drag_move = new RegExp('allow_drag_move', 'i');
        //         var allow_drag_move = /allow_drag_move/gi;  //g全局  i 无论大小写
        //
        //         //console.log(target.className.toLowerCase());
        //         //if( target.className.toLowerCase() !== 'allow_drag_move')   //这样，就必须 html标签的class只有 allow_drag_move，才可拖动
        //         if( !allow_drag_move.test(target.className.toLowerCase()) )
        //         {
        //             //console.log('非allow_drag_move，不能执行拖拽');
        //             return;
        //         }
        //
        //         var disX=oEvent.clientX-oDiv.offsetLeft;
        //         var disY=oEvent.clientY-oDiv.offsetTop;
        //
        //         document.onmousemove=function (ev)
        //         {
        //             var oEvent=ev||event;
        //             var l=oEvent.clientX-disX;
        //             var t=oEvent.clientY-disY;
        //             /*if(l<0)
        //             {
        //                 l=0;
        //             }
        //             if(t<0)
        //             {
        //                 t=0;
        //             }*/
        //             /*if(l<0)
        //             {
        //                 l=0;
        //             }
        //             else if( l > document.documentElement.clientWidth-oDiv.offsetWidth + 600 )
        //             {
        //                 l=document.documentElement.clientWidth-oDiv.offsetWidth + 600;
        //             }
        //
        //             if(t<0)
        //             {
        //                 t=0;
        //             }
        //             else if( t>document.documentElement.clientHeight-oDiv.offsetHeight)
        //             {
        //                 t=document.documentElement.clientHeight-oDiv.offsetHeight;
        //             }*/
        //
        //             oDiv.style.position='fixed';
        //             //oDiv.style.cursor='Move';
        //             oDiv.style.left=l+'px';
        //             oDiv.style.top=t+'px';
        //         };
        //
        //         document.onmouseup=function ()
        //         {
        //             document.onmousemove=null;
        //             document.onmouseup=null;
        //         };
        //     };
        // };


    }]);
/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/15
 * Time: 13:38
 */

app.controller('loginCtrl', ['$scope', '$rootScope','$http', 'ajaxService'
    , function ($scope, $rootScope,$http, ajaxService) {

        $rootScope.fn_preloader();
        localStorage.clear();

        $scope.username = 'admin';
        $scope.password = 'admin';

        $scope.alertText = '';

        /**
         * 提示框方法
         * @param text
         */
        $scope.showAlert = function (text) {
            console.log("1111");
            $scope.alertText = text;
            var showAlertDiv = document.getElementById("showAlert");
            if (angular.element(showAlertDiv).hasClass('fade')) {
                angular.element(showAlertDiv).removeClass('fade');
                angular.element(showAlertDiv).addClass('show');
                setTimeout(function () {
                    angular.element(showAlertDiv).removeClass('show');
                    angular.element(showAlertDiv).addClass('fade');
                }, 3000)
            }
        };


        /**
         * 用户登录方法
         */
        $scope.fn_login = function () {
            if ($scope.username == '') {
                $scope.showAlert('请输入用户名！');
                return;
            }
            if ($scope.password == '') {
                $scope.showAlert('请输入密码！');
                return;
            }

            if($scope.username !== 'admin' || $scope.password !== 'admin'){
                $scope.showAlert('用户名或密码输入错误！');
            }else {
                localStorage.setItem("username","root");
                window.location.href = '../index.html';
            }
        };

        /**
         *  键盘回车键登录
         */
        $scope.loginKeyup = function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.fn_login();
            }
        };


    }]);

/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/15
 * Time: 10:30
 */

app.controller('selectedCtrl', ['$scope', '$rootScope', '$http', 'ajaxService'
    , function ($scope, $rootScope, $http, ajaxService) {
        /**
         * 进入页面就调用跟方法 检查页面的路由 获取全部题目数目
         */
        $rootScope.fn_checkPage();
        $rootScope.fn_getQuestionsNumber(1);

        /**
         * 定义存储数组
         * @type {Array}
         */
        $scope.arr_diffcultQuestions = [];
        $scope.arr_commonQuestions = [];
        $scope.arr_simpleQuestions = [];

        $scope.arr_selectedEasy = [];
        $scope.arr_finalSelectEasy = [];
        $scope.arr_selectedCom = [];
        $scope.arr_finalSelectCom = [];
        $scope.arr_selectedDiff = [];
        $scope.arr_finalSelectDiff = [];

        /**
         * 获取已选题目信息
         */
        $scope.fn_getSelected = function (showAlter) {

            $http({
                method: "get",
                url: ajaxService.querySelected(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.length !== 0) {
                        $scope.arr_diffcultQuestions = response.diffcultQuestions;
                        $scope.arr_commonQuestions = response.commonQuestions;
                        $scope.arr_simpleQuestions = response.simpleQuestions;
                        $rootScope.var_selectedNumber = $scope.arr_diffcultQuestions.length + $scope.arr_commonQuestions.length + $scope.arr_simpleQuestions.length;
                        console.log("selected scope selectedNumber:" + $rootScope.var_selectedNumber);

                        setTimeout(function () {
                            $rootScope.fn_button_popovers();
                        }, 50);
                        if(showAlter){
                            $rootScope.fn_show_alertModel(0,"已选题目加载完成",1300);
                        }
                    }else {
                        if(showAlter) {
                            $rootScope.fn_show_alertModel(1, "题目获取失败，请稍后再试", 1500);
                        }
                    }
                })
                .error(function (response) {
                    if(showAlter) {
                        $rootScope.fn_show_alertModel(2, "题目获取失败，请检查网络", 1500);
                    }
                });
        };

        $scope.fn_getSelected(true);


        /**
         * 勾选移除 复选框 执行此方法 type 为题目难易程度  0/1/2 代表 简单/中等/困难
         * @param type
         */
        $scope.fn_changeSelected = function (type) {

            $scope.arr_finalSelectEasy = [];
            $scope.arr_finalSelectCom = [];
            $scope.arr_finalSelectDiff = [];
            var array = [];

            if (type === 0) {
                //使用for in 循环得到 值不为undefined 的下标
                for (var item in $scope.arr_selectedEasy) {
                    if ($scope.arr_selectedEasy[item])
                        array.push($scope.arr_selectedEasy[item]);

                }
                $scope.arr_finalSelectEasy = array;
                console.info($scope.arr_finalSelectEasy);
            } else if (type === 1) {
                for (var item in $scope.arr_selectedCom) {
                    if ($scope.arr_selectedCom[item])
                        array.push($scope.arr_selectedCom[item]);
                }
                $scope.arr_finalSelectCom = array;
                console.info($scope.arr_finalSelectCom);
            } else {
                for (var item in $scope.arr_selectedDiff) {
                    if ($scope.arr_selectedDiff[item])
                        array.push($scope.arr_selectedDiff[item]);
                }
                $scope.arr_finalSelectDiff = array;
                console.info($scope.arr_finalSelectDiff);
            }
        };


        /**
         * 从已选题目中移除题目方法
         * type 为题目难易程度  0/1/2 代表 简单/中等/困难
         * @param type
         */
        $scope.fn_removeQuestions = function (type) {

            var http_data = {
                "questionIds": [],
                "isSelect": 0
            };
            if ($scope.arr_finalSelectEasy === [] && $scope.arr_finalSelectCom === [] && $scope.arr_finalSelectDiff === []) {
                $rootScope.fn_show_alertModel(1,"请勾选需要批量移出的题目",1300);
                return;
            }

            if (type === 0) {
                http_data.questionIds = $scope.arr_finalSelectEasy.map(Number);
            } else if (type === 1) {
                http_data.questionIds = $scope.arr_finalSelectCom.map(Number);
            } else if (type === 2) {
                http_data.questionIds = $scope.arr_finalSelectDiff.map(Number);
            }
            $http({
                method: "put",
                url: ajaxService.moveQuestions(),
                data: JSON.stringify(http_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.errorCode == 0) {
                        console.log("移除 " + type + " 成功");
                        $scope.fn_getSelected(false);
                        $rootScope.fn_show_alertModel(0,"题目移出成功",1300);
                    }else {
                        console.log("移除 " + type + " 失败");
                        $rootScope.fn_show_alertModel(1,"题目移出失败，请稍后重试",1300);
                    }

                })
                .error(function (response) {
                    console.log("移除 " + type + " 失败");
                    console.log(http_data.questionIds);
                    $rootScope.fn_show_alertModel(2,"题目移出失败，请检查网络",1500);
                });


        };


    }]);

/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/15
 * Time: 10:32
 */

app.controller('allCtrl', ['$scope', '$rootScope', '$http', 'ajaxService'
    , function ($scope, $rootScope, $http, ajaxService) {
        $rootScope.fn_checkPage();
        $rootScope.fn_getQuestionsNumber(0);

        /**
         * 定义存储数组
         * @type {Array}
         */
        $scope.arr_allDiffcultQuestions = [];
        $scope.arr_allCommonQuestions = [];
        $scope.arr_allSimpleQuestions = [];

        //三种类型移入
        $scope.arr_allSelectedEasy = [];
        $scope.arr_allFinalSelectEasy = [];
        $scope.arr_allSelectedCom = [];
        $scope.arr_allFinalSelectCom = [];
        $scope.arr_allSelectedDiff = [];
        $scope.arr_allFinalSelectDiff = [];


        //三种类型删除
        $scope.arr_allDeleteSelectedEasy = [];
        $scope.arr_allFinalDeleteSelectEasy = [];
        $scope.arr_allDeleteSelectedCom = [];
        $scope.arr_allFinalDeleteSelectCom = [];
        $scope.arr_allDeleteSelectedDiff = [];
        $scope.arr_allFinalDeleteSelectDiff = [];


        /**
         * 获取全部题目信息
         */
        $scope.fn_getAll = function (showAlter) {

            $http({
                method: "get",
                url: ajaxService.queryAll(),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.length !== 0) {
                        $scope.arr_allDiffcultQuestions = response.diffcultQuestions;
                        $scope.arr_allCommonQuestions = response.commonQuestions;
                        $scope.arr_allSimpleQuestions = response.simpleQuestions;
                        $rootScope.var_allNumber = $scope.arr_allDiffcultQuestions.length + $scope.arr_allCommonQuestions.length + $scope.arr_allSimpleQuestions.length;
                        console.log("all scope allNumber:" + $rootScope.var_allNumber);
                        $rootScope.fn_getQuestionsNumber(0);
                        setTimeout(function () {
                            $rootScope.fn_button_popovers();
                        }, 50);
                        if(showAlter){
                            $rootScope.fn_show_alertModel(0,"全部题目获取成功",1300);
                        }
                    }else {
                        if(showAlter){
                            $rootScope.fn_show_alertModel(1,"题目获取失败，请稍后重试",1300);
                        }
                    }
                })
                .error(function (response) {
                    if(showAlter){
                        $rootScope.fn_show_alertModel(2,"题目获取失败，请检查网络",1500);
                    }
                });
        };
        $scope.fn_getAll(true);


        /**
         * 批量移入 获取批量移入数组id方法
         * type 0/1/2 简单/中等/容易
         */
        $scope.fn_changeSelected = function (type) {

            $scope.arr_allFinalSelectEasy = [];
            $scope.arr_allFinalSelectCom = [];
            $scope.arr_allFinalSelectDiff = [];
            var array = [];

            if (type === 0) {
                for (var item in $scope.arr_allSelectedEasy) {
                    if ($scope.arr_allSelectedEasy[item])
                        array.push($scope.arr_allSelectedEasy[item]);
                }
                $scope.arr_allFinalSelectEasy = array;
                console.info($scope.arr_allFinalSelectEasy);
            } else if (type === 1) {
                for (var item in $scope.arr_allSelectedCom) {
                    if ($scope.arr_allSelectedCom[item])
                        array.push($scope.arr_allSelectedCom[item]);
                }
                $scope.arr_allFinalSelectCom = array;
                console.info($scope.arr_allFinalSelectCom);
            } else {
                for (var item in $scope.arr_allSelectedDiff) {
                    if ($scope.arr_allSelectedDiff[item])
                        array.push($scope.arr_allSelectedDiff[item]);
                }
                $scope.arr_allFinalSelectDiff = array;
                console.info($scope.arr_allFinalSelectDiff);
            }
        };


        /**
         * 批量删除 获取删除id数组方法
         * type 0/1/2 简单/中等/容易
         */
        $scope.fn_deleteSelected = function (type) {
            $scope.arr_allFinalDeleteSelectEasy = [];
            $scope.arr_allFinalDeleteSelectCom = [];
            $scope.arr_allFinalDeleteSelectDiff = [];

            var array = [];

            if (type === 0) {
                for (var item in $scope.arr_allDeleteSelectedEasy) {
                    if ($scope.arr_allDeleteSelectedEasy[item])
                        array.push($scope.arr_allDeleteSelectedEasy[item]);
                }
                $scope.arr_allFinalDeleteSelectEasy = array;
                console.info($scope.arr_allFinalDeleteSelectEasy);
            } else if (type === 1) {
                for (var item in $scope.arr_allDeleteSelectedCom) {
                    if ($scope.arr_allDeleteSelectedCom[item])
                        array.push($scope.arr_allDeleteSelectedCom[item]);
                }
                $scope.arr_allFinalDeleteSelectCom = array;
                console.info($scope.arr_allFinalDeleteSelectCom);
            } else {
                for (var item in $scope.arr_allFinalDeleteSelectDiff) {
                    if ($scope.arr_allFinalDeleteSelectDiff[item])
                        array.push($scope.arr_allFinalDeleteSelectDiff[item]);
                }
                $scope.arr_allDeleteSelectedDiff = array;
                console.info($scope.arr_allDeleteSelectedDiff);
            }
        };




        /**
         * 从全部题目中移入题目 方法
         * type 为题目难易程度  0/1/2 代表 简单/中等/困难
         * @param type
         */
        $scope.fn_removeQuestions = function (type) {

            var http_data = {
                "questionIds": [],
                "isSelect": 1
            };
            if ($scope.arr_allFinalSelectEasy === [] && $scope.arr_allFinalSelectCom === [] && $scope.arr_allFinalSelectDiff === []) {
                $rootScope.fn_show_alertModel(1,"请选择需要移入的题目",1300);
                return;
            }

            if (type === 0) {
                http_data.questionIds = $scope.arr_allFinalSelectEasy.map(Number);
            } else if (type === 1) {
                http_data.questionIds = $scope.arr_allFinalSelectCom.map(Number);
            } else if (type === 2) {
                http_data.questionIds = $scope.arr_allFinalSelectDiff.map(Number);
            }
            $http({
                method: "put",
                url: ajaxService.moveQuestions(),
                data: JSON.stringify(http_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.errorCode == 0) {
                        console.log("移入 " + type + " 成功");
                        $scope.fn_getAll(false);
                        $rootScope.fn_show_alertModel(0,"题目移入成功",1300);
                    }else {
                        console.log("移入 " + type + " 失败");
                        $rootScope.fn_show_alertModel(1,"题目移入失败，请稍后重试",1300);
                    }

                })
                .error(function (response) {
                    console.log("移入 " + type + " 失败");
                    console.log(http_data.questionIds);
                    $rootScope.fn_show_alertModel(2,"题目移入失败，请检查网络",1500);
                });

        };




        /**
         * 从全部题目中删除题目 方法
         * type 为题目难易程度  0/1/2 代表 简单/中等/困难
         * @param type
         */
        $scope.fn_deleteQuestions = function (type) {
            var questionIds = [];
            if ($scope.arr_allFinalDeleteSelectEasy === [] && $scope.arr_allFinalDeleteSelectCom === [] && $scope.arr_allFinalDeleteSelectDiff === []) {
                $rootScope.fn_show_alertModel(1,"请选择需要删除的题目",1300);
                return;
            }

            if (type === 0) {
                questionIds = $scope.arr_allFinalDeleteSelectEasy.map(Number);
            } else if (type === 1) {
                questionIds = $scope.arr_allFinalDeleteSelectCom.map(Number);
            } else if (type === 2) {
                questionIds = $scope.arr_allFinalDeleteSelectDiff.map(Number);
            }
            $http({
                method: "post",
                url: ajaxService.deleteQuestions(),
                data: JSON.stringify({"questionIds":questionIds}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.errorCode == 0) {
                        console.log("移入 " + type + " 成功");
                        $scope.fn_getAll(false);
                        $rootScope.fn_show_alertModel(0,"删除题目成功",1300);

                    }else {
                        console.log("移入 " + type + " 失败");
                        $rootScope.fn_show_alertModel(1,"删除题目失败，请稍后重试",1300);
                    }

                })
                .error(function (response) {
                    console.log("移入 " + type + " 失败");
                    console.log(questionIds);
                    $rootScope.fn_show_alertModel(2,"删除题目失败，请检查网络",1500);
                });


        };


        /**
         * 定义题目对象
         * @type {{}}
         */
        $scope.update_question = {
            "answerA": "",
            "answerB": "",
            "answerC": "",
            "answerD": "",
            "isRight": -1,
            "isSelect": -1,
            "questionLevel": -1,
            "questionTitle": "",
            "questionId": ""
        };


        /**
         * 获取指定题目信息  用于修改
         * @param question
         */
        $scope.fn_getQuestionMessages = function (question) {
            // $scope.update_question = question;
            $scope.update_question.questionId = question.questionId;
            $scope.update_question.questionTitle = question.questionTitle;
            $scope.update_question.questionLevel = question.questionLevel;
            $scope.update_question.isSelect = question.isSelect;
            $scope.update_question.isRight = question.isRight;
            $scope.update_question.answerA = question.answerA;
            $scope.update_question.answerB = question.answerB;
            $scope.update_question.answerC = question.answerC;
            $scope.update_question.answerD = question.answerD;

        };




        /**
         * 修改题目
         */
        $scope.fn_updateQuestion = function () {

            if ($scope.update_question.questionTitle === '') {
                $rootScope.fn_show_alertModel(1,"请输入题目名称",1300);
                return;
            } else if ($scope.update_question.answerA === '') {
                $rootScope.fn_show_alertModel(1,"请输入A选项",1300);
                return;
            } else if ($scope.update_question.answerB === '') {
                $rootScope.fn_show_alertModel(1,"请输入B选项",1300);
                return;
            } else if ($scope.update_question.answerC === '') {
                $rootScope.fn_show_alertModel(1,"请输入C选项",1300);
                return;
            } else if ($scope.update_question.answerD === '') {
                $rootScope.fn_show_alertModel(1,"请输入D选项",1300);
                return;
            }
            $http({
                method: "put",
                url: ajaxService.updateQuestion(),
                data: JSON.stringify($scope.update_question),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.errorCode == 0) {
                        console.log("修改成功");
                        $scope.fn_getAll(false);
                        $rootScope.fn_show_alertModel(0,"修改题目成功",1300);
                        $scope.fn_hide_updateModel();

                    }else {
                        console.log("修改失败");
                        $rootScope.fn_show_alertModel(1,"修改题目失败，请稍后重试",1300);
                    }

                })
                .error(function (response) {
                    console.log("修改失败");
                    $rootScope.fn_show_alertModel(2,"修改题目失败，请检查网络",1500);
                });


        };


        /**
         * 隐藏修改模态窗口
         */
        $scope.fn_hide_updateModel = function() {
            $('#questionUpdateModal').modal('hide');
            $scope.update_question = {
                "answerA": "",
                "answerB": "",
                "answerC": "",
                "answerD": "",
                "isRight": -1,
                "isSelect": -1,
                "questionLevel": -1,
                "questionTitle": "",
                "questionId": ""
            };
        };



    }]);

/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/16
 * Time: 9:19
 */
app.directive('commonLeftMenu', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'html/commonLeftMenu.html',
        scope: {
            selectedNumber: "=",
            allNumber:"="
        },
        controller: ["$scope", "$element", function ($scope, $element) {
            $scope.fn_go_page = function (event, index) {
                event = event || window.event;
                // console.log(document.getElementById("sidebar-menu"));
                // console.log(document.getElementById("sidebar-menu").children[0].children);
                var menu = document.getElementById("sidebar-menu").children[0].children;
                if (index === 0) {
                    angular.element(menu[0].children[0]).addClass('active');
                    angular.element(menu[1].children[0]).removeClass('active');
                    angular.element(menu[2].children[0]).removeClass('active');
                    angular.element(menu[3].children[0]).removeClass('active');
                    window.location.href = '#/selected';
                } else if (index === 1) {
                    angular.element(menu[0].children[0]).removeClass('active');
                    angular.element(menu[1].children[0]).addClass('active');
                    angular.element(menu[2].children[0]).removeClass('active');
                    angular.element(menu[3].children[0]).removeClass('active');
                    window.location.href = '#/all';
                } else if (index === 2) {
                    angular.element(menu[0].children[0]).removeClass('active');
                    angular.element(menu[1].children[0]).removeClass('active');
                    angular.element(menu[2].children[0]).addClass('active');
                    angular.element(menu[3].children[0]).removeClass('active');
                    window.location.href = '#/addNew';
                } else if (index === 3) {
                    angular.element(menu[0].children[0]).removeClass('active');
                    angular.element(menu[1].children[0]).removeClass('active');
                    angular.element(menu[2].children[0]).removeClass('active');
                    angular.element(menu[3].children[0]).addClass('active');
                    window.location.href = 'html/login.html#/login';
                }

            };


        }]
    };
});

/**
 * Created with angularjs
 * User: XYB
 * Date: 2018/8/15
 * Time: 10:33
 */

app.controller('addNewCtrl', ['$scope', '$rootScope', '$http', 'ajaxService'
    , function ($scope, $rootScope, $http, ajaxService) {

        /**
         * 进入新增页面 获取当前已选 和 全部 题目数目
         */
        $rootScope.fn_checkPage();
        $rootScope.fn_getQuestionsNumber(0);
        $rootScope.fn_getQuestionsNumber(1);

        /**
         * 定义新增题目对象
         */
        $scope.add_question = {
            "answerA": "",
            "answerB": "",
            "answerC": "",
            "answerD": "",
            "isRight": 0,
            "isSelect": 0,
            "questionLevel": 0,
            "questionTitle": ""
        };


        /**
         * 新增题目方法
         */
        $scope.fn_addQuestion = function () {
            if ($scope.add_question.questionTitle == "") {
                $rootScope.fn_show_alertModel(1,"请输入题目名称",1300);
                return;
            } else if ($scope.add_question.answerA == "") {
                $rootScope.fn_show_alertModel(1,"请输入A选项",1300);
                return;
            } else if ($scope.add_question.answerB == "") {
                $rootScope.fn_show_alertModel(1,"请输入B选项",1300);
                return;
            } else if ($scope.add_question.answerC == "") {
                $rootScope.fn_show_alertModel(1,"请输入C选项",1300);
                return;
            } else if ($scope.add_question.answerD == "") {
                $rootScope.fn_show_alertModel(1,"请输入D选项",1300);
                return;
            }

            $http({
                method: "post",
                url: ajaxService.addQuestion(),
                data: JSON.stringify($scope.add_question),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    if (response.errorCode == 0) {
                        console.log("添加题目成功");
                        $rootScope.fn_getQuestionsNumber(0);
                        $rootScope.fn_getQuestionsNumber(1);
                        $rootScope.fn_show_alertModel(0,"新增题目成功",1300);
                        $scope.add_question = {
                            "answerA": "",
                            "answerB": "",
                            "answerC": "",
                            "answerD": "",
                            "isRight": 0,
                            "isSelect": 0,
                            "questionLevel": 0,
                            "questionTitle": ""
                        };

                    }
                    else {
                        console.log("添加题目失败");
                        $rootScope.fn_show_alertModel(1,"新增题目失败，请稍后重试",1300);
                    }

                })
                .error(function (response) {
                    console.log("添加题目失败");
                    $rootScope.fn_show_alertModel(2,"新增题目失败，请检查网络",1300);
                });
        };



        $scope.fn_showEcharts = function () {
            var bar_echarts = echarts.init(document.getElementById('bar-echarts'));
            var pie_echarts = echarts.init(document.getElementById('pie-echarts'));
            var option_bar = {

                color: [
                    '#4c56e8',
                    '#72a2e8',
                    '#6084ee',
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    textStyle: {
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 17
                    }
                },
                legend: {
                    data: ['已选题目', '全部题目'],
                    textStyle: {
                        color: '#6084ee',
                        fontWeight: 'bold',
                        fontSize: 15
                    }
                },
                grid: {
                    top: '8%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['简单类型', '中等类型', '困难类型'],
                        axisLine: {
                            lineStyle: {
                                color: '#4c56e8',
                                width:2
                            }
                        },
                        axisLabel:{
                            fontSize:13,
                            fontWeight: 'bold'
                        },
                        axisTick:{
                            show:false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#4c56e8',
                                width:2
                            }
                        },
                        axisLabel:{
                            fontSize:13,
                            fontWeight: 'bold'
                        },
                        axisTick:{
                            show:true,
                            lineStyle:{
                                width:2
                            }

                        }
                    }
                ],
                series: [

                    {
                        name: '已选题目',
                        type: 'bar',
                        // stack: '天然气用量',
                        data: $rootScope.selectedData ,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 3
                            }
                        }
                    },
                    {
                        name: '全部题目',
                        type: 'bar',
                        data: $rootScope.allData,
                        markLine: {
                            lineStyle: {
                                normal: {
                                    type: 'dashed'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 3
                            }
                        }
                    }

                ]
            };
            var option_pie = {

                color: [
                    '#4c56e8',
                    '#72a2e8',
                    '#6084ee',
                ],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    textStyle: {
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 17
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['简单类型','中等类型','困难类型'],
                    textStyle: {
                        color: '#4c56e8',
                        fontWeight: 'bold',
                        fontSize: 14
                    }
                },
                series: [
                    {
                        name:'题目类型',
                        type:'pie',
                        radius: ['50%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:$rootScope.allData[0], name:'简单类型'},
                            {value:$rootScope.allData[1], name:'中等类型'},
                            {value:$rootScope.allData[2], name:'困难类型'}
                        ]
                    }
                ]
            };

            bar_echarts.setOption(option_bar);
            pie_echarts.setOption(option_pie);
        };
        setTimeout(function () {
            $scope.fn_showEcharts();
        },100);

        /**
         *因为有echarts 图表，所以在改变浏览器窗口大小时，要重新加载 才能绘制echarts图
         */
        window.onresize = function() {
            window.location.reload();
        }

    }]);
