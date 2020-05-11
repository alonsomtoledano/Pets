import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

const QUERY =gql`
    query GetUserToken($token: String!) {
        getUserToken( token: $token ) {
            name
            surname
            bankAccount
        }
    }
`;

const GetUserData = () => {
    const context = useContext(AppContext);

    const { loading, error, data, refetch, networkStatus } = useQuery(QUERY, {
        variables: {token: context.token.get},
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>
    if (error && context.token.get) return <div>Error</div>

    return (
        <div className="GetUserData">
            {data ? (data.getUserToken.bankAccount ? context.money.set(true) : context.money.set(false)) : null}
            {context.mode.set(2)}
        </div>
    )
}

export default GetUserData;