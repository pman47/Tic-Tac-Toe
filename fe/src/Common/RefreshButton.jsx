import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const RefreshButton = ({onRefresh}) => {
    const [isRefreshing, setIsRefreshing] = useState(false)
  return (
    <button type='button' className={`${isRefreshing ? 'animate-spin' : ''} absolute top-5 right-5 text-lg`} onClick={async ()=>{
        setIsRefreshing(true)
        await onRefresh()
        setIsRefreshing(false)
    }}>
        <FontAwesomeIcon icon={faArrowsRotate} />
    </button>
  )
}

export default RefreshButton