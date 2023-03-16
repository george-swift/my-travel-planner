import Icon from './icons'

interface Props {
  tag: string
  isFlight: boolean
}

const Tag = ({ tag, isFlight }: Props) => {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 capitalize">
      <Icon name="tag" />
      {tag}
      {isFlight && ' Flight'}
    </span>
  )
}

export default Tag
