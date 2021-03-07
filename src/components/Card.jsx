import React from 'react';
import styled from "styled-components";

const CardWrapper = styled.div`
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  margin-top: 10px;  
`;

const Card = (props) => {
    return (
        <CardWrapper>
            {props.children}
        </CardWrapper>
    );
}

export default Card;