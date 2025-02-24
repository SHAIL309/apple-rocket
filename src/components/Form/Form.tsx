import React, { useState } from "react";
import classes from "./form.module.scss";
import { Button, Form, Input } from "antd";

export const requiredMessage = "This field is required";

interface FormProps {
  formName: string;
  onSubmit: (values: any, cb: () => void) => void;
  formFields: any;
  SubmitButtonText?: string;
}

const FormComponent: React.FC<FormProps> = ({
  formName,
  formFields,
  onSubmit,
  SubmitButtonText = "Submit",
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleLoad = () => setLoading(!loading);

  return (
    <Form
      name={formName}
      onFinish={(val) => {
        handleLoad();
        onSubmit(val, handleLoad);
      }}
      initialValues={{
        remember: true,
      }}
      className={classes.form}
      labelCol={{ span: 8 }}
      labelAlign="left"
    >
      {formFields.map(({ ...rest }) => {
        return (
          <Form.Item rules={[{ ...rest, message: requiredMessage }]} {...rest}>
            {/* <label className={classes.label} htmlFor={rest.name}>
              {label}
              <span>*</span>
            </label> */}
            {rest.name === "password" || rest.name === "confirmPassword" ? (
              <Input.Password
                name={rest.name}
                className={classes.input}
                placeholder={`Enter ${rest?.label}`}
              />
            ) : (
              <Input
                className={classes.input}
                placeholder={`Enter ${rest?.label}`}
              />
            )}
          </Form.Item>
        );
      })}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={
            loading ||
            !form.isFieldsTouched(true) ||
            form.getFieldsError().filter(({ errors }) => errors.length).length >
              0
          }
          className={classes.submitButton}
        >
          {SubmitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
