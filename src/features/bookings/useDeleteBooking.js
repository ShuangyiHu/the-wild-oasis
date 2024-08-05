import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: handleDelete } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      // queryClient.invalidateQueries({ querykey: ["bookings"] });
      queryClient.invalidateQueries({ active: true });
      toast.success("Booking successfully deleted.");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, handleDelete };
}
