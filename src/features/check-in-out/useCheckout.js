import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoaing: isCheckingOut } = useMutation({
    //mutationFn can only accept one argument
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    //data is returned from mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out.`);
      //invalidate the current active query
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error while checking out."),
  });
  return { checkout, isCheckingOut };
}

export default useCheckout;
