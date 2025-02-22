import { FormProps } from "antd/es/form";

export const defaultStaleTime = 30 * 60 * 1000;
export const formConfig: FormProps = {
  layout: "vertical",
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  colon: false,
  requiredMark: false,
  hideRequiredMark: true,
  size: "large",
  scrollToFirstError: true,
  validateMessages: {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  },
};
