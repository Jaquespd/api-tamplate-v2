import { server } from "./app";
import { downloadAuthProviderCert } from "./services/downloadAuthProviderCert";

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  const itWorked = await downloadAuthProviderCert();
  if (!itWorked) console.log("Problem with firebase certificate.");
  return console.log(`🚀 Server has started on port ${PORT}`);
});
