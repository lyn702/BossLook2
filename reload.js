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
