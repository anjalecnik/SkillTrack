import { publicClient, refreshClient } from "~/util/api";
import GoogleAuthService from "~/util/services/GoogleAuthService";
import { LocalStorageService } from "~/util/services";
import { AUTH_URL } from "~/constants";
import { IAccessToken, UserRoles, IProvidedUser } from "~/types";
import { getDecodedToken } from "~/util";
import { redirect } from "@remix-run/node";

export class AuthClient {
  static async signInWithGoogleProvider(): Promise<string | null> {
    return GoogleAuthService.login();
  }

  static async signInWithGoogle(idToken: string): Promise<IAccessToken> {
    const { data } = await publicClient.post<IAccessToken>(
      `${AUTH_URL}/google/login`,
      {
        idToken,
      }
    );
    return data;
  }

  static getUserFromStorage(): IProvidedUser | null {
    return LocalStorageService.get<IProvidedUser>("user");
  }

  static getUserRole(): UserRoles {
    const decodedToken = getDecodedToken();

    if (!decodedToken.user.role) {
      throw redirect("/user-hub");
    }
    return decodedToken.user.role;
  }

  static clearStorage(): void {
    LocalStorageService.remove("user");
    LocalStorageService.remove("token");
    LocalStorageService.remove("refreshToken");
  }

  static async refreshToken(): Promise<IAccessToken> {
    const { data } = await refreshClient.post<IAccessToken>(
      `${AUTH_URL}/refresh`,
      {
        refreshToken: LocalStorageService.getString("refreshToken"),
      }
    );
    return data;
  }
}
