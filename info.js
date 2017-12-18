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
