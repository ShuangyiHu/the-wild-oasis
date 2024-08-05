import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, handleUpdateSetting } = useUpdateSetting();
  function onHandleUpdateSetting(e, field) {
    const { value } = e.target;
    if (!value) return;
    handleUpdateSetting({ [field]: value });
  }
  const isWorking = isLoading || isUpdating;
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isWorking}
          onBlur={(e) => onHandleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isWorking}
          onBlur={(e) => onHandleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isWorking}
          onBlur={(e) => onHandleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isWorking}
          onBlur={(e) => onHandleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
      <button disabled={isWorking}>Update</button>
    </Form>
  );
}

export default UpdateSettingsForm;
