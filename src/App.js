import { useEffect, useRef, useState} from 'react';
import HeroMenu from './HeroMenu/HeroMenu';
import useCanvas from './useCanvas';
import styles from './App.module.css'


function App() {
	let mouseX = 10000
	let mouseY = 10000
	const [firstHit, setFirstHit] = useState(0)
	const [secondHit, setSecondHit] = useState(0)
	const [showing, setShowing] = useState(0)
	const [chosenHero, setChosenHero] = useState(1)
	const [firstFirerate, setFirstFirerate] = useState(1)
	const [firstSpeed, setFirstSpeed] = useState(1)
	const [secondFirerate, setSecondFirerate] = useState(1)
	const [secondSpeed, setSecondSpeed] = useState(1)

	const [firstHero, setFirstHero] = useState({
													firerate: 5, 
													color: "#000000", 
													speed: 2, 
													startX: 150, 
													startY: 100,
													direction: 1
												})
	const [secondHero, setSecondHero] = useState({
													firerate: 5, 
													color: "#C49818", 
													speed: 2, 
													startX: 986, 
													startY: 500,
													direction: -1
												})

	const rememberFirstHero = () => {
		setFirstHero({
			firerate: Hero1.firerate, 
			color: Hero1.color, 
			speed: Hero1.speed, 
			startX: Hero1.x,
			startY: Hero1.y, 
			direction: Hero1.direction
		})
	}

	const rememberSecondHero = () => {
		setSecondHero({
			firerate: Hero2.firerate, 
			color: Hero2.color, 
			speed: Hero2.speed, 
			startX: Hero2.x,
			startY: Hero2.y, 
			direction: Hero2.direction
		})
	}

	const rememberHeroes = () => {
		rememberFirstHero()
		rememberSecondHero()
	}

	useEffect(() => {
		const canvas = document.querySelector('canvas')

		canvas.addEventListener('mousemove', (e) => {
			mouseX = e.pageX - canvas.offsetLeft
			mouseY = e.pageY - canvas.offsetTop
		}, {
			capture: true
		})
		canvas.addEventListener('click', () => {
			if (((mouseY > Hero1.y - 50) && (mouseY < Hero1.y + 50)) && ((mouseX > Hero1.x - 50) && (mouseX < Hero1.x + 50))) {
				if (chosenHero === 2 && showing === 1){
					setChosenHero(1)
				} else {
					setShowing(showing === 0 ? 1 : 0)
					setChosenHero(1)
				}
				rememberHeroes()
			}
			if (((mouseY > Hero2.y - 50) && (mouseY < Hero2.y + 50)) && ((mouseX > Hero2.x - 50) && (mouseX < Hero2.x + 50))) {
				if (chosenHero === 1 && showing === 1){
					setChosenHero(2)
				} else {
					setShowing(showing === 0 ? 1 : 0)
					setChosenHero(2)
				}
				rememberHeroes()
			}
		})
	})

	

	
	class Spell {
		speed = 5
		constructor(color, startX, startY, direction) {
			this.color = color
			this.x = startX
			this.y = startY
			this.direction = direction
		}
		drawSpell = (ctx, i) => {
			ctx.fillStyle = this.color;
			circle(ctx, this.x, this.y, 10)
			if (this.x + (this.speed * this.direction) > ctx.canvas.width || this.x + (this.speed * this.direction) < 0) {
				if (this.direction === 1) {
					hero1Spells.splice(i, 1)
				} else {
					hero2Spells.splice(i, 1)
				}
			}
			if (((this.y > Hero2.y - 30) && (this.y < Hero2.y + 30)) && ((this.x > Hero2.x - 25) && (this.x < Hero2.x + 25)) && this.direction === 1) {
				setSecondHit(secondHit + 1)
				hero1Spells.splice(i, 1)
				rememberHeroes()
			} 
			if (((this.y > Hero1.y - 30) && (this.y < Hero1.y + 30)) && ((this.x > Hero1.x - 25) && (this.x < Hero1.x + 25)) && this.direction === -1) {
				setFirstHit(firstHit + 1)
				hero2Spells.splice(i, 1)
				rememberHeroes()
			}
			this.x += this.speed * this.direction;
		}
	}

	class Hero {
		constructor(firerate, color, speed, startX, startY, direction) {
			this.firerate = firerate
			this.color = color
			this.speed = speed
			this.x = startX
			this.y = startY
			this.direction = direction
		}
		draw = (ctx) => {
			ctx.fillStyle = "#96daea";
			circle(ctx, this.x, this.y, 50)
			if ((this.y + this.speed + 30 > ctx.canvas.height || this.y + this.speed - 30 < 0)) {
				this.speed = -this.speed
			} else if (((this.y - 48 > mouseY ) && (this.y - 52 < mouseY)) && ((this.x > mouseX - 25) && this.x < mouseX + 25) && (this.speed < 0)) {
				this.speed = -this.speed
			} else if (((this.y + 52 > mouseY) && (this.y + 48 < mouseY)) && ((this.x > mouseX - 25) && this.x < mouseX + 25) && (this.speed > 0)) {
				this.speed = -this.speed
			}
			this.y += this.speed;
		}
	}

	
	const Hero1 = new Hero(firstHero.firerate, firstHero.color, firstHero.speed, firstHero.startX, firstHero.startY, firstHero.direction)

	const Hero2 = new Hero(secondHero.firerate, secondHero.color, secondHero.speed, secondHero.startX, secondHero.startY, secondHero.direction)

	console.log(Hero1)
	console.log(Hero2)

	//const newSpell = new Spell("", 100, 200 + 10, 1)
	
	const circle = (ctx, x,y,r) => {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}

	const clear = (ctx) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	}

	const hero1Spells = firstSpells
	const hero2Spells = secondSpells

	setInterval(() => {
		hero1Spells.push(new Spell(Hero1.color, Hero1.x + 50, Hero1.y, 1))
	}, Math.floor(2000 / Hero1.firerate))

	setInterval(() => {
		hero1Spells.push(new Spell(Hero2.color, Hero2.x - 50, Hero2.y, -1))
	}, Math.floor(2000 / Hero2.firerate))
	
 
	const draw = (ctx) => {
		clear(ctx)
		Hero1.draw(ctx)
		Hero2.draw(ctx)
		hero1Spells.map((spell, i) => spell.drawSpell(ctx, i))
		hero2Spells.map((spell, i) => spell.drawSpell(ctx, i))
	}

	const change = () => {
		let speed1 = 2 * firstSpeed
		let speed2 = 2 * secondSpeed
		let firerate1 = 5 * firstFirerate
		let firerate2 = 5 * secondFirerate
		setFirstHero({
			firerate: firerate1, 
			color: Hero1.color, 
			speed: speed1, 
			startX: Hero1.x,
			startY: Hero1.y, 
			direction: Hero1.direction
		})
		setSecondHero({
			firerate: firerate2, 
			color: Hero2.color, 
			speed: speed2, 
			startX: Hero2.x,
			startY: Hero2.y, 
			direction: Hero2.direction
		})
	}

	
	const ref = useCanvas(draw)

	return (
		<div className={styles.App}>
			<div className={styles.points_div}>
				<span className={styles.points}>
					{secondHit} : {firstHit} 
				</span>
			</div>
			
			<div className={styles.canvas_block}>
				<div className={styles.settings}>
					<div className={styles.setting}>
						<label for='firerate1'>Скорость стрельбы</label>
						<input className={styles.range} value={firstFirerate} min={0.01} max={2} step={0.02} id='firerate1' type='range' onChange={(e) => {
							setFirstFirerate(e.target.value)
							change()
						}}/>
					</div>
					<div className={styles.setting}>
						<label for='speed1'>Скорость передвижения</label>
						<input value={firstSpeed} min={0.01} max={2} step={0.02} id='speed1' type='range' onChange={(e) => {
							setFirstSpeed(e.target.value)
							change()
						}}/>
					</div>
					
				</div>
				
				<canvas ref={ref} className={styles.canvas} id="canvas" width={window.innerWidth - 400} height="590px" />

				<div className={styles.settings}>
					<div className={styles.setting}>
						<label for='firerate2'>Скорость стрельбы</label>
						<input value={secondFirerate} min={0.01} max={2} step={0.02} id='firerate2' type='range' onChange={(e) => {
							setSecondFirerate(e.target.value)
							change()
						}}/>
					</div>
					<div className={styles.setting}>
						<label for='speed2'>Скорость передвижения</label>
						<input value={secondSpeed} min={0.01} max={2} step={0.02} id='speed2' type='range' onChange={(e) => {
							setSecondSpeed(e.target.value)
							change()
						}}/>
					</div>
					
				</div>
			</div>
			


			<HeroMenu Hero1={Hero1} Hero2={Hero2} setHero1={setFirstHero} setHero2={setSecondHero} showing={showing} chosenHero={chosenHero}/>

		</div>
	);
}

export default App;
