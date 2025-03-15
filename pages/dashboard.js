
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';

export default function UserDashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard - PiProspects</title>
      </Head>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
}
