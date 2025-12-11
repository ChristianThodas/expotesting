import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    <TouchableOpacity
      onPress={async () => {
        await signOut()
        Linking.openURL(Linking.createURL('/'))
      }}
    >
      <Text>Sign out</Text>
    </TouchableOpacity>
  )
}