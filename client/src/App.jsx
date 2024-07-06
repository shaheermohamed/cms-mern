import Routers from "./navigators/router";
import AuthProvider from "./context/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routers />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
