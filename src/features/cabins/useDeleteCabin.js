import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: handleDelete } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ["cabins"] });
      toast.success("Cabin successfully deleted.");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, handleDelete };
}
