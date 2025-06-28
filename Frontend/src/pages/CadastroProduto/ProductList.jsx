import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Chip, Box, Typography, CircularProgress, TablePagination, Tooltip, Rating
} from '@mui/material';
import {
    Edit as EditIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

const ProductList = ({ products, loading, onEdit, onDelete, onView }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getCategoryLabel = (category) => ({
        'CHOCOLATE': 'Chocolate',
        'CANDY': 'Doces',
        'BISCUIT': 'Biscoitos',
        'DESSERT': 'Sobremesas',
        'DRINK': 'Bebidas',
        'OTHER': 'Outros'
    }[category] || category);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!products?.length) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Nenhum produto cadastrado.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {[
                                'Imagem', 'Nome', 'Marca', 'Categoria',
                                'Preço', 'Avaliação', 'Status', 'Ações'
                            ].map((head) => (
                                <TableCell key={head} sx={{ fontWeight: 'bold' }}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product, index) => (
                                <TableRow key={product.id} hover sx={{ bgcolor: index % 2 ? 'grey.50' : 'white' }}>
                                    <TableCell>
                                        {product.imageUrl ? (
                                            <Box
                                                component="img"
                                                src={product.imageUrl}
                                                alt={product.name}
                                                sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
                                            />
                                        ) : (
                                            <Box sx={{
                                                width: 50, height: 50, bgcolor: 'grey.200', borderRadius: 1,
                                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    Sem imagem
                                                </Typography>
                                            </Box>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: 120 }}>{product.name}</TableCell>
                                    <TableCell>{product.brand || '-'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getCategoryLabel(product.category)}
                                            size="small"
                                            color="default"
                                            variant="outlined"
                                            sx={{
                                                bgcolor: 'grey.100',
                                                borderColor: 'grey.300',
                                                color: 'text.primary'
                                            }}
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
                                        <Chip
                                            icon={product.active ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                            label={product.active ? 'Ativo' : 'Inativo'}
                                            size="small"
                                            color={product.active ? 'success' : 'error'}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                            <Tooltip title="Editar">
                                                <IconButton size="small" color="primary" onClick={() => onEdit(product)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            {/* Ative se quiser deletar */}
                                            {/* <Tooltip title="Excluir">
                                                <IconButton size="small" color="error" onClick={() => onDelete(product.id)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip> */}
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
