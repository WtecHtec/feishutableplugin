import './App.css';
import { bitable, TableMeta } from "@lark-base-open/js-sdk";
import { Button, Form } from '@douyinfe/semi-ui';
import { BaseFormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function App() {
  const [tableMetaList, setTableMetaList] = useState<TableMeta[]>();
  const formApi = useRef<BaseFormApi>();
  const addRecord = useCallback(async () => {
    // if (tableId) {
    //   const table = await bitable.base.getTableById(tableId);
    //   table.addRecord({
    //     fields: {},
    //   });
    // }
    const selection = await bitable.base.getSelection();
    console.log(selection)
    const { fieldId, recordId, tableId, viewId } = selection
    //通过tableId获取table数据表。 Find current table by tableId
    const table = await bitable.base.getTableById(selection?.tableId!);
    const cellValue = await table.getCellValue(fieldId, recordId);
    // console.log(bitable.ui)
    const recordIdList = await table.getRecordIdList();

    // const recordIdList = await bitable.ui.selectRecordIdList(tableId, viewId);
    console.log(recordIdList)
    console.log(cellValue)
    //获取table数据表的字段列表元信息。Get table's field meta list
    const fieldMetaList = await table.getFieldMetaList();
    const textField = fieldMetaList.find(( { id }) => id === fieldId)
    console.log(fieldMetaList)
    for (let i = 0; i < recordIdList.length; i++) { 
        //获取单元格字符串形式的值。 Get cell string from specified fieldId and recordId
        const cellString = await table.getCellString(textField?.id!, recordIdList[i]!);
        console.log('cellString---', cellString)
    }
    const view = await table.getActiveView();
  }, []);
  useEffect(() => {
    // Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()])
    //   .then(([metaList, selection]) => {
    //     setTableMetaList(metaList);
    //     formApi.current?.setValues({ table: selection.tableId });
    //   });

    // const off = bitable.base.onSelectionChange((event: { data: Selection }) => {
    //   console.log('current selection', event)
    // })
  }, []);

  return (
    <main className="main">
      <h4>
        Edit <code>src/App.tsx</code> and save to reload
      </h4>
      <Form labelPosition='top' onSubmit={addRecord} getFormApi={(baseFormApi: BaseFormApi) => formApi.current = baseFormApi}>
        <Form.Slot label="Development guide">
          <div>
            <a href="https://lark-technologies.larksuite.com/docx/HvCbdSzXNowzMmxWgXsuB2Ngs7d" target="_blank"
              rel="noopener noreferrer">
              Base Extensions Guide
            </a>
            、
            <a href="https://bytedance.feishu.cn/docx/HazFdSHH9ofRGKx8424cwzLlnZc" target="_blank"
              rel="noopener noreferrer">
              多维表格插件开发指南
            </a>
          </div>
        </Form.Slot>
        <Form.Slot label="API">
          <div>
            <a href="https://lark-technologies.larksuite.com/docx/Y6IcdywRXoTYSOxKwWvuLK09sFe" target="_blank"
              rel="noopener noreferrer">
              Base Extensions Front-end API
            </a>
            、
            <a href="https://bytedance.feishu.cn/docx/HjCEd1sPzoVnxIxF3LrcKnepnUf" target="_blank"
              rel="noopener noreferrer">
              多维表格插件API
            </a>
          </div>
        </Form.Slot>
        <Form.Select field='table' label='Select Table' placeholder="Please select a Table" style={{ width: '100%' }}>
          {
            Array.isArray(tableMetaList) && tableMetaList.map(({ name, id }) => {
              return (
                <Form.Select.Option key={id} value={id}>
                  {name}
                </Form.Select.Option>
              );
            })
          }
        </Form.Select>
        <Button theme='solid' htmlType='submit'>Add Record</Button>
      </Form>
    </main>
  )
}