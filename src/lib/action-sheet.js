import { ActionSheetIOS } from 'react-native'

export default (fn) => {
  ActionSheetIOS.showActionSheetWithOptions({
    title: 'Are you sure?',
    options: ['Yes', 'Nope, my bad'],
    destructiveButtonIndex: 0,
    cancelButtonIndex: 1
  }, async (buttonIndex) => {
    if (buttonIndex === 0) {
      fn()
    }
  })
}
