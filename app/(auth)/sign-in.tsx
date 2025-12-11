import { View, Text, TouchableOpacity, Alert } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
  const router = useRouter()

  const { startOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  })

  const onGooglePress = async () => {
    try {
      console.log('Starting Google OAuth')

      const redirectUrl = Linking.createURL('/')

      console.log('Redirect URL:', redirectUrl)

      const result = await startOAuthFlow({
        redirectUrl,
      })

      console.log('OAuth result:', result)

      const { createdSessionId, setActive } = result

      if (!createdSessionId) {
        Alert.alert('OAuth failed', 'No session created')
        return
      }

      await setActive!({ session: createdSessionId })

      console.log('Session activated')

      router.replace('/')
    } catch (err: any) {
      console.error('Google OAuth error', err)
      Alert.alert(
        'Google OAuth ERROR',
        JSON.stringify(err, null, 2)
      )
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={onGooglePress}
        style={{
          backgroundColor: '#4285F4',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  )
}