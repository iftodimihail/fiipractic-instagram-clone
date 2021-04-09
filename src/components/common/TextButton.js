import styled from "styled-components";
import { Button } from "antd";

export default styled(Button)`
  background: transparent;
  padding: 0;
  color: inherit;
  border: 0;
  box-shadow: none;
  :hover,
  :focus {
    background: transparent;
    color: inherit;
    outline: none;
  }
`;
