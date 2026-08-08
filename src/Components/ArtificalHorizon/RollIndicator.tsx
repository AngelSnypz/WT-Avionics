import { Group, RegularPolygon } from "react-konva"
import type { containerProps } from "../../Helpers/types"

interface RollIndicatorProps extends containerProps {
  roll?: number
}

export const RollIndicator = (props: RollIndicatorProps) => {
  return (
    <Group
      x={props.x}
      y={props.y}
      offsetX={props.width / 2}
      offsetY={props.height / 2}
    >
      <RegularPolygon
        sides={3}
        radius={props.height * 0.05}
        fill={"magenta"}
        rotation={180}
        offsetY={-props.height * 0.45}
      />
      <Group rotation={30}>
        <RegularPolygon
          sides={3}
          radius={props.height * 0.05}
          fill={"magenta"}
          rotation={180}
          offsetY={-props.height * 0.45}
        />
      </Group>
      <Group rotation={-30}>
        <RegularPolygon
          sides={3}
          radius={props.height * 0.05}
          fill={"magenta"}
          rotation={180}
          offsetY={-props.height * 0.45}
        />
      </Group>
    </Group>
  )
}
