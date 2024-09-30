import { useState } from "react";
import useShowToast from "./useShowToast";

function usePreviewImage() {
    const [imageUrl, setImageUrl] = useState(null);  
    const showToast = useShowToast();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if(file && file.type.startsWith("image/") === true) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            }

            reader.readAsDataURL(file);
        } else {
            setImageUrl(null);
            return showToast("Invalid image type!", "Please select an image file", "error")
        }
    }
    return {handleImageChange, imageUrl};
}

export default usePreviewImage;