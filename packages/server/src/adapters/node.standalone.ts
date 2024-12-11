import adapterNode from "./node.js";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number.parseInt(process.env.PORT || "3000");

const server = adapterNode();

server.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
