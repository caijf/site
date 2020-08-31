import React, { useCallback, useMemo } from "react";
import { Modal, Form, Input } from "antd";
import { useAsync } from "rc-hooks";

import services from "~/services";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

// 初始值
const initialValues = {
  question: "",
  answer: ""
};

export default ({
  data = {},
  onOk = () => {},
  onCancel = () => {},
  ...restProps
}) => {
  const isUpdate = data && !!data._id;
  const title = useMemo(() => (isUpdate ? "修改题目" : "新增题目"), []);
  const [form] = Form.useForm();
  const { run, loading } = useAsync(
    isUpdate
      ? services.updateOtherXy3dQuestion
      : services.insertOtherXy3dQuestion,
    { autoRun: false }
  );

  const handleOk = useCallback(() => {
    form.submit();
  }, []);
  const handleCancel = useCallback(() => {
    onCancel && onCancel();
    form.resetFields();
  }, []);
  const onFinish = useCallback(values => {
    // console.log(values);
    run(isUpdate ? { ...data, ...values } : values).then(onOk);
  }, []);

  return (
    <Modal
      title={title}
      maskClosable={false}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      cancelButtonProps={{ disabled: loading }}
      {...restProps}
    >
      <Form
        {...formItemLayout}
        form={form}
        initialValues={isUpdate ? data : initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          label="题目"
          name="question"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入题目"
            }
          ]}
        >
          <Input.TextArea
            allowClear
            placeholder="请输入"
            autoComplete="off"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item
          label="答案"
          name="answer"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入答案"
            }
          ]}
        >
          <Input allowClear placeholder="请输入" autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
