import { Alert } from 'react-native';

export function showAlert(dialogueMessage) {
    // console.log(dialogueMessage);
    return new Promise((resolve, reject) => {
        Alert.alert(
            dialogueMessage,
            '',
            [
                { text: 'Yes', onPress: () => resolve('yes') },
                { text: 'No', onPress: () => resolve('no') }
            ],
            { cancelable: true }
        )
    })
}