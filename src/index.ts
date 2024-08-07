import { backendSetup } from "setups";

import { Logger } from "utils";

const setupServer = async () => {
  try {
    await backendSetup();
  } catch (error: unknown) {
    Logger.error(error);

    process.exit(0);
  }
};

setupServer();
