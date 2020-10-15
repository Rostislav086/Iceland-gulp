var mySwiper = new Swiper('.swiper-container', {
	// Optional parameters
	loop: true,
	autoplay: {
		delay: 5000,
	  },
	  speed: 4000,

	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
  });

  mySwiper.init();

  let routeSwiper = new Swiper('.swiper-route', {
	loop: true,
	// autoplay: {
	// 	delay: 2000,
	//   },
  });

  routeSwiper.init();