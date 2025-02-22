import type { FormInstance } from "antd";
import { Button, Form } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";

interface SubmitButtonProps {
  form: FormInstance;
  loading: boolean;
}

export const SubmitButton: React.FC<PropsWithChildren<SubmitButtonProps>> = ({
  form,
  loading,
  children,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={loading}
      variant="filled"
      color="primary"
      block
      disabled={!submittable}
    >
      {children}
    </Button>
  );
};
