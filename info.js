let log = console.log.bind(console)
const su = {}

// 获得景区ID
let scene = function() {
    let lujing = location.search.slice(1)
    let scene_id = lujing.split('=')[1]
    // log(scene_id)
    su['scene_id'] = scene_id
    // log(su['scene_id'])
}
scene()

let ceshi = function () {
    let request = ({
        url: "https://leyuanxing.net/newapi/Wxbossboard/salesOfOneChannel",
        data: {
            // "action": 'incomeAndvisitor',
            "scene_id": 1,
        },
        header: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        success: function(res) {
            log(res)
            su.html = ''
            if (res.result === 0) {
                let infos = res.infos
                for (var i = 0; i < infos.length; i++) {
                    let info = infos[i]
                    log(info)
                    let channel = info.channel_name
                    let t = `
                    <div class="channel">
                        <div class="channel_name">${channel}</div>
                        <div class="channel_bilv">比率</div>
                    </div>
                    `
                    su.html = su.html + t
                    if (i === infos.length - 1) {
                        $('.info-2').html(su.html)
                    }
                }
            }
        }
    })
    $.ajax(request)
}
ceshi()

let liebiao = function() {
    myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
        title: {
            // text: '测试\n例子',
            textStyle: {
                color: '#000000',
                fontWeight: 'bold',
            },
        },
        tooltip: {},
        legend: {
            // data:['销量'],
        },
        grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
        },
        xAxis: {},
        yAxis: {
            data: ["水上乐园","水上世界01","某某世界01","某某世界02","陆地世界","什么世界","还有什么"]
        },
        series: [{
            name: '销量',
            type: 'bar',
            data: [50, 200, 360, 100, 150, 220, 180],
            color: '#000000',
            textStyle: {
                fontSize: 50,
                fontWeight: 'bold',
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                }
            }
        }]
    };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}
// liebiao()


// 点击返回按钮
$('.back').on('click', function() {
    let scene_id = su['scene_id']
    // log(scene_id)
    window.location = `information.html?scene_id=${scene_id}`
})

// 点击图片进入退出界面
$('#backimage').on('click', function() {
    let scene_id = su['scene_id']
    log(scene_id)
    window.location = `reload.html?scene_id=${scene_id}`
})

// 点击今日数据
$('.today').on('click', function() {
  log('今日数据')
  $('.month').removeClass('click')
  $('.today').addClass('click')
})

// 点击本月数据
$('.month').on('click', function() {
   log('本月数据')
   $('.today').removeClass('click')
   $('.month').addClass('click')
})
