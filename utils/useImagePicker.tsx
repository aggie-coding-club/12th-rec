import React from "react";
import * as ImagePicker from 'expo-image-picker';

export default function useImagePicker() {
    const getImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        })

        if(image["cancelled"]) return

        const response = await fetch(image["uri"]);
        const blob = await response.blob();
        const newFile = new File([blob], `profilePic.png`, {
            type: "image/png",
        })

        return newFile
    }

    return () => getImage()
}