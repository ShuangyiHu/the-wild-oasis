import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins data could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://yseskwtrzyoolmkdvyrd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //create cabin
  //to make sure the name is unique;
  //and not to create new folders (/)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //(A) create
  if (!id)
    query = query.insert([
      {
        ...newCabin,
        image: imagePath,
      },
    ]);

  //(B) edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  // single is to return the new row data immediately
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;
  //upload image only if it is newly created

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //if error, delete new cabin from datatable
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    toast.error(storageError.message);
    throw new Error("Image upload failed and could not create new cabin.");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
