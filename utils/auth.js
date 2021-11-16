import * as Keychain from "react-native-keychain";

export const authMiddleware = async (creds) => {
  const { username, password } = creds;
  console.log(username);
  console.log(password);

  // Store the credentials
  await Keychain.setGenericPassword(username, password);

  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        "Credentials successfully loaded for user " + credentials.username
      );
    } else {
      console.log("No credentials stored");
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
  await Keychain.resetGenericPassword();
};
