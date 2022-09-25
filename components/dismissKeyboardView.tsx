import React from "react";
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

interface Props {
    children: React.ReactNode
}

const DismissKeyboardView: React.FC<Props> = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {children}
        </TouchableWithoutFeedback>
    )
};

export default DismissKeyboardView