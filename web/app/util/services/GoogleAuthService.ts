import { IProvidedUser } from "~/types";
import { IAuthProvider } from "../auth-provider";
import firebase from "../config/firebase";
import { LocalStorageService } from "./LocalStorageService.client";
import { t } from "i18next";

class GoogleAuthService implements IAuthProvider {
  async login(): Promise<string | null> {
    console.log("[GoogleAuthService] Starting Google login...");
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const { user, credential } = await firebase
        .auth()
        .signInWithPopup(provider);
      console.log("[GoogleAuthService] Firebase signInWithPopup response:", {
        user,
        credential,
      });

      const { idToken } = credential as firebase.auth.OAuthCredential;

      if (!idToken || !user) {
        console.error(
          "[GoogleAuthService] Missing idToken or user in response"
        );
        throw new Error(t("error.googleSignInError") as string);
      }

      const providedUser: IProvidedUser = {
        email: user?.email ?? "",
        name: user?.displayName ?? "",
        picture: user?.photoURL ?? "",
      };

      console.log(
        "[GoogleAuthService] Storing user in LocalStorage:",
        providedUser
      );
      LocalStorageService.set("user", providedUser);

      return idToken;
    } catch (error) {
      console.error("[GoogleAuthService] Error during Google sign-in:", error);
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
