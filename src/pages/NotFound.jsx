import { Error as ErrorIcon } from '@mui/icons-material'
import { Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(5)
    useEffect(() => {
        if (countdown === 0) {
            navigate("/")
        }

        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown, navigate]);

    return (
        <Container maxWidth="lg" sx={{
            height: '100vh',
        }}>
            <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <ErrorIcon sx={{ fontSize: '10rem' }} />
                <Typography variant='h1'>404</Typography>
                <Typography variant='h3'>Not Found</Typography>
                <Typography variant='caption'>Redirect to home in {countdown}'s</Typography>
            </Stack>
        </Container>
    )
}

export default NotFound