import type { JSX } from "react"
import { useCallback, useRef, useMemo } from "react"
import { useIndicatorsQuery } from "../Redux/apiSlice/apiSlice"
import { Layer, Rect, Stage, Text } from "react-konva"
import type { KonvaEventObject } from "konva/lib/Node"
import type { Konva } from "konva/lib/_FullInternals"

export const RootComponent = () => {
  const indicators = useIndicatorsQuery(void 0, {
    pollingInterval: 100,
  })

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

  const Data = useMemo(() => {
    if (!indicators.data) return <Text text="Loading..." />

    const elems: JSX.Element[] = []

    Object.entries(indicators.data).forEach(
      ([key, value]: [string, string | number], index) => {
        elems.push(
          <Text
            key={key}
            text={`${key}: ${value}`}
            x={10}
            y={10 + index * 20}
            fontSize={14}
            fill="black"
          />,
        )
      },
    )

    return elems
  }, [indicators.data])

  return (
    <Stage
      width={1000}
      height={1000}
      draggable
      ref={stageRef}
      onWheel={handleScroll}
      onDragMove={() => {
        const newPos = stageRef.current?.getPosition()
        if (!newPos) return
      }}
    >
      <Layer>
        <Rect width={50} height={50} fill={"magenta"} />
        {Data}
      </Layer>
    </Stage>
  )
}
