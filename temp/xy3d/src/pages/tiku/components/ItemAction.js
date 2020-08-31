import React, { useCallback, useState } from "react";
import { Popconfirm, Spin, Space } from "antd";
import { useAsync } from "rc-hooks";
import UpdateModal from "./UpdateModal";
import services from "~/services";

export default ({ data, onChange = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const { run, loading } = useAsync(services.removeOtherXy3dQuestion, {
    autoRun: false,
    onSuccess: onChange
  });

  const onConfirmRemove = useCallback(() => {
    run({
      _id: data._id
    });
  }, []);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);
  const hideModal = useCallback(() => {
    setVisible(false);
  }, []);
  const handleUpdate = useCallback(() => {
    onChange();
    hideModal();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <Space direction="horizontal">
          <a className="nowrap" onClick={showModal}>
            修改
          </a>
          <Popconfirm
            title={`确认删除“${data.question}”？`}
            placement="topRight"
            onConfirm={onConfirmRemove}
          >
            <a className="nowrap">删除</a>
          </Popconfirm>
        </Space>
      </Spin>
      <UpdateModal
        data={data}
        visible={visible}
        onCancel={hideModal}
        onOk={handleUpdate}
        destroyOnClose
      />
    </>
  );
};
