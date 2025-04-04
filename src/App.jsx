import axios from "axios";
import { Header } from "./Header";
import { MediaVaultPage } from "./MediaVaultPage";
import { Footer } from "./Footer";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Header />
      <MediaVaultPage />
      <Footer />
    </div>
  )
}

export default App;