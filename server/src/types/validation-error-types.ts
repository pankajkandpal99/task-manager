export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  success: boolean;
  errors?: ValidationError[];
  data?: any;
};
