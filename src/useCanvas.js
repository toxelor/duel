import { useRef, useEffect } from 'react'



const useCanvas = draw => {
	const ref = useRef()

	useEffect(() => {
		const ctx = ref.current.getContext("2d");
		let animationID
		const render = () => {
			draw(ctx)
			animationID = window.requestAnimationFrame(render)
		}
		render()

		return () => window.cancelAnimationFrame(animationID)
	}, [draw])
	
    return ref
}

export default useCanvas;
