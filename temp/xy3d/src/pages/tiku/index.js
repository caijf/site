import React, { useState, useCallback, useRef } from "react";
import { Card, Spin, Input, Table, Space } from "antd";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import Tiku from "tiku";

import PageHeaderWrapper from "~/components/PageHeaderWrapper";

function search(value, max = 20) {
  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  const vals = value.replace(/\s+/g, " ").split(" ");
  const result = [];

  Tiku.some(item => {
    let ret = true;
    vals.some(valItem => {
      if (item.question.indexOf(valItem) === -1) {
        ret = false;
      }
      return !ret;
    });

    if (ret) {
      result.push(item);
    }

    if (result.length >= max) {
      return true;
    }
  });

  return result;
}

const columns = [
  {
    dataIndex: "question",
    title: "题目"
  },
  {
    dataIndex: "answer",
    title: "答案"
  }
];

export default observer(() => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const innerSearch = useCallback(val => {
    setResult(search(val));
    setLoading(false);
  });
  const debounceSearch = useCallback(debounce(innerSearch, 500), []);

  const handleChangeInput = useCallback(e => {
    const retValue = e.target.value ? e.target.value.trim() : "";
    if (!retValue) {
      setResult([]);
      setLoading(false);
      debounceSearch.cancel();
    } else {
      setLoading(true);
      debounceSearch(retValue);
    }
  }, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <Space
          direction="vertical"
          size={24}
          style={{ display: "flex", width: "100%" }}
        >
          <Input.Search
            onChange={handleChangeInput}
            placeholder="请输入题目关键词（多个关键词组合查询，请使用空格分隔）"
            allowClear
            loading={loading}
            style={{ flex: 1, width: "100%" }}
            ref={inputRef}
          />
          <Table
            dataSource={result}
            columns={columns}
            rowKey="_id"
            pagination={false}
            loading={loading}
            scroll={{ y: 500 }}
          />
        </Space>
      </Card>
    </PageHeaderWrapper>
  );
});
