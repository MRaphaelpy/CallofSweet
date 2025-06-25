import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Box,
    Typography,
    CircularProgress,
    TablePagination,
    Tooltip,
    Rating
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

const ProductList = ({ products, loading, onEdit, onDelete, onView }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getCategoryLabel = (category) => {
        const categories = {
            'CHOCOLATE': 'Chocolate',
            'CANDY': 'Doces',
            'BISCUIT': 'Biscoitos',
            'DESSERT': 'Sobremesas',
            'DRINK': 'Bebidas',
            'OTHER': 'Outros'
        };
        return categories[category] || category;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!products || products.length === 0) {
        return (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="subtitle1">
                    Nenhum produto cadastrado.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={3}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Avaliação</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow key={product.id} hover>
                                    <TableCell>
                                        {product.imageUrl ? (
                                            <Box
                                                component="img"
                                                src={product.imageUrl}
                                                alt={product.name}
                                                sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    bgcolor: 'grey.200',
                                                    borderRadius: 1,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Typography variant="caption" color="text.secondary">
                                                    Sem imagem
                                                </Typography>
                                            </Box>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand || '-'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getCategoryLabel(product.category)}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(product.price)}
                                    </TableCell>
                                    <TableCell>
                                        <Rating
                                            value={product.rating || 0}
                                            readOnly
                                            precision={0.5}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {product.active ? (
                                            <Chip
                                                icon={<VisibilityIcon fontSize="small" />}
                                                label="Ativo"
                                                size="small"
                                                color="success"
                                            />
                                        ) : (
                                            <Chip
                                                icon={<VisibilityOffIcon fontSize="small" />}
                                                label="Inativo"
                                                size="small"
                                                color="error"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ '& > button': { m: 0.5 } }}>
                                            <Tooltip title="Ver detalhes">
                                                <IconButton
                                                    size="small"
                                                    color="info"
                                                    onClick={() => onView(product)}
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Editar">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => onEdit(product)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Excluir">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => onDelete(product.id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Itens por página:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                }
            />
        </Paper>
    );
};

export default ProductList;