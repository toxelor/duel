import styles from './HeroMenu.module.css'
function HeroMenu ({Hero1, Hero2, setHero1, setHero2, showing, chosenHero}) {

    const handleChange = e => {
        if (chosenHero === 1) {
            setHero1({
                firerate: Hero1.firerate,
                color: e.target.value,
                speed: Hero1.speed,
                startX: Hero1.x,
                startY: Hero1.y,
                direction: Hero1.direction,
            })
            setHero2({
                firerate: Hero2.firerate,
                color: Hero2.color,
                speed: Hero2.speed,
                startX: Hero2.x,
                startY: Hero2.y,
                direction: Hero2.direction,
            })
        } else {
            setHero1({
                firerate: Hero1.firerate,
                color: Hero1.color,
                speed: Hero1.speed,
                startX: Hero1.x,
                startY: Hero1.y,
                direction: Hero1.direction,
            })
            setHero2({
                firerate: Hero2.firerate,
                color: e.target.value,
                speed: Hero2.speed,
                startX: Hero2.x,
                startY: Hero2.y,
                direction: Hero2.direction,
            })
        }
        
    }

    return (
        <div style={{opacity: showing, right: chosenHero === 2 && 10, left: chosenHero === 1 && 10}} className={ styles.wrapper }>
            <p>
                Выберите цвет заклинания для героя №{chosenHero === 1 ? 1 : 2}:
            </p>
            <input value={chosenHero === 1 ? Hero1.color : Hero2.color} type="color" onChange={handleChange} />
        </div>
    )
}

export default HeroMenu