import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 0.8fr 1.2fr;
  /* gap: 2.4rem; */

  padding: 1.2rem 0;

  /* max-width: 50rem; */

  ${(props) =>
    props.type === "vertical" &&
    css`
      display: flex;
      flex-direction: column;
    `}

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    ${(props) =>
      props.type === "login" &&
      css`
        display: flex;
        justify-content: center;
      `}
  }
`;
// FormRow.defaultProps = {
//   type: "horizontal",
// };
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ children, label, error }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error.message}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
