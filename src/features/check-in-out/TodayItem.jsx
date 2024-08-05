import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  const { id, guests, numNights, status } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">ARRIVING</Tag>}
      {status === "checked-in" && <Tag type="blue">DEPARTING</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <span>{numNights} nights</span>
      {status === "unconfirmed" && (
        <Button
          as={Link}
          size="small"
          variation="primary"
          to={`/checkin/${id}`}
        >
          CHECK IN
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
