import React, { useRef, useState, useEffect } from 'react'
import style from './Home.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Card from '../../Card/Card'
import { HashLink } from 'react-router-hash-link';
import Spinner from '../../Spinner/Spinner'

const Home = (props) => {


  const [apiData, setApiData] = useState([]);
  const [inputState, setInputState] = useState('');
  const [statusState, setStatusState] = useState('');
  const [speciesState, setSpeciesState] = useState('');
  const [genderState, setGenderState] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const inputRef = useRef();
  const selectStatusRef = useRef();
  const selectSpeciesRef = useRef();
  const selectGenderRef = useRef();

  let api = `https://rickandmortyapi.com/api/character/?page=${page}&name=${inputState}&status=${statusState}&species=${speciesState}&gender=${genderState}`;
  

  useEffect(() => {
    setLoading(true)
    setCompleted(false)
    setTimeout(()=>{
        (async function(){
        
            try{
                const response = await fetch(api);
                const data = await response.json();
                setApiData(data.results)
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

  const inputHandler = (e) => {
      e.preventDefault();
      setInputState(inputRef.current.value)
      inputRef.current.value="";
      setPage(1);
  }

  const nextPageHandler = () => setPage(page + 1);
  const prevPageHandler = () => {
      page === 1 ? setPage(page) : setPage(page-1);
  };

  const handleStatusSelect = (e) => {
      e.preventDefault();
      setPage(1);
      setStatusState(selectStatusRef.current.value);
  }
  const handleSpeciesSelect = (e) => {
      e.preventDefault();
      setPage(1);
      setSpeciesState(selectSpeciesRef.current.value);
  }
  const handleGenderSelect = (e) => {
      e.preventDefault();
      setPage(1);
      setGenderState(selectGenderRef.current.value);
  }

  const resetFilters = (e) => {
    e.preventDefault();
    setInputState("")
    setStatusState("")
    setSpeciesState("")
    setGenderState("")
    setPage(1)
  }

  let like;
  const isLike = id => {
    like = props.favCharacters.includes(id)
    return like
  }

  
  
  return (
    <div className={style.wrapper}>
        <form className={style.filters}>
            <div className={style.inputWrapper}>
                <input type="text" ref={inputRef} placeholder='Search for characters' />
                <button onClick={inputHandler}><FontAwesomeIcon icon={faMagnifyingGlass} color="#f8f9fa"/></button>
            </div>
            <div className={style.selectWrapper}>
                <select className={style.selectInput} ref={selectStatusRef} id="selectStatus" name="selectStatus" onChange={handleStatusSelect}>
                        <option value="" defaultValue>Filter by status</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="Unknown">Unknown</option>
                </select>
                <select className={style.selectInput} ref={selectSpeciesRef} id="selectSpecies" name="selectSpecies" onChange={handleSpeciesSelect}>
                        <option value="" defaultValue>Filter by species</option>
                        <option value="Human">Human</option>
                        <option value="Alien">Alien</option>
                        <option value="Humanoid">Humanoid</option>
                </select>
                <select className={style.selectInput} ref={selectGenderRef} id="selectGender" name="selectGender" onChange={handleGenderSelect}>
                        <option value="" defaultValue>Filter by gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Genderless">Genderless</option>
                        <option value="Unknown">Unknown</option>
                </select>
                <button className={style.errorBtn} onClick={resetFilters}>reset filters</button>
            </div>
        </form>
        <div className={style.cardsWrapper}>
            
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
                        apiData.map(el => (
                            <Card key={el.id} id={el.id} name={el.name} status={el.status} species={el.species} image={el.image} location={el.location} addToFav={props.addToFav} removeFromFav={props.removeFromFav} like={isLike(el.id)} page="/"/>
                    ))) : (
                        <div className={style.error}>
                        <h3>Unable to fetch characters, please reset filters</h3>
                        <button className={style.errorBtn} onClick={resetFilters}>reset filters</button>
                        </div>)}
                    </>
                )}
            </>
            
        </div>

        <div className={style.paginationWrapper}>
            <HashLink smooth to="#nav"><button className={style.btnPage} onClick={prevPageHandler}>Prev Page</button></HashLink><p>{page}</p>
            <HashLink smooth to="#nav"><button className={style.btnPage} onClick={nextPageHandler}>Next Page</button></HashLink>
        </div>


    </div>
  )
}

export default Home