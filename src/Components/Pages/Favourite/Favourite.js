import React, {useState, useEffect} from 'react'
import style from './Favourite.module.scss'
import Spinner from '../../Spinner/Spinner'
import Card from '../../Card/Card'

const Favourite = ({favCharacters, addToFav, removeFromFav}) => {
  
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  let api;
  if(favCharacters !== []){
    api = `https://rickandmortyapi.com/api/character/${favCharacters}`;
  } else {
    api = `aa`
  }

    useEffect(() => {
      setLoading(true)
      setCompleted(false)
      setTimeout(()=>{
          (async function(){
          
              try{
                  const response = await fetch(api);
                  const data = await response.json();
                  window.scrollTo(0, 0);
                  if(data.id){
                    setApiData([data])
                  } else {
                    setApiData(data)
                  }
                  
                  setTimeout(()=>{
                      setLoading(false)
                      setCompleted(true)
                  },500)
              } catch (error){
                  setLoading(false)
                  setCompleted(false)
                  console.log(error)
              }
          })();
      },1000)
      
    },[api])


  let like;
  const isLike = id => {
    like = favCharacters.includes(id)
    return like
  }


  return (
    <div className={style.wrapper}>
        <div className={style.cardsWrapper}>
            <>  
            {apiData.info ? (
              <div className={style.error}>
                <h3>Unable to fetch favourite characters, go like someone!</h3>
              </div>
            ) : (!completed ? (
                    <>
                    {!loading ? (
                        <Spinner />
                    ) : (
                        <Spinner />
                    )}
                    </>
                ) : (
                    <>
                    {apiData ? (
                          apiData.map(el => (
                            <Card key={el.id} id={el.id} name={el.name} status={el.status} species={el.species} image={el.image} location={el.location} addToFav={addToFav} removeFromFav={removeFromFav} like={isLike(el.id)} page="/favourite/"/>
                    ))) : (
                        <Spinner />)}
                    </>
                ))}
            </>
            
        </div>


    </div>
  )
}

export default Favourite