import React from "react";

import "./styles/pet.css"

const Pet = props => {
    const {name, image, id} = props;
    const {setPetId, setPetName} = props;

    return (
        <div className="Pet" onClick={() => {setPetId(id); setPetName(name);}}>
            <img className="PetImage" src={image} alt={name} />
            <div className="NameAllAnimals">{name}</div>
        </div>
    )
}

export default Pet;