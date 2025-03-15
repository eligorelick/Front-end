import Link from 'next/link';

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <Link href="/">Home</Link> | 
            <Link href="/jobs">Jobs</Link> | 
            <Link href="/dashboard">Dashboard</Link> | 
            <Link href="/login">Login</Link> | 
            <Link href="/signup">Sign Up</Link>
        </nav>
    );
};

export default Navbar;
