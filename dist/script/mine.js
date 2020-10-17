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




  const contentAccordion = document.querySelectorAll('.content-accordion');
  const contentAccordionBlock = document.querySelectorAll('.content-accordion__block');

  for (let i = 0; i < contentAccordion.length; i++) {
	contentAccordion[i].addEventListener("click", function () {
		let block = this.nextElementSibling;

		if (block.style.maxHeight === block.scrollHeight + "px") {
			block.style.maxHeight = 0;
			this.classList.remove('avtive-accordion');
			this.style.textAlign = 'left';
			this.style.fontWeight = 'normal';
        } else {
			block.style.maxHeight = block.scrollHeight + "px";
			this.classList.add('avtive-accordion');
			this.style.textAlign = 'center';
			this.style.fontWeight = 'bold';
        }
	});
  };