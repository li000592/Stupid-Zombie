import { World, Cube, Model, OrbitCamera, useLoop, Skybox, SkyLight, FirstPersonCamera } from "lingo3d-react"
import { useState, useRef } from "react"

function App() {
  let [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  let [walking, setWalking] = useState(false)
  let [zombieStatus, updateZombieStatus] = useState('Idle')

  let modelRef = useRef()

  let handleClick = (ev) => {
    ev.point.y = 0
    setPosition(ev.point)
    setWalking(true)
    updateZombieStatus("run")

    let model = modelRef.current
    model.lookAt(ev.point)
  }

  let handleIntersect = () => {
    setWalking(false)
    updateZombieStatus("idle")
  }

  useLoop(() => {
    let model = modelRef.current
    model.moveForward(-1)

  }, walking)

  const handleAnswerChange = ev => {
    if(ev.key === 'y'){
			alert('The sky is your starting point!')
	  }
		else if (ev.key === 'n') {
			alert('The sky is your limit👀')
	  }
  }

  return (
    <World  >
      <Skybox texture="sky.webp" />
      <Cube width={9999} depth={9999} y={-100} onClick={handleClick} texture="ground.jpeg" onKeyPress={handleAnswerChange} onKeyDown={ev=>console.log(ev)}/>
      <SkyLight color="yellow"  intensity={0.5}/>
      <Model
       ref={modelRef}
       src="zombie.fbx"
       animations={{ idle: "Idle.fbx", run: "Run.fbx", jump: "Jump.fbx" }}
       animation={zombieStatus}
       intersectIDs={["orangeBox"]}
       onIntersect={handleIntersect}
      />
      <OrbitCamera active z={300} />
      <Cube id="orangeBox" scale={0.5} color="orange" x={position.x} y={position.y} z={position.z} visible={false} />
    </World>
  )
}

export default App
