"use client"

import Matter, { Mouse, MouseConstraint, Vector } from "matter-js"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const DROP_INTERVAL = 3500 //ms
const STATIC_DENSITY = 15
const PARTICLE_SIZE = 7
const PARTICLE_BOUNCYNESS = 1.47 //1.47 gives no loss of energy and adds a bit of velocity every bounce
const LINE_THICKNESS = 4 //min 3 or lose collision detection

export default function Page() {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [constraints, setContraints] = useState<DOMRect>()
  const [scene, setScene] = useState<{
    render: Matter.Render
    engine: Matter.Engine
  }>()

  const handleResize = () => {
    if (!boxRef.current) return
    setContraints(boxRef.current.getBoundingClientRect())
  }

  // Create the scene
  useEffect(() => {
    const Engine = Matter.Engine
    const Render = Matter.Render
    const World = Matter.World
    const Bodies = Matter.Bodies

    const engine = Engine.create({})

    const render = Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        background: "transparent",
        wireframes: false,
      },
    })

    // const mouse = Mouse.create(render.canvas)
    // const mouseConstraint = MouseConstraint.create(engine, {
    //   mouse,
    //   constraint: {
    //     stiffness: 0.8,
    //   },
    // })
    // render.mouse = mouse

    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: "blue",
      },
    })

    World.add(engine.world, [floor])

    Matter.Runner.run(engine)
    Render.run(render)

    if (boxRef.current) {
      setContraints(boxRef.current.getBoundingClientRect())
    }
    setScene({ render, engine })

    window.addEventListener("resize", handleResize)
  }, [])

  //handle window resize event cleanup
  useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Update the scene size on resize
  useEffect(() => {
    if (constraints && scene) {
      const { width, height } = constraints

      // Dynamically update canvas and bounds
      scene.render.bounds.max.x = width
      scene.render.bounds.max.y = height
      scene.render.options.width = width
      scene.render.options.height = height
      scene.render.canvas.width = width
      scene.render.canvas.height = height

      // Dynamically update floor //TODO: loop through scene and move everything
      const floor = scene.engine.world.bodies[0]

      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + STATIC_DENSITY / 2,
      })

      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ])
    }
  }, [scene, constraints])

  // Add a new "ball" everytime `someStateValue` changes
  useEffect(() => {
    if (!scene || !constraints) return
    const interval = setInterval(() => {
      const { width, height } = constraints
      // const randomX = Math.floor(Math.random() * -width) + width //? Random X position for ball spawn
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(width / 2, -PARTICLE_SIZE, PARTICLE_SIZE, {
          restitution: PARTICLE_BOUNCYNESS,
          render: {
            fillStyle: "white",
          },
        }),
      )
      // const line = Matter.Bodies.rectangle(
      //   width / 2,
      //   height / 2,
      //   width / 5,
      //   LINE_THICKNESS,
      //   {
      //     isStatic: true,
      //     angle: Math.PI / 4,
      //     render: {
      //       fillStyle: "white",
      //     },
      //   },
      // )
      // Matter.World.add(scene.engine.world, line)
    }, DROP_INTERVAL)
    return () => clearInterval(interval)
  }, [constraints, scene])

  // Freeze the canvas when the window is not focused

  return (
    <>
      <div className="flex h-screen w-screen cursor-crosshair items-center justify-center">
        <motion.div
          initial={{
            opacity: 1,
            scale: 1,
            transform: "translateY(-200px) translateX(-50%)",
          }}
          animate={{
            opacity: 0,
            transform: "translateY(300px) translateX(-50%)",
            scale: 0.5,
          }}
          transition={{ delay: DROP_INTERVAL / 1000, duration: 1.5 }}
          className="fixed top-1/2 left-1/2 z-50 text-9xl font-extrabold"
        >
          Ball Drop
        </motion.div>
        <div className="relative h-screen w-screen border border-black bg-black p-2">
          <div
            ref={boxRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          >
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    </>
  )
}
