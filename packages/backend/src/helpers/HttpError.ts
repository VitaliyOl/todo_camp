type ErrorMessages = {
  [key: number]: string;
};

const errorMessages: ErrorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

class HttpError extends Error {
  status: number;

  constructor(status: number, message = errorMessages[status]) {
    super(message);
    this.status = status;
  }
}

export default HttpError;
