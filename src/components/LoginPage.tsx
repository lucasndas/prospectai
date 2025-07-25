import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.user) {
          console.log('Login realizado com sucesso:', data.user);
          navigate('/');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          setError('Verifique seu email para confirmar o cadastro.');
        }
      }
    } catch (error: any) {
      setError(error.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });
      
      if (error) throw error;
      
      // O redirecionamento será automático
    } catch (error: any) {
      setError(error.message || 'Erro ao fazer login com Google. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Ilustração */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Formas geométricas animadas */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 bg-orange-300 rounded-lg opacity-30"
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Conteúdo principal */}
        <div className="flex flex-col justify-center items-center text-white p-12 z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Bem-vindo ao
              <span className="block text-orange-400">ProspectAI</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-md">
              Transforme seus dados em insights poderosos com inteligência artificial avançada
            </p>
            
            {/* Ícones flutuantes */}
            <div className="flex justify-center space-x-8 mt-12">
              <motion.div
                className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Lock className="w-8 h-8 text-orange-400" />
              </motion.div>
              <motion.div
                className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="w-8 h-8 text-orange-400" />
              </motion.div>
              <motion.div
                className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-8 h-8 text-orange-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Lado direito - Formulário */}
      <motion.div 
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {isLogin ? 'Entrar na Conta' : 'Criar Conta'}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {isLogin 
                  ? 'Acesse sua conta para continuar' 
                  : 'Crie sua conta para começar'
                }
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Nome Completo
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Digite seu nome completo"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
              
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Digite seu email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                      Lembrar de mim
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {isLogin ? 'Entrar' : 'Criar Conta'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com Google
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-gray-600">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              </span>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                className="ml-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                {isLogin ? 'Criar conta' : 'Fazer login'}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;