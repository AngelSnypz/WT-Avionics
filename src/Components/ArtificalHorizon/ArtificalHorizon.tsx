import { Group, Rect } from "react-konva"
import { COLORS } from "../../Helpers/Theme"

import type { containerProps } from "../../Helpers/types"
import { RollIndicator } from "./RollIndicator"

interface ArtificialHorizonProps extends containerProps {
  roll?: number
  pitch?: number
  pxPerDegree?: number
}

export const ArtificialHorizon = (props: ArtificialHorizonProps) => {
  return (
    <Group
      x={props.x}
      y={props.y}
      draggable
      preventDefault
      clipHeight={props.height}
      clipWidth={props.width}
      clipX={-props.width * 0.5}
      clipY={-props.height * 0.5}
    >
      <Rect
        width={props.width}
        height={props.height}
        fill="black"
        offsetX={props.width / 2}
        offsetY={props.height / 2}
      />
      <Group
        rotation={props.roll ?? 0}
        offsetX={props.width / 2}
        offsetY={Math.max(
          Math.min(
            props.height / 2 + (props.pitch ?? 0) * (props.pxPerDegree ?? 1),
            props.height * 0.9,
          ),
          props.height * 0.1,
        )}
      >
        <Rect
          x={-props.width}
          width={props.width * 3}
          y={-props.height}
          height={props.height * 2}
          fill={COLORS.SKY}
        />
        <Rect
          x={-props.width}
          width={props.width * 3}
          height={props.height * 2}
          fill={COLORS.GROUND}
          y={props.height * 0.5}
        />
      </Group>
      <RollIndicator
        x={props.width / 2}
        y={props.height / 2}
        width={props.width}
        height={props.height}
        roll={props.roll}
      />
    </Group>
  )
}
