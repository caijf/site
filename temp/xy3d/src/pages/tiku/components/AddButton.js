import React, { useState, useCallback } from "react";
import { Button } from "antd";

import UpdateModal from "./UpdateModal";

const AddQeustion = ({ onChange = () => {}, ...restProps }) => {
  const [visible, setVisible] = useState(false);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);
  const hideModal = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOk = useCallback(() => {
    onChange();
    setVisible(false);
  }, []);

  return (
    <>
      <Button type="primary" onClick={showModal} {...restProps}>
        新增题目
      </Button>
      <UpdateModal visible={visible} onCancel={hideModal} onOk={handleOk} />
    </>
  );
};

export default AddQeustion;
