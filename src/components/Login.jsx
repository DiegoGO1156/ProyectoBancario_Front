import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../shared/hooks/useLogin';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const blobVariants = {
  animate: {
    x: [0, -50, 0],
    y: [0, -30, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const gradientVariants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const LoginForm = ({ onLogin, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onLogin(email, password);
    if (result.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#E7EAEF] relative overflow-hidden">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, ${['#EDC5AB', '#E7EAEF', '#8B9D77'].join(', ')})`,
          backgroundSize: '400% 400%'
        }}
        variants={gradientVariants}
        animate="animate"
      />

      {/* Blobs decorativos */}
      <motion.div 
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#EDC5AB] rounded-full filter blur-3xl opacity-20 z-0"
        variants={blobVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute -bottom-60 -right-60 w-[600px] h-[600px] bg-[#8B9D77] rounded-full filter blur-3xl opacity-20 z-0"
        variants={blobVariants}
        animate="animate"
      />

      <motion.div 
        className="w-full max-w-md z-10 bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          className="text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold text-[#217074] mb-2"
            variants={itemVariants}
          >
            Brigada Digital
          </motion.h2>
          <motion.p 
            className="text-sm text-[#8B9D77]"
            variants={itemVariants}
          >
            Bienvenido de nuevo, por favor inicia sesión
          </motion.p>
        </motion.div>

        {error && (
          <motion.div 
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
          >
            {error}
          </motion.div>
        )}

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#37745B]"
            >
              Correo Electrónico
            </label>
            <motion.input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8B9D77] focus:outline-none transition-all duration-200"
              required
              whileFocus={{ 
                scale: 1.01,
                boxShadow: '0 0 0 2px #8B9D77'
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#37745B]"
            >
              Contraseña
            </label>
            <motion.input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8B9D77] focus:outline-none transition-all duration-200"
              required
              whileFocus={{ 
                scale: 1.01,
                boxShadow: '0 0 0 2px #8B9D77'
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg shadow-md text-white font-semibold bg-[#217074] hover:bg-[#37745B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B9D77] disabled:opacity-60 transition-all duration-150"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Iniciando sesión...
                </motion.span>
              ) : (
                'Iniciar Sesión'
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div 
          className="mt-6 text-center text-sm text-[#8B9D77]"
          variants={itemVariants}
        >
          ¿No tienes cuenta?{' '}
          <motion.span 
            className="text-[#37745B] font-medium cursor-pointer hover:underline transition-all duration-200"
            whileHover={{ color: '#217074' }}
          >
            Regístrate
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;