import { useState } from "react"; 

function SearchBar({ onSubmit }){

    const [term, setTerm] = useState("");
        
    function hanleFormSubmit(e){
        e.preventDefault();
       onSubmit(term)
    }
    
    function handleChange(e){
        setTerm(e.target.value);
    }
    
    return (
            <div>
                <form onSubmit={hanleFormSubmit}>
                    <input  value={term} onChange={handleChange}/>
                </form>
            </div>
        )
}

export default SearchBar;