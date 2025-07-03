import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Divider,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    InputAdornment,
    Chip,
    useTheme,
    alpha
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    Send,
    Instagram,
    Facebook,
    LinkedIn,
    WhatsApp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export const ContactPage = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const locations = [
        {
            title: "Loja Principal",
            address: "Rua josivaldo matias leite, 677, Penaforte - CE",
            phone: "(88) 98187-0327",
            email: "mraphael.py@gmail.com",
            hours: "Seg-Sex: 9h-18h | Sáb: 9h-15h"
        },
        {
            title: "Fábrica",
            address: "Av. Antônio Angelim, 570 - Santo Antonio, Salgueiro - PE",
            phone: "(88) 98187-0327",
            email: "marcos.rafael@discente.univasf.edu.br",
            hours: "Seg-Sex: 8h-17h"
        },
    ];

    const socialMedia = [
        { icon: <Instagram />, name: "Instagram", link: "https://www.instagram.com/mraphael.py", color: "#E4405F" },
        { icon: <Facebook />, name: "Facebook", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", color: "#1877F2" },
        { icon: <WhatsApp />, name: "WhatsApp", link: "https://wa.me/5588981870327?text=Oi%20Rafael%20", color: "#25D366" },
        { icon: <LinkedIn />, name: "LinkedIn", link: "https://www.linkedin.com/in/mraphaelpy/", color: "#0077B5" },
    ];

    const faqItems = [
        {
            question: "Quem é você?",
            answer: "Sou Marcos Raphael, estudante de Ciência da Computação na UNIVASF, programador nas horas vagas (e nas horas não vagas também). Viciado em café, memes e em quebrar o código 3 segundos depois de arrumar."
        },
        {
            question: "O que você faz na faculdade?",
            answer: "Estudo algoritmos, redes, banco de dados e como sobreviver a semanas de prova com 2h de sono e 1 litro de café. Também aprendo a fazer sistemas que funcionam... na segunda tentativa (às vezes na terceira)."
        },
        {
            question: "O que é a UNIVASF?",
            answer: "A UNIVASF é a Universidade Federal do Vale do São Francisco. Fica no sertão, mas aqui a gente estuda tecnologia como se estivesse no Vale do Silício (só que com mais calor e menos startups)."
        },
        {
            question: "Você tem projetos próprios?",
            answer: "Tenho sim! Desde e-commerces até projetos que surgiram porque eu queria automatizar alguma tarefa besta. Se dá pra programar, eu tô testando. Se quebra, eu conserto. Se funciona... eu comemoro e versiono no Git."
        },
        {
            question: "Você já usou IA no seu código?",
            answer: "Sim, inclusive essa resposta talvez tenha sido gerada por uma IA. Ou será que eu digitei e ela corrigiUrr?. Nunca saberemos."
        },
        {
            question: "Planos para o futuro?",
            answer: "Virar dev full stack, construir umas ideias doidas, quem sabe trabalhar remoto com vista pro Rio São Francisco. Ah, e claro: dominar o mundo (mas devagar, que ainda tenho umas provas pra fazer)."
        },
        {
            question: "Você dorme?",
            answer: "Só quando o código compila sem erro… então quase nunca."
        },
        {
            question: "Qual seu editor favorito?",
            answer: "Uso VS Code porque abrir o Eclipse leva mais tempo que minha graduação inteira."
        },
        {
            question: "Quantos bugs você já resolveu?",
            answer: "Resolvi vários... inclusive uns que eu mesmo causei enquanto resolvia outro. É um ciclo sem fim, tipo Rei Leão, só que com stack trace."
        },
        {
            question: "Você sabe o que está fazendo?",
            answer: "Depende. Se for no Google, sei. Se for no código, talvez. Se for na vida... deixa pra próxima pergunta."
        },
        {
            question: "Qual linguagem você mais ama odiar?",
            answer: "Java. Amo pela estrutura, odeio pelos 32 arquivos pra fazer um 'Hello World'."
        },
        {
            question: "Você faz TCC?",
            answer: "Faço sim. O título é: 'Como manter a sanidade enquanto o Java tenta te convencer do contrário'."
        },
        {
            question: "React ou Flutter?",
            answer: "Tanto faz, desde que o botão funcione. Mas React quebra menos quando você olha pra ele."
        },
        {
            question: "Você sabe SQL?",
            answer: "SELECT café FROM vida WHERE sono = TRUE;"
        },
        {
            question: "Front ou back?",
            answer: "Sou full stack por necessidade, não por escolha. A vida me empurrou e o código aceitou."
        },
        {
            question: "Você vai se formar?",
            answer: "Com fé, café e um if (nota >= 5.0)."
        }
    ];


    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" component="h1" gutterBottom
                        sx={{
                            fontWeight: 700, background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>
                        Fale Conosco
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                        Estamos ansiosos para ouvir você! Envie uma mensagem ou visite uma de nossas lojas.
                    </Typography>
                </Box>
            </motion.div>

            <Grid container spacing={5}>

                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Typography variant="h5" gutterBottom fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn sx={{ mr: 1, color: theme.palette.primary.main }} />
                            Nossas Lojas
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {locations.map((location, index) => (
                                <Card
                                    key={index}
                                    elevation={2}
                                    sx={{
                                        borderRadius: 3,
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" color="primary.dark" gutterBottom fontWeight={600}>
                                            {location.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                            <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                                            <Typography variant="body1">{location.address}</Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                            <Phone fontSize="small" color="action" sx={{ mr: 1 }} />
                                            <Typography variant="body1">{location.phone}</Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                            <Email fontSize="small" color="action" sx={{ mr: 1 }} />
                                            <Typography variant="body1">{location.email}</Typography>
                                        </Box>

                                        <Chip
                                            label={location.hours}
                                            size="small"
                                            sx={{
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.dark,
                                                mt: 1
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Box mt={6}>
                                    <Typography variant="h5" gutterBottom fontWeight={600}>
                                        Perguntas Frequentes
                                    </Typography>

                                    <Box sx={{ mt: 3 }}>
                                        {faqItems.map((item, index) => (
                                            <Card
                                                key={index}
                                                sx={{
                                                    mb: 2,
                                                    borderRadius: 2,
                                                    boxShadow: 1,
                                                    transition: 'all 0.3s',
                                                    '&:hover': {
                                                        boxShadow: 3,
                                                        transform: 'translateY(-2px)'
                                                    }
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography variant="h6" color="primary" fontWeight={500}>
                                                        {item.question}
                                                    </Typography>
                                                    <Typography variant="body1" mt={1} color="text.secondary">
                                                        {item.answer}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>

                        <Box mt={4}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                Redes Sociais
                            </Typography>

                            <Grid container spacing={2} mt={1}>
                                {socialMedia.map((social, index) => (
                                    <Grid item xs={6} sm={3} key={index}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                startIcon={social.icon}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    py: 1.5,
                                                    color: social.color,
                                                    borderColor: alpha(social.color, 0.5),
                                                    '&:hover': {
                                                        borderColor: social.color,
                                                        backgroundColor: alpha(social.color, 0.1),
                                                    }
                                                }}
                                            >
                                                {social.name}
                                            </Button>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Box mt={4}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                Assine Nossa Newsletter
                            </Typography>

                            <Card sx={{ borderRadius: 2, mt: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <CardContent>
                                    <Typography variant="body1" mb={2}>
                                        Receba novidades, promoções e receitas exclusivas.
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Seu melhor e-mail"
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button variant="contained" sx={{ borderRadius: 1 }}>
                                                        Assinar
                                                    </Button>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};