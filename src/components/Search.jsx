import React, {useState, useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'


const Search = ({ searchTerm, setSearchTerm, user }) => {

  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if(searchTerm){
      setLoading(true);

      setTimeout(() => {
        setPins(null);
        setLoading(false);      
      }, 300);
    }

  }, [searchTerm])

  return (
    <div>
      {loading && <Spinner message='Searching for pins...'/>}
      {pins && <MasonryLayout pins={pins} user={user}/>}
      {!pins && searchTerm !== '' && !loading && (
        <div className='mt-10 text-center text-xl'>
          No Pins Found!
        </div>
      )}
    </div>
  )
}

export default Search