
// import header from './modules/header'
import reviews from './modules/reviews'
import accordion from './modules/accordion'
import history from './modules/history'
import gallery from './modules/gallery'
import notification from './modules/notification'
import clickforward from './modules/clickforward'
import smsdeeplink from './modules/smsdeeplink'
import mouldPackages from './modules/mouldPackages'

document.addEventListener('DOMContentLoaded', function () {
	
	// header()
	reviews()
	accordion()
	history()
	gallery()
	notification()
	clickforward()
	smsdeeplink()
	mouldPackages()

	// AOS.init({
	// 	offset: 80,
	// 	duration: 200,
	// 	easing: 'ease-in',
	// 	once: true,
	// });
})

