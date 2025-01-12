import { Drawer, Grid, Skeleton } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useError, useSocketEvents } from '../../hooks/hook.jsx'
import { getSocket } from '../../socket.jsx'
import { useAvailableFriendsQuery, useMyChatsQuery } from '../../store/api/apiSlice.js'
import { increaseNotificationCount, setNewNotificationAlert } from '../../store/reducers/chatSlice.js'
import { setDeleteMenu, setMobile, setSelectedDeleteChat } from '../../store/reducers/miscSlice.js'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../constants/event.js'
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx'
import { saveOrGetLocalStorage } from '../lib/features.js'
import Title from '../shared/Title.jsx'
import ChatList from '../specific/ChatList.jsx'
import Profile from '../specific/Profile.jsx'
import Header from './Header'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const { chatId } = useParams()
        const socket = getSocket()
        const dispatch = useDispatch()
        const deleteMenuRef = useRef(null)
        const navigate = useNavigate()

        const [onlineUsers, setOnlineUsers] = useState([])

        const { isMobile } = useSelector(state => state.misc)
        const { user } = useSelector(state => state.auth)
        const { newMessageAlert } = useSelector(state => state.chat)

        const { refetch, isError, isLoading, error, data } = useMyChatsQuery("")
        const availableFriends = useAvailableFriendsQuery("")

        const availableFriendsId = availableFriends?.data?.friends.map((friend) => friend?._id)

        const handleMobileClose = () => dispatch(setMobile(false))

        const handleChatDelete = (e, _id, groupChat) => {
            dispatch(setDeleteMenu(true))
            dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }))
            deleteMenuRef.current = e.currentTarget;
        }

        const newMessageAlertHandler = useCallback((data) => {
            if (chatId === data.chatId) return
            dispatch(setNewNotificationAlert(data))
        }, [chatId])


        const newRequestHandler = useCallback(() => {
            dispatch(increaseNotificationCount())
        }, [dispatch])

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
        }, [refetch, navigate]);

        const onlineUserListner = useCallback((data) => {
            setOnlineUsers(data)
        }, [onlineUsers])

        const eventHandler = {
            [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
            [NEW_REQUEST]: newRequestHandler,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUserListner
        };

        useSocketEvents(socket, eventHandler);

        useError([
            { isError, error },
            { isError: availableFriends.isError, error: availableFriends.error }
        ])

        useEffect(() => {
            saveOrGetLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert })
        }, [newMessageAlert])

        useEffect(() => {
            socket.emit(ONLINE_USERS, { members: availableFriendsId })
        }, [])


        return (
            <>
                <Title />
                <Header />

                {isLoading ? <Skeleton /> :
                    (<Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList chats={data?.chats} chatId={chatId} onlineUsers={onlineUsers} handleChatDelete={handleChatDelete} />
                    </Drawer>)}

                <DeleteChatMenu deleteAnchorMenu={deleteMenuRef} dispatch={dispatch} />

                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: "none", sm: "block" },
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }}
                        height={"100%"}
                    >
                        {isLoading ?
                            (<Skeleton />) :
                            (<ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                newMessagesAlert={newMessageAlert}
                                handleChatDelete={handleChatDelete}
                                onlineUsers={onlineUsers}
                            />
                            )}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={6}
                        height={"100%"}
                        padding={"1rem"}
                    >
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        lg={3}
                        sx={{
                            display: { xs: "none", md: "block" },
                            p: 2,
                            bgcolor: "rgba(0,0,0,0.85)"
                        }}
                        height={"100%"}>
                        <Profile user={user} />
                    </Grid>
                </Grid>
                {/* <Footer /> */}
            </>
        )
    }
}

export default AppLayout