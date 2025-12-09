import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setError(null);

    try {
      const attempt = await signIn.create({
        identifier: email,
        password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });

        // 🔥 IMPORTANT: in your project, the "home" is (tabs), not "/"
        router.replace("/(tabs)");
      } else {
        console.log("SIGN IN NOT COMPLETE:", attempt);
        setError("Sign in not complete. Check Clerk dashboard config.");
      }
    } catch (err: any) {
      console.log("SIGN IN ERROR:", JSON.stringify(err, null, 2));
      setError("Sign in failed. Check email/password or Clerk setup.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Sign In</Text>

      {error && (
        <Text style={{ color: "red", marginBottom: 8 }}>
          {error}
        </Text>
      )}

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 16 }}
      />

      <TouchableOpacity
        onPress={onSignInPress}
        style={{
          backgroundColor: "black",
          paddingVertical: 10,
          alignItems: "center",
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
