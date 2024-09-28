import { Flex, Image, useColorMode } from '@chakra-ui/react';

function Header() {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Flex className='component-header' justifyContent={"center"} w="48vw" mt={"6"} mb={"12"}>
            <Image cursor={"pointer"} alt='logo' w={'6'}
            src={colorMode === "dark" ? '/light-logo.svg' : '/dark-logo.svg'}
            onClick={() => toggleColorMode()}
            />
        </Flex>
    );
}

export default Header;