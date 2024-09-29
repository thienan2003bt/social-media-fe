import UserHeader from '../components/user/UserHeader';
import UserPost from '../components/user/UserPost';

function UserPage() {
    return (
        <div>
            <UserHeader />
            <UserPost likes={132} replies={465} postImg={"/post1.png"} postTitle={"It's my first ever post on Threads."}/>
            <UserPost likes={798} replies={301} postImg={"/post2.png"} postTitle={"It's my first ever post on Threads."}/>
            <UserPost likes={132} replies={465} postImg={"/post3.png"} postTitle={"It's my first ever post on Threads."}/>
        </div>
    );
}

export default UserPage;