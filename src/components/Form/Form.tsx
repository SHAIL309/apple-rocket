import React from "react";
import classes from "./form.module.scss";
import { Button, Form, Input } from "antd";
import { Rule, FormItemProps } from "antd/es/form";

export const requiredMessage = "This field is required";

interface FormProps {
  formName: string;
  onSubmit: (values: any) => void;
  formFields: FormItemProps[];
  SubmitButtonText?: string;
}

const FormComponent: React.FC<FormProps> = ({
  formName,
  formFields,
  onSubmit,
  SubmitButtonText = "Submit",
}) => {
  const [form] = Form.useForm();
  return (
    <Form
      name={formName}
      onFinish={onSubmit}
      initialValues={{
        remember: true,
      }}
      className={classes.form}
    >
      {formFields.map(({ label, rules, ...rest }) => {
        return (
          <Form.Item rules={[{ ...rules, message: requiredMessage }]} {...rest}>
            <label className={classes.label} htmlFor={rest.name}>
              {label}
              <span>*</span>
            </label>
            {rest.name === "password" || rest.name === "confirm password" ? (
              <Input.Password
                name={rest.name}
                className={classes.input}
                placeholder={`Enter ${label}`}
              />
            ) : (
              <Input className={classes.input} placeholder={`Enter ${label}`} />
            )}
          </Form.Item>
        );
      })}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={
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
