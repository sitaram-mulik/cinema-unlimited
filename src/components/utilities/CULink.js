import { Link } from 'expo-router';

export function CULink({ children, ...props }) {
  return (
    <Link {...props} style={{ color: 'blue' }}>
      {children}
    </Link>
  );
}
