import { Avatar, Skeleton, Stack, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { transformImage } from '../../components/lib/features'
import Table from '../../components/shared/Table'
import { useError } from '../../hooks/hook'
import { useUserManagementQuery } from '../../store/api/adminApiSlice'

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
                <Avatar alt={params.row.name} src={params.row.avatar} />
            </Stack>
        )
    },
    {
        field: 'name',
        headerName: 'Name',
        headerClassName: 'table-header',
        width: 200
    },
    {
        field: 'username',
        headerName: 'Username',
        headerClassName: 'table-header',
        width: 200
    },
    {
        field: 'friends',
        headerName: 'Friends',
        headerClassName: 'table-header',
        width: 150
    },
    {
        field: 'groups',
        headerName: 'Groups',
        headerClassName: 'table-header',
        width: 150
    },
]

const UserManagement = () => {
    const { data, isError, isLoading, error } = useUserManagementQuery("")

    const [rows, setRows] = useState([])

    useEffect(() => {
        if (data) {
            setRows(data?.users.map((i) => ({
                ...i,
                avatar: transformImage(i.avatar.url, 50)
            })))
        }
    }, [data])

    useError([{ isError: isError, error: error }])

    return (<AdminLayout>
        {isLoading ? <Skeleton height={"100%"} /> : <Table heading={'All Users'} columns={columns} rows={rows} />
        }
    </AdminLayout>
    )
}

export default UserManagement