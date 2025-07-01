class ApiResponse {
  success: boolean;
  status: number;
  message: string;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    this.success = true;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
