import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Items from "./pages/Items/Items";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Items />
    </ThemeProvider>
  );
}

export default App;
