const serviceService = require("../domain/service/serviceService");
const util = require("util");
const { exec } = require("child_process");
const { error } = require("console");

exports.startService = async (req, res, next) => {
  const serviceName = process.env.SERVICE_NAME;
  const command = `sc start ${serviceName}`;
  const execPromise = util.promisify(exec);

  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) throw new Error(stderr);

    return res.json({
      success: true,
      message: stdout,
      code: error.code,
    });
  } catch (error) {
    return res.json({ success: false, error: error.message, code: error.code });
  }
};

exports.stopService = async (req, res, next) => {
  const serviceName = process.env.SERVICE_NAME;
  const command = `sc stop ${serviceName}`;
  const execPromise = util.promisify(exec);

  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) throw new Error(stderr);

    return res.json({
      success: true,
      message: stdout,
      code: error.code,
    });
  } catch (error) {
    return res.json({ success: false, error: error.message, code: error.code });
  }
};

exports.getServiceStatus = async (req, res, next) => {
  try {
    const { serviceName } = req.params;
    const status = await serviceService.getStatus(serviceName);
    res.status(200).json({ status: `O serviço ${serviceName} está ${status}` });
  } catch (error) {
    next(error);
  }
};
