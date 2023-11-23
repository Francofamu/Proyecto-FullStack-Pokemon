import {useState, useEffect} from "react";
import { postPokemon, getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/header";
import validations from "./CreatePokemonValidations";

const Create = () => {

    const dispatch = useDispatch();
    const types = useSelector((state)=>state.types);
    const pokemonNames = useSelector((state)=>state.allPokemons.map((pokemon)=>pokemon.name));
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        img: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    });

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
        setInput({...input.name=input.name.toLowerCase()});
        !input.img ? setInput({...input.img='https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20090125150654/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png'}) : setInput(input);
        if(Object.keys(errors).length === 0 && input.name.length && input.types.length > 0) {
            dispatch(postPokemon(input));
        } 
    }

    return(

        <div >
            <Header/>
            <div>
                <div>
                    <h1>CREATE YOUR POKEMON</h1>
                </div>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div>
                        <label>POKEMON NAME</label>
                        <input
                            type='text'
                            value={input.name.toUpperCase()}
                            name= 'name'
                            autoComplete='off'
                            spellCheck="false"
                            onChange={handleChange}/>
                        </div>
                        {errors.name && (<p>{errors.name}</p>)}
                    <div>
                        <label>Hit Points (HP) </label>
                        <input
                            type='range'
                            min='1'
                            max='140'
                            value={input.hp}
                            name= 'hp'
                            onChange={handleChange}/>
                            <span> {input.hp}</span>
                    {errors.hp && (<p>{errors.hp}</p>)}
                    </div>
                    <div>
                        <label>Attack </label>
                        <input
                            type='range'
                            value={input.attack}
                            min='1'
                            max='150'
                            name= 'attack'
                            onChange={handleChange}/>
                            <span> {input.attack}</span>
                    {errors.attack && (<p>{errors.attack}</p>)}
                    </div>
                    <div>
                        <label>Defense </label>
                        <input
                            type='range'
                            value={input.defense}
                            min='1'
                            max='150'
                            name= 'defense'
                            onChange={handleChange}/>
                            <span> {input.defense}</span>
                    {errors.defense && (<p>{errors.defense}</p>)}
                    </div>
                    <div>
                        <label>Speed </label>
                        <input
                            type='range'
                            value={input.speed}
                            min='1'
                            max='100'
                            name= 'speed'
                            onChange={handleChange}/>
                            <span> {input.speed}</span>
                    {errors.speed && (<p>{errors.speed}</p>)}
                    </div>
                    <div>
                        <label>Height </label>
                        <input
                            type='range'
                            value={input.height}
                            min='1'
                            max='80'
                            name= 'height'
                            onChange={handleChange}/>
                            <span> {input.height}</span>
                    {errors.height && (<p>{errors.height}</p>)}
                    </div>
                    <div>
                        <label>Weight </label>
                        <input
                            type='range'
                            value={input.weight}
                            min='1'
                            max='3000'
                            name= 'weight'
                            onChange={handleChange}/>
                            <span> {input.weight}</span>
                    {errors.weight && (<p>{errors.weight}</p>)}
                    </div>
                    <div>
                        <select value='default' onChange={(event)=>handleSelect(event)}>
                            <option disabled value='default'>Select Types</option>
                            {
                                types.map((type)=>(<option value ={type.name} key={type.name}>{type.name.charAt(0).toUpperCase()+type.name.slice(1)}</option>))
                            }
                        </select>
                    </div>
                    <div>
                        {input.types.map((selected)=>(
                            <div key={selected}>
                                <p>{selected.charAt(0).toUpperCase()+selected.slice(1)}</p>
                                <button id={selected} onClick={handleClick}>x</button>
                            </div>
                            ))
                        }
                    {errors.types && (<p>{errors.types}</p>)}
                    </div>
                    {input.img && (<div><img src={input.img} alt='img not found'/></div>)}
                    <div>
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
                    </div>
                    <button type='submit'>Create Pokemon</button>
                </form>
                <img src="https://images.wikidexcdn.net/mwuploads/wikidex/0/0a/latest/20141130014622/Profesor_Oak_%28XY%29.png" alt="profesorOak" />
            </div>
        </div>
    )
}

export default Create;