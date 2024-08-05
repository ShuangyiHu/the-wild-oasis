import styled from "styled-components";

//can receive props the regular html can, eg. onClick
export const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
`;
