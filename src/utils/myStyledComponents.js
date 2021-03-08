import styled from "styled-components";
import { Input, Button } from "antd";

export const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

export const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 10px 50px 10px 10px;

  ::hover,
  :focus {
    border-color: transparent;
    box-shadow: none;
  }
`;

export const PostButton = styled(Button)`
  position: absolute;
  right: 0;
  padding: 0 10px 0 5px;
  height: 100%;

  :hover,
  :focus {
    background-color: transparent;
    color: #5094ce;
  }
`;
