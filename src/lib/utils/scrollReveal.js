import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupScrollReveal(root = document) {
	gsap.utils.toArray('.reveal', root).forEach((element) => {
		gsap.from(element, {
			y: 40,
			opacity: 0,
			duration: 0.8,
			scrollTrigger: {
				trigger: element,
				start: 'top 85%'
			}
		});
	});


// // 2. STAGGER animation (inside sections)
// 	gsap.utils.toArray('.reveal-stagger').forEach((container) => {
// 		const items = container.children;

// 		gsap.from(items, {
// 			y: 30,
// 			opacity: 0,
// 			duration: 0.7,
// 			stagger: 0.12,
// 			ease: 'power2.out',
// 			scrollTrigger: {
// 				trigger: container,
// 				start: 'top 80%'
// 			}
// 		});
// 	});
// }

	// 2. Images
	gsap.utils.toArray('.reveal-image', root).forEach((img) => {
		gsap.from(img, {
			scale: 1.1,
			opacity: 0,
			duration: 1,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: img,
				start: 'top 85%'
			}
		});
	});
}