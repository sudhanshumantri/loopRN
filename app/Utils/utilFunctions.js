import { Alert } from 'react-native';

export function showAlert(dialogueMessage) {
   // console.log(dialogueMessage);
    return new Promise((resolve, reject) => {
        Alert.alert(
            dialogueMessage,
            '',
            [
                { text: 'OK', onPress: () => resolve('confirmed') }
            ],
            { cancelable: false }
        )
    })
}