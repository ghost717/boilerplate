/**
 *
 * @project        aioJS
 * 
 * @description    Animates elements usig CSS transitions.
 * @author         Michał Gwóźdź - thesigner
 * @version        2.0
 */
let observer;

let ms = 'ms';

let options = {
	root: null,
	rootMargin: "-20px",
	selector: '[data-sel]',
	once: false,
	disabled: false,
	speed: null,
	delay: null,
	disabled: false,
};

let items = document.querySelectorAll(options.selector);

/**
 * @description Sets basic css transition properties
 */
function init(settings) {
	if (settings !== options) {
		options = {
			...options,
			...settings,
		};
	}
	items.forEach(function (item) {
		createObserver(item);

		let speed = (options.speed !== null) ? options.speed + ms : item.getAttribute('data-sel-speed') + ms;
		let delay = (options.delay !== null) ? options.speed + ms : item.getAttribute('data-sel-delay') + ms;
		item.style.animationDuration = speed;
		item.style.animationDelay = delay;
	});
}

function animate(item) {

}

function createObserver(element) {
	observer = new IntersectionObserver(handleIntersect, options);
	observer.observe(element);
}

function handleIntersect(items, observer) {
	items.forEach(function (item) {
		let animation = item.target.getAttribute('data-sel');

		if (item.isIntersecting == true && options.disabled == false) {
			item.target.classList.add(animation);
		} else if (once === true) {
			item.target.classList.remove(animation);
		}
	});
}

window.addEventListener("load", function (event) {
	init();
}, false);