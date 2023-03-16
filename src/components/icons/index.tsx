import IconAirplane from './airplane'
import IconCancel from './cancel'
import IconSpinner from './spinner'
import IconTag from './tag'

type IconProps = {
  name: string
}

const Icon = ({ name }: IconProps) => {
  switch (name) {
    case 'cancel':
      return <IconCancel />
    case 'airplane':
      return <IconAirplane />
    case 'spinner':
      return <IconSpinner />
    case 'tag':
      return <IconTag />

    default:
      return <></>
  }
}

export default Icon
