import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const BackButton = ({onBackPress}) => {
  return (
    <button type='button' className='absolute top-5 left-5 text-lg' onClick={onBackPress}>
        <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  )
}

export default BackButton