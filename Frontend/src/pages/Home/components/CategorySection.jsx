import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import './CategorySection.css';

const CategorySection = ({ categories }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {categories.map((category, index) => (
        <Grid item key={index}>
          <motion.div
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 10px 20px rgba(156, 39, 176, 0.2)' 
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Button 
              variant="outlined" 
              className="category-button"
            >
              <Typography variant="h5" className="category-icon">{category.icon}</Typography>
              <Typography className="category-name">{category.name}</Typography>
            </Button>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySection;