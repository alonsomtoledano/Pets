import React, { useContext } from "react";
import AppContext from "../AppContext";

import "./styles/district.css"

const District = props => {
    const context = useContext(AppContext);

    const {setSpecie, setPetId} = props; 

    return (
        <div className="District">
            <img className="Logo" onClick={() => {context.district.set(0); setSpecie(null); setPetId(null); context.donateMode.set(false); context.mode.set(5);}} src={"https://raw.githubusercontent.com/AlonsoMartinToledano/Pets/master/Pets-frontend/src/logo_transparent.png"} alt={"logo"} />
            <div className={context.district.get === 1 ? "DistrictButtonSelected" : "DistrictButton"} onClick={() => {context.district.set(1); setSpecie(null); setPetId(null); context.donateMode.set(false); context.mode.set(5);}}>District 1</div>
            <div className={context.district.get === 2 ? "DistrictButtonSelected" : "DistrictButton"} onClick={() => {context.district.set(2); setSpecie(null); setPetId(null); context.donateMode.set(false); context.mode.set(5);}}>District 2</div>
            <div className={context.district.get === 3 ? "DistrictButtonSelected" : "DistrictButton"} onClick={() => {context.district.set(3); setSpecie(null); setPetId(null); context.donateMode.set(false); context.mode.set(5);}}>District 3</div>
        </div>
    )
}

export default District;