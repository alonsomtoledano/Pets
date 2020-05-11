import React, { useContext } from "react";
import { useMutation, gql, } from "@apollo/client";
import AppContext from "../AppContext";

const LOGOUT = gql`
  mutation Logout($token: String!) {
    logout(token: $token){
        token
    }
  }
`;
const Logout = () => {
  let inputToken;

  const context = useContext(AppContext);

  const [logout, { data }] = useMutation(LOGOUT);
  

  return (
    <div className="Logout">
      <form className="Module"
        onSubmit={e => {
          e.preventDefault();
          logout({ variables: { token: inputToken.value }});
          inputToken.value = '';
        }}
      >
        <div className="Fields">
          <div className="Field">
            <div className="Text">
              Token
            </div>
            <input 
              ref={node => {
                inputToken = node;
              }}
            />
          </div>
        </div>
          <button className="Botton" type="submit">
            Logout
          </button>
          {context.token.set(null)}
          {context.mode.set(5)}
      </form>
    </div>
  );
}
export { Logout as default };