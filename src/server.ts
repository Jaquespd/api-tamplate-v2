import { server } from "./app";

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  return console.log(`🚀 Server has started on port ${PORT}`);
});
