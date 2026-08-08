import { Group, Text } from "react-konva"
import type { containerProps } from "../Helpers/types"
import type { JSX } from "react"

interface VerticalSpeedProps extends containerProps {
  vs?: number
  style: "needle" | "tape"
}
export const VerticalSpeed = (props: VerticalSpeedProps) => {
  let indicator: JSX.Element
  if (props.style === "needle") {
    indicator = <Text text={"needle" + props.vs} />
  } else {
    indicator = <Text text={"tape" + props.vs} />
  }

  return (
    <Group x={props.x} y={props.y}>
      {indicator}
    </Group>
  )
}
