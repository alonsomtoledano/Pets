import React, { useContext, useState } from "react";
import { useMutation, gql, } from "@apollo/client";
import AppContext from "../AppContext";

import "./styles/createAccount.css"

const ADD_USER = gql`
  mutation AddUser($name: String!, $surname: String!,
                  $email: String!, $password: String!,
                  $bankAccount: String!) {
    addUser(name: $name, surname: $surname, email: $email,
                  password: $password, bankAccount: $bankAccount) {
      name
    }
  }
`;
const CreateAccount = () =>{
  let inputName;
  let inputSurname;
  let inputEmail;
  let inputPassword;
  let inputBankAccount;

  const context = useContext(AppContext);

  const [addUser, { data }] = useMutation(ADD_USER);
  const [click, setClick] = useState(false);

  return (
    <div className="CreateAccount">
      
      <form className="Module"
      
        onSubmit={e => {
          e.preventDefault();
          addUser({ variables: { name: inputName.value, surname: inputSurname.value,
                                 email: inputEmail.value, password: inputPassword.value,
                                 bankAccount: inputBankAccount.value}});
          inputName.value = null;
          inputSurname.value = null;
          inputEmail.value = null;
          inputPassword.value = null;
          inputBankAccount.value = null;
        }}
      >
        <div className="Fields">
          <div className="Field">
            <div className="Text">
              *Name
            </div>
            <input required className="Input"
              ref={node => {
                inputName = node;
              }}
            />
          </div>
          <div className="Field">
            <div className="Text">
              *Surname
            </div>
            <input required className="Input"
              ref={node => {
                inputSurname = node;
              }}
            />
          </div>
          <div className="Field">
            <div className="Text">
              *Email
            </div>
            <input type="email" required className="Input"
              ref={node => {
                inputEmail = node;
              }}
            />
          </div>
          <div className="Field">
            <div className="Text">
              *Password
            </div>
            <input type="password" required className="Input"
              ref={node => {
                inputPassword = node;
              }}
            />
          </div>
          <div className="Field">
            <div className="Text">
              BankAccount
            </div>
            <input className="Input"
              ref={node => {
                inputBankAccount = node;
              }}
            />
          </div>
        </div>
        <div className="Info">
                <div className="Text2">*Required Fields</div>
        </div>
        { data ? (data.addUser ? <div className="Status">Account created succesfully</div> : (click ? <div className="Status">Ops something went wrong</div> : null)) : null}
          <button className="Botton" type="submit" onClick={() => setClick(true)}>
            Create Account
        </button>
        <div className="BottonBack" onClick={() => context.mode.set(2)}>Go back</div>
      </form>
    </div>
  );
}
export { CreateAccount as default };