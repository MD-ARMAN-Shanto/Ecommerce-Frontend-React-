import React, {useState, useEffect, Fragment} from "react";


const RadioBox = ({fixedPrice, handleFilters}) =>{
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return fixedPrice.map((fp, i)=> (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${fp._id}`}
                type="radio"
                name={fp}
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{fp.name}</label>
        </div>
    ))
};
export default RadioBox;