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

// 金额，园区显示（今日数据）
let today_xinxi = function () {
    let request = ({
        url: "https://leyuanxing.net/newapi/Wxbossboard/incomeOfChannels",
        data: {
            // "action": 'incomeAndvisitor',
            "scene_id": su['scene_id'],
        },
        header: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        success: function(res) {
            log(res)
            if (res.result === 0) {
                let infos = res.infos
                for (var i = 0; i < infos.length; i++) {
                    let info = infos[i]
                    let channel = info.channel_name
                    let money = info.total_income_today
                    log(channel, money)
                    let t = `
                    <div class="tongdao">
                        <div class="channel_name">${channel}</div>
                        <div class="money">￥${money}</div>
                        <div class="firstline">
                            <div class="name">核销单数</div>
                            <div class="name">单笔均额</div>
                        </div>
                        <div class="secondline">
                            <div class="number-1">单数</div>
                            <div class="number-2">均额</div>
                        </div>
                    </div>
                    `
                    su.html = su.html + t
                    if (i === infos.length - 1) {
                        $('.xm').html(su.html)
                    }
                }
            }
        }
    })
    $.ajax(request)
}
today_xinxi()

// 核销数目显示
let today_shouru = function () {
    let request = ({

    })
}
