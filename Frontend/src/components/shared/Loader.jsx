
import React from 'react';
import { motion } from 'framer-motion';
import styles from './shared.module.css';

const Loader = ({
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  const loaderClasses = [
    styles.loader,
    styles[size],
    styles[`color-${color}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={loaderClasses}>
      <motion.div
        className={styles.spinnerRing}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Loader;