require("dotenv").config();
const { exec } = require("child_process");

const serviceName = process.env.SERVICE_NAME; // Altere para o nome correto do serviço, se necessário
console.log(serviceName);
// Função para executar um comando no Prompt de Comando
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    //console.log(resolve);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};

exports.start = async () => {
  try {
    const command = `sc start ${serviceName}`;
    const result = await runCommand(command);
    return result.includes("START_PENDING")
      ? "Service is starting..."
      : "Service started successfully.";
  } catch (err) {
    throw new Error(`Error starting service: ${err}`);
  }
};

exports.stop = async () => {
  try {
    const command = `sc stop ${serviceName}`;
    const result = await runCommand(command);
    return result.includes("STOP_PENDING")
      ? "Service is stopping..."
      : "Service stopped successfully.";
  } catch (err) {
    throw new Error(`Error stopping service: ${err}`);
  }
};

exports.status = async () => {
  try {
    const command = `sc query ${serviceName}`;
    const result = await runCommand(command);
    if (result.includes("SERVICE_NAME")) {
      return `Service ${serviceName} is installed and active.`;
    } else {
      return `Service ${serviceName} is not found.`;
    }
  } catch (err) {
    throw new Error(`Error checking service status: ${err}`);
  }
};
