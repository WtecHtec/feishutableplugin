import './App.css';
// import { bitable, TableMeta } from "@lark-base-open/js-sdk";
import { Tabs, TabPane, } from '@douyinfe/semi-ui';
// import { BaseFormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';
// import { useState, useEffect, useRef, useCallback } from 'react';
import TipBanner from './components/TipBanner';
import Extract from './components/Extract';
import Insert from './components/Insert';
import Delete from './components/Delete';
import Cutout from './components/Cutout';
import Upperlower from './components/Upperlower';
const tips = [{
  type: "info",
  text: "为了更好的使用体验,尽量选择文本类型单元格",
},
]
export default function App() {
  // const [tableMetaList, setTableMetaList] = useState<TableMeta[]>();
  // const formApi = useRef<BaseFormApi>();
  // const addRecord = useCallback(async () => {
  //   // if (tableId) {
  //   //   const table = await bitable.base.getTableById(tableId);
  //   //   table.addRecord({
  //   //     fields: {},
  //   //   });
  //   // }
  //   const selection = await bitable.base.getSelection();
  //   console.log(selection)
  //   const { fieldId, recordId, tableId, viewId } = selection
  //   //通过tableId获取table数据表。 Find current table by tableId
  //   const table = await bitable.base.getTableById(selection?.tableId!);
  //   const cellValue = await table.getCellValue(fieldId, recordId);
  //   // console.log(bitable.ui)
  //   const recordIdList = await table.getRecordIdList();

  //   // const recordIdList = await bitable.ui.selectRecordIdList(tableId, viewId);
  //   console.log(recordIdList)
  //   console.log(cellValue)
  //   //获取table数据表的字段列表元信息。Get table's field meta list
  //   const fieldMetaList = await table.getFieldMetaList();
  //   const textField = fieldMetaList.find(({ id }) => id === fieldId)
  //   console.log(fieldMetaList)
  //   for (let i = 0; i < recordIdList.length; i++) {
  //     //获取单元格字符串形式的值。 Get cell string from specified fieldId and recordId
  //     const cellString = await table.getCellString(textField?.id!, recordIdList[i]!);
  //     console.log('cellString---', cellString)
  //   }
  //   const view = await table.getActiveView();
  // }, []);
  // useEffect(() => {
  //   // Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()])
  //   //   .then(([metaList, selection]) => {
  //   //     setTableMetaList(metaList);
  //   //     formApi.current?.setValues({ table: selection.tableId });
  //   //   });

  //   // const off = bitable.base.onSelectionChange((event: { data: Selection }) => {
  //   //   console.log('current selection', event)
  //   // })
  // }, []);

  return (
    <main className="main">
      <TipBanner tips={tips}></TipBanner>
      <Tabs type="line">
        <TabPane tab="提取" itemKey="1">
          <Extract optType="extr"></Extract>
        </TabPane>
        <TabPane tab="过滤" itemKey="2">
          <Extract optType="filter"></Extract>
        </TabPane>
        <TabPane tab="插入" itemKey="3">
          <Insert></Insert>
        </TabPane>
        <TabPane tab="删除" itemKey="4">
          <Delete></Delete>
        </TabPane>
        <TabPane tab="截取" itemKey="5">
          <Cutout></Cutout>
        </TabPane>
        <TabPane tab="大小写" itemKey="6">
          <Upperlower></Upperlower>
        </TabPane>
      </Tabs>
    </main>
  )
}