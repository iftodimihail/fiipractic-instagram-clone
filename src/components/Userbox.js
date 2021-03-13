import { useState } from "react";
import React from 'react';
import styled from 'styled-components';
import { Input, Button } from "antd";


const UserboxContainer = styled.div`
    position: relative;
    padding: 10px 0;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const UserboxInput = styled(Input)`
    padding: inherit 5px;
    :hover, :focus{
        outline: none;
        border-color: lightgray;
        box-shadow: none;
    }
`;
const UserboxButton = styled(Button)`
    margin-left: 10px;
`;

function Userbox({ addpostFunc }){
    const [User, setUser] = useState("");
    function addUser(arg){
        setUser(arg.target.value);
    }
    return(
        <UserboxContainer>
            <UserboxInput onChange = {(e)=>{addUser(e)}}/>
            <UserboxButton onClick = {()=>{
                addpostFunc(User)}} >Set User</UserboxButton>
        </UserboxContainer>
    );
}

export default Userbox;