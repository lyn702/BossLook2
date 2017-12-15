let log = console.log.bind(console)
const su = {}

// 获取景区ID
let scene = function() {
    let lujing = location.search.slice(1)
    let scene_id = lujing.split('=')[1]
    // log(scene_id)
    su['scene_id'] = scene_id
    // log(su['scene_id'])
}
scene()

let onshow = function () {
    let storage = window.localStorage
    let boss = storage['nickname']
    log(boss)
    let t = `
    <div class="infos">
        <img id="tupian" src="image/u137.png" alt="">
        <div class="info">
            <div class="people">管理员</div>
            <div class="tel">${boss}</div>
        </div>
    </div>
    `
    su.html = t
    // log(su.html)
    $('.infos').html(su.html)
}
onshow()


// 点击返回
$('.goback').on('click', function() {
    let scene_id = su['scene_id']
    // log(scene_id)
    window.location = `information.html?scene_id=${scene_id}`
})

// 点击退出
$('.btn').on('click', function() {
    // window.confirm()
    // alert('是否确认退出')
    localStorage.removeItem('isAutoLogin')
    localStorage.removeItem('password')
    window.location = `index.html`
})
