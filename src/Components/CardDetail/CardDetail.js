import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner';
import style from './CardDetail.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const CardDetail = ({favCharacters, addToFav, removeFromFav}) => {
  const { id } = useParams();
  const parsedId = parseInt(id);

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  let api = `https://rickandmortyapi.com/api/character/${id}`

  useEffect(() => {
    setLoading(true)
    setCompleted(false)
    const body = document.querySelector('#root');

    body.scrollIntoView({
      behavior: 'smooth'
    }, 500)
    setTimeout(()=>{
        (async function(){
        
            try{
                const response = await fetch(api);
                const data = await response.json();
                setApiData(data)
                

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

  const {name,status,species,image,location,origin,gender,episode} = apiData;


  let like;
  const isLike = id => {
    like = favCharacters.includes(id)
  }
  isLike(parsedId)
  
  const [active, setActive] = useState(like);
  const activeHandle = () => {
    setActive(!active);

    if(!active){
        addToFav(parsedId);
    } else {
        removeFromFav(parsedId)
    }
}

    let dotClass;

    if(status === 'Alive'){
        dotClass=<span className={style.green}></span>;
    } else if(status==='Dead'){
        dotClass=<span className={style.red}></span>;
    } else {
        dotClass=<span className={style.grey}></span>;
    }
  
  return (
    <div className={style.wrapper}>
        
        <>
                {!completed ? (
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
                      <>
                        <Link to="/"><button className={style.backBtn}>back to home</button></Link>
                        <div className={style.cardWrapper}>
                          <button className={style.like} onClick={activeHandle}>{active ? (
                                <FontAwesomeIcon icon={faHeart} color='#DC143C' />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} color='#808080'  />
                            )}
                          </button>
                          <img src={image} alt='character img' />
                          <div className={style.content}>
                              <h3 className={style.name}>
                                {name}
                              </h3>
                              <p>
                                  {dotClass} {status} - {species}
                              </p>
                              <p>
                                  <span>Last known location:</span> {location.name}
                              </p>
                              <p>
                                  <span>Origin:</span> {origin.name}
                              </p>
                              <p>
                                  <span>Gender: </span> {gender}
                              </p>
                              <p>
                                  <span>Was in: </span>{` ${episode.length} episodes `}
                              </p>
                            </div>
                        </div>
                      </>
                    ) : (
                        <div className={style.error}>
                        <h3>Unable to fetch character</h3>
                        </div>)}
                    </>
                )}
          </>
            
      


    </div>
  )
}

export default CardDetail