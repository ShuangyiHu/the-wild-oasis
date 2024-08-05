import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoaing: isCheckingIn } = useMutation({
    //mutationFn can only accept one argument
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    //data is returned from mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);
      //invalidate the current active query
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in."),
  });
  return { checkin, isCheckingIn };
}

export default useCheckin;
