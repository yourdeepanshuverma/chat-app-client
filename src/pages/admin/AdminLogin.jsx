import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CircleLoader } from "../../components/Loaders";
import { backgroudGradiant } from '../../components/constants/color';
import { getAdmin, loginAdmin } from '../../store/reducers/adminSlice';

const AdminLogin = () => {

    const { isAdmin } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { secretkey: "" } });

    const handleLogin = (data) => {
        setIsLoading(true);
        dispatch(loginAdmin(data.secretkey));
        setIsLoading(false)
    };


    useEffect(() => {
        dispatch(getAdmin())
    }, [dispatch])

    if (isAdmin) return <Navigate to={"/admin/dashboard"} />

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                px: {
                    xs: 4,
                    sm: 6,
                    lg: 8,
                },
                py: {
                    xs: 10,
                    sm: 16,
                    lg: 24,
                },
                backgroundImage: backgroudGradiant
            }}>
            <Paper
                elevation={8}
                sx={{
                    mx: "auto",
                    p: 4,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1,
                    maxWidth: {
                        lg: 300,
                        xl: 600,
                    },

                }}>
                <Stack>
                    <Typography>
                        Admin Login
                    </Typography>
                </Stack>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <Stack spacing={2}>
                        {/* Secretkey */}
                        <TextField
                            label="secretkey"
                            type="password"
                            placeholder="Secret Key"
                            variant="standard"
                            focused
                            fullWidth
                            helperText={errors?.secretkey?.message}
                            inputProps={{
                                ...register("secretkey")
                            }}
                        />

                        {/* SUBMIT */}
                        <Button
                            type="submit"
                            startIcon={<LoginIcon />}
                            disabled={isLoading}
                        >
                            Welcome
                        </Button>
                    </Stack>
                </Box>
            </Paper>
            {isLoading && <CircleLoader />}
        </Box >
    )
}

export default AdminLogin