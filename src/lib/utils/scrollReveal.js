import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// For Sections
export function setupScrollReveal(root = document) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
	gsap.utils.toArray('.reveal', root).forEach((element) => {
		gsap.from(element, {
			y: 40,
			opacity: 0,
			duration: 0.5,
			scrollTrigger: {
				trigger: element,
				start: 'top 85%',
			},
		})
	})

	// For Images
	gsap.utils.toArray('.reveal-image', root).forEach((img) => {
		gsap.from(img, {
			scale: 1.1,
			opacity: 0,
			duration: 0.5,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: img,
				start: 'top 85%',
			},
		})
	})
}
