let log = console.log.bind(console)
const su = {}


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
