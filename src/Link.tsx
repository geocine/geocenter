
type LinkProps = {
  label: string;
  activeLink: boolean;
  onClick: (label: string) => void;
  children: React.ReactNode;
}

const Link = ({ label, activeLink, onClick, children }: LinkProps) => {
  // Determine the appropriate style based on activeLink's value
  const linkStyle = activeLink ? 
    "flex items-center justify-center w-12 h-12 mt-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100" : 
    "flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300";

  return (
    <a 
      onClick={() => onClick(label)}
      className={linkStyle}>
      {children}
    </a>
  );
};

export default Link;