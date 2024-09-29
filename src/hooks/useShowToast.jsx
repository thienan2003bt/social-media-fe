import { useToast } from "@chakra-ui/react"

function useShowToast() {
    const toast = useToast();
    const showToast = (title, description, status, duration = 3000) => {
        toast({title, description, status, duration, isClosable: true});
    }

    return showToast;
}


export default useShowToast;