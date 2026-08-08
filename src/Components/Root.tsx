import { useCallback, useRef } from "react"
import { useIndicatorsQuery, useStateQuery } from "../Redux/apiSlice/apiSlice"
import { Layer, Stage } from "react-konva"
import type { KonvaEventObject } from "konva/lib/Node"
import type { Konva } from "konva/lib/_FullInternals"
import { ArtificialHorizon } from "./ArtificalHorizon/ArtificalHorizon"
import { VerticalSpeed } from "./VerticalSpeed"

export const RootComponent = () => {
  //fetching data from the backend
  const indicators = useIndicatorsQuery("", {
    pollingInterval: 50,
  })

  const stateData = useStateQuery("", {
    pollingInterval: 50,
  })

  //infinite scroll + zoom
  const stageRef = useRef<null | Konva.Stage>(null)
  const handleScroll = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()

    const stage = stageRef.current
    if (!stage) return
    const oldScale = stage.scaleX()
    const dir = e.evt.deltaY > 0 ? -1 : 1

    const pointer = stage.getPointerPosition()
    if (!pointer) return

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    const newScale = dir > 0 ? oldScale * 1.1 : oldScale / 1.1
    stage.scale({ x: newScale, y: newScale })

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }
    stage.position(newPos)
  }, [])

  // const intervalRef = useRef<NodeJS.Timeout | null>(null)
  // useEffect(() => {
  //   intervalRef.current = setInterval(() => {
  //     console.log("indicators", indicators.data)
  //     // console.log("stateData", stateData.data)
  //   }, 1000)

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current)
  //     }
  //   }
  // }, [stateData.data])

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      ref={stageRef}
      onWheel={handleScroll}
      onDragMove={() => {
        const newPos = stageRef.current?.getPosition()
        if (!newPos) return
      }}
    >
      <Layer>
        {/* {Data} */}
        <ArtificialHorizon
          x={200}
          y={200}
          width={200}
          height={200}
          roll={indicators.data?.aviahorizon_roll}
          pitch={indicators.data?.aviahorizon_pitch}
          pxPerDegree={3}
        />
        <VerticalSpeed
          height={100}
          width={100}
          style="needle"
          vs={stateData.data?.["RPM 1"]}
        />
      </Layer>
    </Stage>
  )
}
