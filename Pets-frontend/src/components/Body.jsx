import React, { useState, useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import District from "./District";
import Species from "./Species";
import Pet from "./Pet";
import PetInfo from "./PetInfo";
import "./styles/body.css";

const QUERY_GETANIMALS =gql`
    query GetAnimals($shelter: Int!) {
        getAnimals( shelter: $shelter ) {
            name
            image
            _id
        }
    }
`;

const QUERY_GETSPECIES =gql`
    query GetSpecies($species: String!, $shelter: Int!) {
        getSpecies( species: $species, shelter: $shelter ) {
            name
            image
            _id
        }
    }
`;

const Body = () => {
    const context = useContext(AppContext);

    const [specie, setSpecie] = useState(null);
    const [petId, setPetId] = useState(null);
    const [petName, setPetName] = useState(null);
    const [month, setMonth] = useState(0);
    const [amount, setAmount] = useState(0);
    const [donateMessage, setDonateMessage] = useState(false);
    const [over18, setOver18] = useState(false);

    const updateMonth = number => {
        setMonth(number.target.value);
        setDonateMessage(false);
    }
    
    const updateAmount = number => {
        setAmount(number.target.value);
        setDonateMessage(false);
    }

    let variables;

    if (specie){
        variables = {species: specie, shelter: context.district.get}
    } else {
        variables = {shelter: context.district.get}
    }

    const { loading, error, data, refetch, networkStatus } = useQuery(specie ? QUERY_GETSPECIES : QUERY_GETANIMALS, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>
    if (error && context.district.get !== 0) return <div>Error</div>    

    let pets = null;

    if (context.district.get !== 0 && specie === null) {
        pets =
            <div className="AllPets">
                {data.getAnimals.map(obj => {
                    return <Pet name={obj.name}
                                image={obj.image}
                                id={obj._id}
                                key={obj._id}
                                setPetId={setPetId}
                                setPetName={setPetName}/>
                })}
            </div>
    } else if (specie) {
        pets =
            <div className="AllPets">
                {data.getSpecies.map(obj => {
                    return <Pet name={obj.name}
                                image={obj.image}
                                id={obj._id}
                                key={obj._id}
                                setPetId={setPetId}
                                setPetName={setPetName}/>
                })}
            </div>
    }

    let body = null;

    if (!petId) {
        body =
            <div>
                {context.district.get !== 0 ? <Species setSpecie={setSpecie} specie={specie}/> : null}
                {pets}
            </div>
    } else {
        body = <PetInfo petId={petId} petName={petName} />
    }

    if (context.donateMode.get) {
        body =
            <div className="DonateOptions">
                {context.token.get ?
                    <div>
                        {context.money.get ? 
                            <div className="DonateMoney">
                                <div className="PetSponsor">Donate money</div>
                                <div className="PetSponsor">Number of months: <input className="InputPet"type="number" min="1" onChange={updateMonth}/></div>
                                <div className="PetSponsor">Amount: <input className="InputPet"type="number" min="1" onChange={updateAmount}/></div>
                                <div className="PetSponsor">Total Amount: {month * amount} €</div>
                            </div> : <div className="AdoptMessage">For donating money options, please add your bank account</div>}

                        <div className="PetSponsor">
                            Donate resources
                            <textarea className="InputResources" type="text" placeholder="Tell what you want to donate and we will get in touch"/>
                        </div>

                        <div className="AdoptCheck">I'm over 18<input type="checkbox" className="InputPet" onClick={() => {setOver18(!over18); setDonateMessage(false)}}/></div>
                        {donateMessage ? (over18 ? <div className="AdoptMessage">Thanks for supporting us!</div> : <div className="AdoptMessage">You should be over 18 to donate :(</div>) : null}
                        <div className="ContentDonateButton"><div className="DonateButton" onClick={() => setDonateMessage(true)}>Donate</div></div>
                    </div> : <div className="AdoptMessage">Please, log in</div>
                }
                    
            </div>
    }

    return (
        <div className="Body">
            <District setSpecie={setSpecie} setPetId={setPetId}/>
            {body}
        </div>
    )
}

export default Body;