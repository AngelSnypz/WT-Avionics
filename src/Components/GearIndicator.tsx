import { Group } from "react-konva"
import type { containerProps } from "../Helpers/types"

export const GearIndicator = (props: containerProps) => {
  return <Group x={props.x} y={props.y}></Group>
}
