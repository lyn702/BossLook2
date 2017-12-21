let log = console.log.bind(console)
const su = {}

// 获得景区ID
let scene = function() {
    let lujing = location.search.slice(1)
    // log(lujing)
    let scene_id = lujing.split('=')[1]
    // log(scene_id)
    su['scene_id'] = scene_id
    // log(su['scene_id'])
}
scene()

// 金额，园区显示（今日数据）
let today_xinxi = function () {
    let request = ({
        url: "http://120.79.12.95/newapi/Wxbossboard/incomeOfChannels",
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
            su.html = ''
            if (res.result === 0) {
                let infos = res.infos
                for (var i = 0; i < infos.length; i++) {
                    let info = infos[i]
                    let channel = info.channel_name
                    let money = info.total_income_today
                    let id = info.channel_id
                    let today_new = info.new_members_today
                    // log(channel, money, id)
                    let t = `
                    <div id='${id}' class="tongdao">
                        <div class="channel_name">${channel}</div>
                        <div class="money">￥${money}</div>
                        <div class="firstline">
                            <div class="name">核销单数</div>
                            <div class="name">新增会员</div>
                        </div>
                        <div class="secondline">
                            <div class="number-1">单数</div>
                            <div class="number-2">${today_new}</div>
                        </div>
                    </div>
                    `
                    su.html = su.html + t
                    // log(su.html)
                    if (i === infos.length - 1) {
                        $('.xm').html(su.html)
                    }
                    $('.tongdao').on('click', function() {
                        let scene_id = su['scene_id']
                        // alert('点击')
                        window.location = `info.html?scene_id=${scene_id}`
                    })
                }
            }
        }
    })
    $.ajax(request)
}

// 核销数目显示（今日数据）
let today_shouru = function () {
    let request = ({
        url: "http://120.79.12.95/newapi/Wxbossboard/incomeAndVisitor",
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
            // su.html = ''
            if (res.result === 0) {
                let money = res.info.today_income
                let people = res.info.today_visitors
                let order = res.info.today_orders
                let todayzj = res.info.today_count
                // log(su['order'])
                log(money, people, order)
                let t = `
                    <div class="number-1">${order}</div>
                    <div class="number-2">${todayzj}</div>
                `
                su.html =  t
                $('.secondline-all').html(su.html)
            }
        }
    })
    $.ajax(request)
}

// 新增人数显示（今日数据）
// let people_count = function () {
//     let request = ({
//         url: "http://120.79.12.95/newapi/Wxbossboard/newIncreaseMemberCount",
//         data: {
//             // "action": 'incomeAndvisitor',
//             "scene_id": su['scene_id'],
//         },
//         header: {
//             "Content-Type": "application/json"
//         },
//         method: 'POST',
//         success: function(res) {
//             log(res)
//             if (res.result === 0) {
//                 let todayzj = res.infos.today_count
//                 let t = `
//                 <div class="number-2">${todayzj}</div>
//                 `
//                 su.html =  t
//                 $('.secondline-all').html(su.html)
//             }
//         }
//     })
//     $.ajax(request)
// }
// people_count()

// 金额，园区显示（本月数据）
let month_xinxi = function () {
    let request = ({
        url: "http://120.79.12.95/newapi/Wxbossboard/incomeOfChannels",
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
            su.html = ''
            if (res.result === 0) {
                let infos = res.infos
                for (var i = 0; i < infos.length; i++) {
                    let info = infos[i]
                    let channel = info.channel_name
                    let money = info.total_income_month
                    let id = info.channel_id
                    let month_new = info.new_members_month
                    // log(channel, money, id)
                    let t = `
                    <div class="tongdao">
                        <div class="channel_name">${channel}</div>
                        <div class="money">￥${money}</div>
                        <div class="firstline">
                            <div class="name">核销单数</div>
                            <div class="name">新增会员</div>
                        </div>
                        <div class="secondline">
                            <div class="number-1">单数</div>
                            <div class="number-2">${month_new}</div>
                        </div>
                    </div>
                    `
                    su.html = su.html + t
                    if (i === infos.length - 1) {
                        $('.xm').html(su.html)
                    }
                    $('.tongdao').on('click', function() {
                        alert('点击')
                    })
                }
            }
        }
    })
    $.ajax(request)
}

// 核销数目显示（本月数据）
let month_shouru = function () {
    let request = ({
        url: "http://120.79.12.95/newapi/Wxbossboard/incomeAndVisitor",
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
            // su.html = ''
            let money = res.info.month_income
            let people = res.info.month_visitors
            let order = res.info.month_orders
            let monthzj = res.info.month_count
            log(money, people, order)
            let t = `
                <div class="number-1">${order}</div>
                <div class="number-2">${monthzj}</div>
            `
            su.html =  t
            $('.secondline-all').html(su.html)
        }
    })
    $.ajax(request)
}

// 页面初始显示今日数据
let onshow = function () {
    today_xinxi()
    today_shouru()
}
onshow()

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
    onshow()
})

  // 点击本月数据
 $('.month').on('click', function() {
     log('本月数据')
     $('.today').removeClass('click')
     $('.month').addClass('click')
     month_xinxi()
     month_shouru()
 })
