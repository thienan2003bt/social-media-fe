import { Flex, Image, Link, useColorMode } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import LogoutButton from './LogoutButton';
import authScreenAtom from '../atoms/authAtom';
import { BsFillChatQuoteFill } from 'react-icons/bs';

function Header() {
    const {colorMode, toggleColorMode} = useColorMode();
    const user = useRecoilValue(userAtom);

    const setAuthScreen = useSetRecoilState(authScreenAtom);
    return (
        <Flex className='component-header' justifyContent={"space-between"} w="48vw" mt={"6"} mb={"12"}>
            
            {user.username
            ? <Link as={RouterLink} to={"/"}>
                <AiFillHome size={24}/>
            </Link>
            : <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
                Login
            </Link>
            }
            
            <Image cursor={"pointer"} alt='logo' w={'6'}
            src={colorMode === "dark" ? '/light-logo.svg' : '/dark-logo.svg'}
            onClick={() => toggleColorMode()}
            />

            {user.username
            ? <Flex alignItems={"center"} gap={4}>
                <Link as={RouterLink} to={`/${user?.username}`}>
                    <RxAvatar size={20}/>
                </Link>

                <Link as={RouterLink} to={`/chat`}>
                    <BsFillChatQuoteFill size={20}/>
                </Link>
                <LogoutButton />
            </Flex>
            : <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
                Sign up
            </Link>
            }
        </Flex>
    );
}

export default Header;