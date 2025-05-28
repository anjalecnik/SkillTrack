import { IProvidedUser } from "~/types";
import { IAuthProvider } from "../auth-provider";
import firebase from "../config/firebase";
import { LocalStorageService } from "./LocalStorageService.client";
import { t } from "i18next";

class GoogleAuthService implements IAuthProvider {
  async login(): Promise<string | null> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const { user, credential } = await firebase
        .auth()
        .signInWithPopup(provider);
      const { idToken } = credential as firebase.auth.OAuthCredential;

      if (!idToken || !user) {
        throw new Error(t("error.googleSignInError") as string);
      }

      const providedUser: IProvidedUser = {
        email: user?.email ?? "",
        name: user?.displayName ?? "",
        picture: user?.photoURL ?? "",
      };

      LocalStorageService.set("user", providedUser);

      return idToken;
    } catch {
      throw new Error(t("error.googleSignInError") as string);
    }
  }
  async logout() {
    try {
      LocalStorageService.remove("user");
      await firebase.auth().signOut();
    } catch {
      throw new Error(t("error.googleSignOutError") as string);
    }
  }

  getUser(): IProvidedUser | null {
    const user = LocalStorageService.get<IProvidedUser>("user");
    return user;
  }
}

export default new GoogleAuthService();
