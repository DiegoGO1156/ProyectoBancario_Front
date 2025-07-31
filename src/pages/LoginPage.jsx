import { useAuth } from '../shared/hooks/useLogin';
import LoginForm from '../components/Login';

const LoginPage = () => {
  const { loading, error, login } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-[#E7EAEF] overflow-hidden">
      {/* SVG blob */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#EDC5AB] rounded-full filter blur-3xl opacity-30 z-0 animate-pulse"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 z-10">
        <h1 className="text-center text-4xl font-extrabold text-[#217074] tracking-tight">
          Brigada Digital
        </h1>
        <p className="mt-2 text-center text-sm text-[#8B9D77]">
          Bienvenido de nuevo, por favor inicia sesión
        </p>
      </div>

      <LoginForm onLogin={login} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
