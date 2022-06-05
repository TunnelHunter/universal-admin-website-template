$(function(){


    //$.ajax({
    //    type: 'POST',
    //    url: 'http://192.168.1.199:8080/GCPI/sysconfig/devicedetail',
    //    data: '{}',
    //    success: function (response) {
    //        if( response.error_code == 0 ){
    //
    //
    //        }else{
    //
    //        }
    //    },
    //    dataType: 'json'
    //});

    var response = {
        "data": {
            "bottomLinks":[
                {"source":"回液泵","target":"test1"},
                {"source":"供液泵","target":"test1"},
                {"source":"入气风机","target":"test1"},
                {"source":"补光灯2","target":"test1"},
                {"source":"补光灯1","target":"test1"}],
            "node":[
                {"id":"cb21c80e-9467-42fc-ae15-49a6f1772884","level":0,"name":"叶菜工厂","type":"factory"},
                {"id":"7bdcae08-7071-4d84-b999-fc782b5d7baa","level":0,"name":"果菜工厂","type":"factory"},
                {"id":"69a8fb68-ec63-49bd-a674-bbd59cf201b1","level":1,"name":"回液泵","type":"exeunit"},
                {"id":"6819904e-5a92-4dd9-93f6-1e359ea85334","level":1,"name":"供液泵","type":"exeunit"},
                {"id":"4acdb79d-fa4e-43df-8e7e-43e13efb217f","level":1,"name":"入气风机","type":"exeunit"},
                {"id":"5e9f8f5c-30c2-4953-8169-dd62ee0de446","level":1,"name":"补光灯2","type":"exeunit"},
                {"id":"4547916d-9702-48eb-94fd-8f699b0befdb","level":1,"name":"补光灯1","type":"exeunit"},
                {"id":"e6793610-73eb-41bb-8998-fea4dc526e55","level":2,"name":"test1","type":"com"},
                {"id":"946f8fd9-627a-4694-9350-9f2378ec3ce6","level":2,"name":"test1","type":"com"}
            ],
            "topLinks": [
                {"source":"回液泵","target":"叶菜工厂"},
                {"source":"供液泵","target":"叶菜工厂"},
                {"source":"入气风机","target":"叶菜工厂"},
                {"source":"补光灯2","target":"叶菜工厂"},
                {"source":"补光灯1","target":"叶菜工厂"}
            ]
        },
        "error_code":0
    };
    //var response = JSON.parse(response_);

    var allNode = response.data.node;
    var arr_1 = response.data.topLinks;
    var arr_2 = response.data.bottomLinks;
    //var allLink = arr_1.concat.apply(arr_1, arr_2);

    var arr_level = [
        {
        name: '节点1',
        x: 300,
        y: 300
    }, {
        name: '节点2',
        x: 800,
        y: 300
    }, {
        name: '节点3',
        x: 550,
        y: 100
    }, {
        name: '节点4',
        x: 550,
        y: 500
    }];

    var allLink = [
        {
        source: '节点2',
        target: '节点1'
    }, {
        source: '节点1',
        target: '节点3'
    }, {
        source: '节点2',
        target: '节点3'
    }, {
        source: '节点2',
        target: '节点4'
    }, {
        source: '节点1',
        target: '节点4'
    }];

    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: ''
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 80, //红色圆形的宽高
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data:arr_level,
                links: allLink,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    //    console.log( option.series[0].data );
    myChart.on('click', function (params) {
        if (params.componentType === 'markPoint') {
            // 点击到了 markPoint 上
            if (params.seriesIndex === 5) {
                // 点击到了 index 为 5 的 series 的 markPoint 上。
            }
        }
        else if (params.componentType === 'series') {
            if (params.seriesType === 'graph') {
                if (params.dataType === 'edge') {
                    // 点击到了 graph 的 edge（边）上。
                }
                else {
                    // 点击到了 graph 的 node（节点）上。 params.name得到节点的name
                    console.log(params.name);
                    var ajax_id = '';
                    for(var i= 0,len=arr_level_1.length;i<len;i++){
                        if( params.name == arr_level_1[i].name ){
                            ajax_id = arr_level_1[i].id;
                            break;
                        }
                    }
                    console.log( ajax_id );
                }
            }
        }

    });







});

