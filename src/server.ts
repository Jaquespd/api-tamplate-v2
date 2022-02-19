import { server } from "./app";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Server has started on port ${PORT}`));
