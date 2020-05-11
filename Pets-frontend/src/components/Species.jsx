import React, { useContext } from "react";
import AppContext from "../AppContext";

import "./styles/species.css"

const Species = props => {
    const context = useContext(AppContext);

    const {setSpecie, specie} = props;

    return (
        <div className="Species">
            <div className={specie === "Dog" ? "SpecieSelected" : "Specie"} onClick={() => setSpecie("Dog")}>Dogs</div>
            <div className={specie === "Rabbit" ? "SpecieSelected" : "Specie"} onClick={() => setSpecie("Rabbit")}>Rabbits</div>
        </div>
    )
}

export default Species;