interface LogoProps {
  variant: 'white' | 'black';
  className?: string;
}

export default function Logo({ variant, className = '' }: LogoProps) {
  return (
    <img
      src={variant === 'white' ? '/logo-white.png' : '/logo-black.png'}
      alt="NEHOC — Menuiserie aluminium"
      className={`logo ${className}`}
    />
  );
}
