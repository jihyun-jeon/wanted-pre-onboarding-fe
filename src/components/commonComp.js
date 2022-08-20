import styled from 'styled-components';
import variables from '../styles/variables';

export const Form = styled.form`
  ${variables.flex({ direction: 'column' })}
  width: 300px;
  height: 300px;
`;

export const LabelWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  ${variables.flex({ direction: 'column' })}
`;

export const Label = styled.label`
  width: 300px;
  margin-bottom: 20px;
  ${variables.flex({ direction: 'row' })}

  span {
    display: inline-block;
    width: 80px;
  }
`;

export const InputBox = styled.input.attrs(props => ({
  type: props.inputType,
  name: props.name,
  required: true,
  minLength: props.length,
}))`
  border: 1px solid gray;
`;

export const SubmitBtn = styled.button.attrs({
  type: 'submit',
})`
  margin: 5px 0;
  border-radius: 120px;
  width: 200px;
  background-color: orange;
  cursor: ${props => props.cursor};
`;

export const GotoBtn = styled(SubmitBtn).attrs({ type: 'button' })`
  width: 80px;
  margin-left: 20px;
  background-color: lightgray;
`;
