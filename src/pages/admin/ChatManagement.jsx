import { Avatar, Skeleton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { transformImage } from '../../components/lib/features'
import AvatarCard from '../../components/shared/AvatarCard'
import Table from '../../components/shared/Table'
import { useError } from '../../hooks/hook'
import { useChatManagementQuery } from '../../store/api/adminApiSlice'

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'table-header',
        width: 200
    },
    {
        field: 'avatar',
        headerName: 'Avatar',
        headerClassName: 'table-header',
        width: 150,
        renderCell: (params) => (
            <Stack direction={'row'} alignItems={'center'} height={'100%'}>
                <AvatarCard avatar={params.row.avatar} />
            </Stack>
        )
    },
    {
        field: 'name',
        headerName: 'Name',
        headerClassName: 'table-header',
        width: 300
    },
    {
        field: 'members',
        headerName: 'Members',
        headerClassName: 'table-header',
        width: 400,
        renderCell: (params) => (
            <Stack direction={'row'} alignItems={'center'} height={'100%'}>
                <AvatarCard avatar={params.row.members} max={100} />
            </Stack>
        )
    },
    {
        field: 'totalMessages',
        headerName: 'Total Messages',
        headerClassName: 'table-header',
        width: 120
    },
    {
        field: 'creator',
        headerName: 'Created By',
        headerClassName: 'table-header',
        width: 250,
        renderCell: (params) => (
            <Stack direction={'row'} alignItems={'center'} height={'100%'} spacing={'1rem'}>
                <Avatar src={params.row.creator.avatar} alt={params.row.creator.name} />
                <span>{params.row.creator.name}</span>
            </Stack>
        )
    },
]

const ChatManagement = () => {
    const { data, isError, isLoading, error } = useChatManagementQuery("");
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data?.chats.map((i) => ({
                ...i,
                avatar: i?.avatar?.map((url) => transformImage(url, 50)),
                members: i?.members?.map(({ avatar }) => transformImage(avatar, 50)),
                creator: {
                    name: i.creator.name,
                    avatar: transformImage(i.creator.avatar, 50)
                }
            })))
        }
    }, [data])

    useError([{ isError: isError, error: error }])

    return (<AdminLayout>
        {isLoading ? <Skeleton height={"100%"} /> : <Table heading={'All Chats'} rows={rows} columns={columns} />}
    </AdminLayout>
    )
}

export default ChatManagement