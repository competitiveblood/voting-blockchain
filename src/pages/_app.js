import "@/styles/globals.css";

// INTERNAL IMPORT
import { VotingContext } from '../context/Voter';
import NavBar from '../components/NavBar/NavBar';

const MyApp = ({ Component, pageProps }) => (
  <VotingProvider>
    <div>
      <NavBar />
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  </VotingProvider>
);

export default MyApp;
