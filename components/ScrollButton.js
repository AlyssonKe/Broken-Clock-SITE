import { useRouter } from 'next/router';

export default function ScrollButton({targetId, title, targetPage}) {
  const router = useRouter();

  const handleClick = () => {
    if (router.pathname === targetPage) {
      scrollToTarget();
    } else {
      router.push(`${targetPage}#${targetId}`).then();
    }
  };

  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button onClick={handleClick} className='mx-auto'>
      {title}
    </button>
  );
}; 
