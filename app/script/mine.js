var mySwiper = new Swiper('.swiper-container', {
	// Optional parameters
	loop: true,
	autoplay: {
		delay: 5000,
	  },
	  speed: 4000,

	// Navigation arrows
  });

  mySwiper.init();

  let routeSwiper = new Swiper('.swiper-route', {
	loop: false,
	speed: 2000,
	hideOnClick: true,
	navigation: {
		nextEl: '.route-button-next',
		prevEl: '.route-button-prev',
	  },
  });

  routeSwiper.init();