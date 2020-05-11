import React, { useContext, useState } from "react";
import { useMutation, gql, } from "@apollo/client";
import AppContext from "../AppContext";

import "./styles/login.css"

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) 
  }
`;
const Login = () => {
  let inputEmail;
  let inputPassword;

  const context = useContext(AppContext);

  const [login, { data }] = useMutation(LOGIN);
  const [click, setClick] = useState(false);

  return (
    <div className="Login">
      <form className="Module"
        onSubmit={e => {
          e.preventDefault();
          login({ variables: { email: inputEmail.value, password: inputPassword.value }});
          inputEmail.value = '';
          inputPassword.value = '';
        }}
      >
        <div className="Fields">
          <div className="Field">
            <div className="Text">
              Email
            </div>
            <input type="email" required className="Input"
              ref={node => {
                inputEmail = node;
              }}
            />
          </div>
          <div className="Field">
            <div className="Text">
              Password
            </div>
            <input type="password" required className="Input"
              ref={node => {
                inputPassword = node;
              }}
            />
          </div>
          { data ? (data.login ? <div className="Status">Logged in succesfully! :)</div> : (click ? <div className="Status">Incorrect email or password :(</div> : null)) : null}
        </div>
          <button className="BottonLogin" type="submit" onClick={() => setClick(true)}>
            Login
          </button>
          <div className="Botton" onClick={() => context.mode.set(1)}>Create Account</div>
          <div className="Botton" onClick={() => {context.mode.set(5); if (data){context.token.set(data.login);}}}>Go back</div>
      </form>
    </div>
  );
}
export { Login as default };