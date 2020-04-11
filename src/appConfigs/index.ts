import config from "./env/local";

const STATUS_MSG = {
  STATUS_400: {
    msg: "Bad request.. Can you please try later or contact Admin !!",
  },
  INTERNAL_ERROR_500: {
    msg: "Internal Error.. Sorry for any inconveniance. Can you please try later !! Thank you",
  },
};

const exportConfig = Object.assign(config, {STATUS_MSG});

export default exportConfig;