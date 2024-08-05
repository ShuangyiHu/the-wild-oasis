import supabase, { supabaseUrl } from "./supabase";
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  //if there is no session (no local storage)
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null; //no user logged in
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. update fullname or password (cuz we use 2 forms for them)
  let dataToUpdate;

  if (password) dataToUpdate = { password };
  if (fullName) dataToUpdate = { data: { fullName } };

  const { data, error: updateErr } = await supabase.auth.updateUser(
    dataToUpdate
  );
  if (updateErr) throw new Error(updateErr.message);
  console.log("data to update:", data);
  if (!avatar) return data;
  //2.upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageErr } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageErr) throw new Error(storageErr.message);

  //3.update avatar in user data

  const { data: updatedUser, error: avatarErr } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarErr) throw new Error(avatarErr.message);
  return updatedUser;
}
