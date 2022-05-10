import styled from "styled-components";

const PostContainer = styled.div`
  width: 100%;

  & > div {
    margin-bottom: 20px;
  }

  & > button {
    padding: 10px;
    background-color: #5dade2;
    border: 1px solid #5dade2;
    font-size: 20px;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 6px;
`;

const PostTitleContainer = styled.div`
  text-align: center;
`;

const InputTitleContainer = styled.div`
  & > input {
    width: 92.6%;
    padding: 6px 42px 6px 12px;

    &:focus {
      border: 1px solid #5dade2;
    }
  }
`;

const InputContentContainer = styled.div`
  & > textarea {
    min-width: 97.2%;
    max-width: 97.2%;
    min-height: 300px;
    max-height: 300px;
    outline: none;

    padding: 10px;

    &:focus {
      border: 1px solid #5dade2;
    }
  }
`;

export { PostContainer, SelectContainer, Select, PostTitleContainer, InputTitleContainer, InputContentContainer };
