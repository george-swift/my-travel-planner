import IconAirplane from './airplane'
import IconCancel from './cancel'
import IconPin from './pin'
import IconSpinner from './spinner'
import IconSun from './sun'
import IconTag from './tag'

const Icon = ({
  name,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { name: string }) => {
  switch (name) {
    case 'cancel':
      return <IconCancel {...props} />
    case 'airplane':
      return <IconAirplane {...props} />
    case 'pin':
      return <IconPin {...props} />
    case 'spinner':
      return <IconSpinner {...props} />
    case 'sun':
      return <IconSun {...props} />
    case 'tag':
      return <IconTag {...props} />

    default:
      return <></>
  }
}

export default Icon
