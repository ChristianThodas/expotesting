import * as SecureStore from "expo-secure-store";
import type { TokenCache } from "@clerk/clerk-expo";

const tokenCache: TokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },

  async saveToken(key, value) {
    try {
      if (value) await SecureStore.setItemAsync(key, value);
      else await SecureStore.deleteItemAsync(key);
    } catch {
      //
    }
  },
};

export default tokenCache;