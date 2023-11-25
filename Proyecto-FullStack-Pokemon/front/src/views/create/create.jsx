import {useState, useEffect} from "react";
import { postPokemon, getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header";
import validations from "./CreatePokemonValidations";
import "./create.css"

const Create = () => {

    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const pokemonNames = useSelector((state)=>state.allPokemons.map((pokemon)=>pokemon.name));
    const [errors, setErrors] = useState({});
    const [create, setCreate] = useState(false)

    const initialForm = {
    name: '',
    img: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: []
};
    const [input, setInput] = useState(initialForm)

    useEffect(()=>{
        dispatch(getTypes());
    }, [dispatch])
    
    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name] : event.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        });
        setErrors(validations({...input, [event.target.name] : event.target.value}, pokemonNames));
    }

    function handleSelect(event) {
        if(input.types.filter(type=> type === event.target.value).length) {
            input.types.pop();
        }
        setInput({
            ...input,
            types: [...input.types, event.target.value]
        })
        event.target.value= 'default';
    }

    function handleClick(event) {
        event.preventDefault();
        setInput({
            ...input,
            types: input.types.filter(type=> type !== event.target.id)
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        if(Object.values(errors).length === 0 && input.types.length > 0) {
            setInput({...input.name=input.name.toLowerCase()});
            !input.img ? setInput({...input.img='https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20090125150654/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png'}) : setInput(input);
            dispatch(postPokemon(input));
            setCreate(!create)
            setInput(initialForm)
        } 
    }

    return(

        <div >
            <Header/>
            <div className="wrapper-form-container">
                <div className="title-form">
                    <h1>Professor Oak´s Laboratory</h1>
                </div>
                <form className="form" onSubmit={(event)=>handleSubmit(event)}>
                    <div className="name-form">
                        <label>POKEMON NAME</label>
                        <input
                            type='text'
                            value={input.name.toUpperCase()}
                            name= 'name'
                            autoComplete='off'
                            spellCheck="false"
                            onChange={handleChange}/>
                        {errors.name && (<p className="errors">{errors.name}</p>)} 
                    </div>

                    <div className="data-form-container">
                        <div className="data-form">
                            <label>Hit Points (HP) </label>
                            <input
                                type='range'
                                min='1'
                                max='140'
                                value={input.hp}
                                name= 'hp'
                                onChange={handleChange}/>
                                <span> {input.hp}</span>
                        </div>

                        <div className="data-form">
                            <label>Attack </label>
                            <input
                                type='range'
                                value={input.attack}
                                min='1'
                                max='150'
                                name= 'attack'
                                onChange={handleChange}/>
                                <span> {input.attack}</span>
                        </div>

                        <div className="data-form">
                            <label>Defense </label>
                            <input
                                type='range'
                                value={input.defense}
                                min='1'
                                max='150'
                                name= 'defense'
                                onChange={handleChange}/>
                                <span> {input.defense}</span>
                        </div>

                        <div className="data-form">
                            <label>Speed </label>
                            <input
                                type='range'
                                value={input.speed}
                                min='1'
                                max='100'
                                name= 'speed'
                                onChange={handleChange}/>
                                <span> {input.speed}</span>
                        </div>

                        <div className="data-form">
                            <label>Height </label>
                            <input
                                type='range'
                                value={input.height}
                                min='1'
                                max='80'
                                name= 'height'
                                onChange={handleChange}/>
                                <span> {input.height}</span>
                        </div>

                        <div className="data-form">
                            <label>Weight </label>
                            <input
                                type='range'
                                value={input.weight}
                                min='1'
                                max='3000'
                                name= 'weight'
                                onChange={handleChange}/>
                                <span> {input.weight}</span>
                        </div>

                            {errors.data && (<p className="errors">{errors.data}</p>)}
                        </div>

                        <div className="types-form-container">
                            <select value='default' onChange={(event)=>handleSelect(event)}>
                                <option disabled value='default'>Select Types</option>
                                {
                                    types.map((type)=>(<option value ={type.name} key={type.name}>{type.name.charAt(0).toUpperCase()+type.name.slice(1)}</option>))
                                }
                            </select>

                            <div className="types-form">
                                {input.types.map((selected)=>(
                                    <div key={selected}>
                                        <p>{selected.charAt(0).toUpperCase()+selected.slice(1)}<button className="close-button-form" id={selected} onClick={handleClick}>x</button></p>
                                        
                                    </div>
                                    ))
                                }
                            </div>  
                                {errors.types && (<p className="errors">{errors.types}</p>)}
                        </div>


                    <div className="image-form">
                        <label>URL Image (optional):</label>
                        <input
                            alt='image not found'
                            value={input.img}
                            name= 'img'
                            pattern="https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$"
                            title="image URL"
                            placeholder=' paste url image...'
                            autoComplete='off'
                            spellCheck="false"
                            onChange={handleChange}/>
                            {input.img && (<div><img src={input.img} alt='img not found'/></div>)}
                    </div>

                    {!create ? (
                        <button className="button-form" type="submit">
                        Create Pokemon
                        </button>
                    ) : (
                        <div>
                        <h2>Pokemon created successfully</h2>
                        <button className="button-form" onClick={() => setCreate(false)}>
                            Create Another Pokemon
                        </button>
                        </div>
                    )}

                </form>
                <img className="profesor-oak-image" src="https://images.wikidexcdn.net/mwuploads/wikidex/0/0a/latest/20141130014622/Profesor_Oak_%28XY%29.png" alt="profesorOak" />
            </div>
        </div>
    )
}

export default Create;