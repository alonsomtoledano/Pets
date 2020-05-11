import React, { useState, useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./styles/petInfo.css"

const QUERY =gql`
    query GetAnimal($animalID: ID! $shelter: Int!) {
        getAnimal( animalID: $animalID, shelter: $shelter ) {
            name
            species
            breed
            age
            description
            image
        }
    }
`;

const PetInfo = props => {
    const context = useContext(AppContext);
    const {petId, petName} = props;

    const [petBodyMode, setPetBodyMode] = useState(0);
    const [month, setMonth] = useState(0);
    const [amount, setAmount] = useState(0);
    const [sponsorMessage, setSponsorMessage] = useState(false);
    const [adoptMessage, setAdoptMessage] = useState(false);
    const [over18Adopt, setOver18Adopt] = useState(false);
    const [over18Sponsor, setOver18Sponsor] = useState(false);
    //mode 0 => info
    //mode 1 => Sponsor
    //mode 2 => Adopt

    const updateMonth = number => {
        setMonth(number.target.value);
        setSponsorMessage(false);
    }
    
    const updateAmount = number => {
        setAmount(number.target.value);
        setSponsorMessage(false);
    }

    const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
        variables: {animalID: petId, shelter: context.district.get},
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>
    if (error && petId) return <div>Error</div>

    let petBody = null;

    if (petId) {
        if (petBodyMode === 0){
            petBody = 
                <div className="PetBodyInfo">
                    <div className="PetInfoText">Name: {data.getAnimal.name}</div>
                    <div className="PetInfoText">Specie: {data.getAnimal.species}</div>
                    <div className="PetInfoText">Breed: {data.getAnimal.breed}</div>
                    <div className="PetInfoText">Age: {data.getAnimal.age}</div>
                    <div className="PetInfoText">Description: {data.getAnimal.description}</div>
                </div>
        }
        if (petBodyMode === 1){
            if (!context.token.get) {
                petBody = <div className="AdoptMessage">Please, log in</div>
            } else {
                if (!context.money.get) {
                    petBody = <div className="AdoptMessage">Please, update your bank account info</div>
                } else {
                    petBody = 
                        <div className="PetBodySponsor">
                            <div className="PetSponsor">Number of months: <input className="InputPet" type="number" min="1" onChange={updateMonth}/></div>
                            <div className="PetSponsor">Amount: <input className="InputPet" type="number" min="1" onChange={updateAmount}/></div>
                            <div className="PetSponsor">Total Amount: {month * amount} €</div>
                            <div className="PetBodySponsor2">
                                <div className="AdoptCheck">I'm over 18<input className="InputPet" type="checkbox" onClick={() => {setOver18Sponsor(!over18Sponsor); setSponsorMessage(false)}}/></div>
                                {sponsorMessage ? (over18Sponsor ? <div className="AdoptMessage">Thanks for supportting {petName} with {month * amount} €</div> : <div className="AdoptMessage">You should be over 18 to sponsor :(</div>) : null}
                                <div className="AdoptButton" onClick={() => setSponsorMessage(true)}>Sponsor</div>
                            </div>
                        </div>
                }
            }
        } else if (petBodyMode === 2) {
            if (!context.token.get) {
                petBody = <div className="AdoptMessage">Please, log in</div>
            } else {
                petBody =
                    <div className="AdoptOptions">
                        <div className="AdoptCheck">I'm over 18<input className="InputPet" type="checkbox" onClick={() => {setOver18Adopt(!over18Adopt); setAdoptMessage(false)}}/></div>
                        {adoptMessage ? (over18Adopt ? <div className="AdoptMessage">Thank you very much, {petName} will be waiting for you! :)</div> : <div className="AdoptMessage">You should be over 18 to adopt :(</div>) : null}
                        <div className="AdoptButton" onClick={() => setAdoptMessage(true)}>Adopt</div>
                    </div>
            }
        }
    }

    return (
        <div className="PetInfo">
            <div className ="TopInfo">
                <img className="ImagePetIndividual" onClick={() => setPetBodyMode(0)} src={data.getAnimal.image} alt={data.getAnimal.name} />
                <div className={petBodyMode === 1 ? "PetButtonSelected" : "PetButton"} onClick={() => setPetBodyMode(1)}>Sponsor</div>
                <div className={petBodyMode === 2 ? "PetButtonSelected" : "PetButton"} onClick={() => setPetBodyMode(2)}>Adopt</div>
            </div>
            {petBody}
        </div>
    )
}

export default PetInfo;