import { Avatar, Skeleton, Stack } from '@mui/material'
import moment from 'moment'
import React, { lazy, useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { fileformatter, transformImage } from '../../components/lib/features'
import RenderAttachment from '../../components/shared/RenderAttachment'
import { useError } from '../../hooks/hook'
import { useMessagesManagementQuery } from '../../store/api/adminApiSlice'

const Table = lazy(() => import('../../components/shared/Table'))

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'table-header',
        width: 200
    },
    {
        field: 'attachments',
        headerName: 'Attachments',
        headerClassName: 'table-header',
        width: 200,
        renderCell: (params) => {
            const { attachments } = params.row
            return attachments.length > 0 ? attachments.map((i) => {
                const url = i.url
                const file = fileformatter(url)
                return <Stack direction={'row'} height={"100%"} alignItems={'center'}>
                    <a
                        download
                        target='_blank'
                        style={{
                            color: 'black',
                            height: '100%'
                        }}
                    >
                        {RenderAttachment(file, url)}
                    </a>
                </Stack>

            }) : 'No Attachments'
        }
    },
    {
        field: 'content',
        headerName: 'Content',
        headerClassName: 'table-header',
        width: 400,
        renderCell: (params) => {
            const { content } = params.row
            return content ? content : "No Message"
        }
    },
    {
        field: 'sender',
        headerName: 'Sent By',
        headerClassName: 'table-header',
        width: 200,
        renderCell: (params) => (
            <Stack direction={'row'} alignItems={'center'} height={'100%'} spacing={'1rem'}>
                <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
                <span>{params.row.sender.name}</span>
            </Stack>
        )
    },
    {
        field: 'chat',
        headerName: 'Chat',
        headerClassName: 'table-header',
        width: 220
    },
    {
        field: 'groupChat',
        headerName: 'Group Chat',
        headerClassName: 'table-header',
        width: 100
    },
    {
        field: 'createdAt',
        headerName: 'Time',
        headerClassName: 'table-header',
        width: 250
    },
]

const MessageManagement = () => {
    const { data, isError, isLoading, error } = useMessagesManagementQuery("")

    const [rows, setRows] = useState([])

    useEffect(() => {
        if (data) {
            setRows(data?.messages.map((i) => ({
                ...i,
                sender: {
                    ...i.sender,
                    avatar: transformImage(i.sender.avatar)
                },
                createdAt: moment(i.createdAt).format('lll'),
            })))
        }
    }, [data])

    useError([{ isError: isError, error: error }])

    return (<AdminLayout>
        {isLoading ? <Skeleton height={"100%"} /> : <Table heading={'All Messages'} rows={rows} columns={columns} rowHeight={200} />
        }
    </AdminLayout>
    )
}


export default MessageManagement