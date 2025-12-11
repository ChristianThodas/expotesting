import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '../components/SignOutButton'

export default function Home() {
  const { user } = useUser()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <SignedIn>
        <Text
          style={{
            fontSize: 56,
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          🎉 CONGRATS 🎉
        </Text>

        <Text
          style={{
            fontSize: 36,
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          YOU ARE SIGNED IN
        </Text>

        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          {user?.emailAddresses[0].emailAddress}
        </Text>

        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '900',
            color: 'red',
            marginBottom: 24,
          }}
        >
          ❌ NOT SIGNED IN
        </Text>

        <Link href="/(auth)/sign-in">
          <Text style={{ fontSize: 24, marginBottom: 12 }}>
            → Sign in
          </Text>
        </Link>

        <Link href="/(auth)/sign-up">
          <Text style={{ fontSize: 24 }}>
            → Sign up
          </Text>
        </Link>
      </SignedOut>
    </View>
  )
}
