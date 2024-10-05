import { atom } from "recoil";

const skeletonConversations = [1, 2, 3, 4, 5];

export const conversationAtom = atom({
    key: 'conversationAtom',
    default: skeletonConversations,
})

const selectedConversationDefault = {
    _id: "",
    userId: "",
    username: "",
    userProfilePic: "",
}
export const selectedConversationAtom = atom({
    key: 'selectedConversationAtom',
    default: selectedConversationDefault,
})