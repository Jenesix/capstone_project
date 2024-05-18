import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../../public/logo.svg';

const LoadingScreen: React.FC = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlink(prevState => !prevState);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Image className={`text-4xl ${blink ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} src={logo} width={200} height={200} alt='Learno+' />
    </div>
  );
};

export default LoadingScreen;
