import * as ImagePicker from 'expo-image-picker';

export default function useImagePicker() {
    const getImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true
        })

        if(image["cancelled"]) return

        return image
    }

    return () => getImage()
}