import { RobotContactShape, RobotContactViewBox } from './RobotContactShape'
import { RobotHeroShape, RobotHeroViewBox } from './RobotHeroShape'
import { RobotProjectShape, RobotProjectViewBox } from './RobotProjectShape'

const variants = {
  hero: { Shape: RobotHeroShape, viewBox: RobotHeroViewBox },
  project: { Shape: RobotProjectShape, viewBox: RobotProjectViewBox },
  contact: { Shape: RobotContactShape, viewBox: RobotContactViewBox },
}

type Props = {
  variant: keyof typeof variants
  className?: string
}

/** Mascota de FiSpace como SVG en línea, para poder animar cabeza y ojos por separado. */
export function Robot({ variant, className }: Props) {
  const { Shape, viewBox } = variants[variant]
  return (
    <svg
      className={`robot-svg ${className ?? ''}`}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Robot mascota"
      data-robot={variant}
    >
      <Shape />
    </svg>
  )
}
