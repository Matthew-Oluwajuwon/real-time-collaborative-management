import LockIcon from "@/assets/icons/lock.svg";
import UserIcon from "@/assets/icons/user.svg";

import { formConfig } from "@/configs";
import { SubmitButton } from "@/ui";
import { Button, Form, Image, Input } from "antd";

document.title = "Login | Real time collaborative management tool";

export const Login = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} {...formConfig} className="w-sm !px-3">
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input
          prefix={<Image src={UserIcon} alt="user-icon" preview={false} />}
          placeholder="USERNAME"
          className="font-light text-sm"
          classNames={{
            prefix: "pr-3",
          }}
        />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password
          prefix={<Image src={LockIcon} alt="user-icon" preview={false} />}
          visibilityToggle={false}
          placeholder="PASSWORD"
          className="font-light text-sm"
          classNames={{
            prefix: "pr-3",
          }}
        />
      </Form.Item>
      <SubmitButton form={form}>LOGIN</SubmitButton>
      <Button
        type="text"
        variant="text"
        htmlType="button"
        className="float-end !text-white !p-0 hover:!bg-transparent"
      >
        Forgot Password?
      </Button>
    </Form>
  );
};
