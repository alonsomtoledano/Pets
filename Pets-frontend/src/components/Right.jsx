import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./styles/right.css"

const QUERY =gql`
    query GetShelterData($shelter: Int!) {
        getShelterData( shelter: $shelter ) {
            name
            description
            phone
            address
        }
    }
`;

const Right = () => {
    const context = useContext(AppContext);

    let accountInfo = null;
    let content = null;

    const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
        variables: {shelter: context.district.get},
        notifyOnNetworkStatusChange: true,
    });

    if (!context.token.get) {
        accountInfo =
            <div className="NotLogged">
                <div className="NotLoggedText">No se ha iniciado sesión</div>
                <div className="LogIn" onClick={() => context.mode.set(0)}>Log In / Create Account</div>
            </div>
    } else {
        accountInfo =
            <div className="Logged">
                <div className="LoggedText">Welcome</div>
                <div className="SettingsButton" onClick={() => context.mode.set(3)}>Settings</div>
                <div className="LogOut" onClick={() => context.mode.set(4)}>Log Out</div>
            </div>
    }

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>
    if (error && context.district.get !== 0) return <div>Error</div>

    if (context.district.get !== 0) {
        content =
            <div className="ContentShelter">
                <div className="ShelterText">Shelter name: {data.getShelterData.name}</div>
                <div className="ShelterText">Description: {data.getShelterData.description}</div>
                <div className="ShelterText">Phone number: {data.getShelterData.phone}</div>
                <div className="ShelterText">Address: {data.getShelterData.address}</div>
                <div className="LogIn" onClick={() => context.donateMode.set(true)}>Donate to {data.getShelterData.name} shelter</div>
            </div>
    }

    return (
        <div className="Right">
            {accountInfo}
            {content}
        </div>
    )
}

export default Right;