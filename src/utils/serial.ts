import { invoke } from "@tauri-apps/api/tauri";

async function handleGetPorts(): Promise<string> {
  return invoke("get_ports", {});
}

function convertEnding(ending: string) {
  switch (ending) {
    case "None":
      return "";
    case "\\n":
      return "\n";
    case "\\r":
      return "\r";
    case "\\n\\r":
      return "\n\r";
    default:
      return ""; // Default to an empty string if the label is not recognized
  }
}

async function handleConnect(port: string, baud: string, ending: string): Promise<boolean> {
  ending = convertEnding(ending)
  invoke("set_port_items", {port, baud, ending});
  const isConnected = await invoke("handle_serial_connect", {});
  return isConnected as boolean;
}

function getBaudList() { 
  return [
    "300",
    "1200",
    "2400",
    "4800",
    "9600",
    "19200",
    "38400",
    "57600",
    "74880",
    "115200",
    "230400",
    "250000",
    "500000",
    "1000000",
    "2000000",
  ];
}

function getEnding() {
  return [
    "None",
    "\\n",
    "\\r",
    "\\n\\r"
  ]
}

async function handleRecord(): Promise<any> {
  const res = await invoke("handle_start_record", {});
  return res;
}

function handleSend(input: string) {
  invoke("send_serial", {input});
}

async function handleSetFolder() {
  await invoke("set_folder_path", {});
}

async function sendError(input: string) {
  await invoke("emit_error", {input})
}

export { handleGetPorts, handleConnect, handleRecord, handleSend, handleSetFolder, getBaudList, getEnding, sendError } 