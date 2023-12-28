import { useEffect } from 'react';

const ScrollButton = ({ targetId, title }) => {
  const handleClick = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Adicione lógica adicional, se necessário, com base no scroll da página
  };

  return (
    <button onClick={handleClick}>
      {title}
    </button>
  );
};

export default ScrollButton;
