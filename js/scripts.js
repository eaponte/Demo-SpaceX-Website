const btn = document.getElementById('menu-btn');
// const overlay = document.getElementById('overlay');
const navList = document.getElementById('nav-list');
const sideNav = document.getElementById('side-nav');
const counters = document.querySelectorAll('.counter');
const countersContainer = document.getElementById('stats');

// Side Nav Open/Close
const navToggle = () => {
	btn.classList.toggle('open');
	// overlay.classList.toggle('show');
	document.body.classList.toggle('no-scroll');
	navList.classList.toggle('open');
	sideNav.classList.toggle('open');
}

btn.addEventListener('click', navToggle);

/***** Counters ******/

// Increment Stats Counter
const countUp = () => {
	counters.forEach((counter) => {

		// set counter span text to 0
		counter.innerText = '0';

		const updateCounter = () => {
			// get counter total
			const total = +counter.getAttribute('data-total');

			// get current counter value, + converts to number
			const c = +counter.innerText;

			// create an increment
			const increment = Math.ceil(total / 100);

			// if counter is less than total, add increment amount by 2
			if(c < total && total > 0) {
				counter.innerText = c + increment;
				setTimeout(updateCounter, 15);
			} else {
				// if increment sets it higher than total, then set it back down to total at the end
				counter.innerText = total;
			}
		};

		updateCounter();

	});
}

// Reset counters to 0

const resetCounters = () => {
	counters.forEach((counter) => {
		// set counter span text to 0
		counter.innerText = '0';
	});
}

// Check if counters are in viewport

const isInViewport = (el) => {
	const rect = el.getBoundingClientRect();
	return (
		// rect.top >= 0 &&
		// rect.left >= 0 &&
		// rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		// rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		rect.top >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

let isCounterDone = false;

document.addEventListener('scroll', () => {
	if (isInViewport(countersContainer) && !isCounterDone) {
		countUp();
		isCounterDone = true; // prevents counter from running everytime scrolling takes place
	} else if (!isInViewport(countersContainer) && isCounterDone){ // reset to 0 when off screen, so it runs again when back in viewport
		resetCounters();
		isCounterDone = false;
	}
});

/***** End Counters ******/


// Copyright Year
document.getElementById("year").innerHTML = new Date().getFullYear();
