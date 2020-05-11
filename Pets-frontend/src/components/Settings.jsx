import React, { useContext, useState } from "react";
import { useMutation, gql, } from "@apollo/client";
import AppContext from "../AppContext";

import "./styles/settings.css"

const UPDATE_USER = gql`
  mutation UpdateUser(
    $token: String!
    $name: String!
    $surname: String!
    $password: String!
    $bankAccount: String!
  ) {
    updateUser(
      token: $token
      name: $name
      surname: $surname
      password: $password
      bankAccount: $bankAccount
    ) {
      name
      surname
      password
      bankAccount
    }
  }
`;
const Settings = () => {
    let inputName;
    let inputSurname;
    let inputPassword;
    let inputBankAccount;

    const context = useContext(AppContext);

    const [updateUser, { data }] = useMutation(UPDATE_USER);
    const [click, setClick] = useState(false);

    //   props.state(data);
    //   console.log(data);

    return (
        <div className="Settings">
            <form
                className="Module"
                onSubmit={(e) => {
                    e.preventDefault();
                    updateUser({
                        variables: {
                            token: context.token.get,
                            name: inputName.value,
                            surname: inputSurname.value,
                            password: inputPassword.value,
                            bankAccount: inputBankAccount.value,
                        },
                    });
                    inputName.value = "";
                    inputSurname.value = "";
                    inputPassword.value = "";
                    inputBankAccount.value = "";
                }}
            >
                <div className="Fields">
                    <div className="Field">
                        <div className="Text">Name</div>
                        <input className="Input"
                            ref={(node) => {
                                inputName = node;
                            }}
                        />
                    </div>
                    <div className="Field">
                        <div className="Text">Surname</div>
                        <input className="Input"
                            ref={(node) => {
                                inputSurname = node;
                            }}
                        />
                    </div>
                    <div className="Field">
                        <div className="Text">Password</div>
                        <input className="Input"
                            type="password"
                            ref={(node) => {
                                inputPassword = node;
                            }}
                        />
                    </div>
                    <div className="Field">
                        <div className="Text">BankAccount</div>
                        <input className="Input"
                            ref={(node) => {
                                inputBankAccount = node;
                            }}
                        />
                    </div>
                </div>
                { click ? <div className="Status">Your data has been updated! :)</div> : null}
                <button className="Botton" type="submit" onClick={() => setClick(true)}>
                    Update User
        </button>
        <div className="BottonBack" onClick={() => context.mode.set(5)}>Go back</div>
            </form>
        </div>
    );
};
export { Settings as default };