import { useState, useImperativeHandle, forwardRef } from "react"
import { Divider, Button, Tag } from '@douyinfe/semi-ui';
import { bitable, ToastType, } from "@lark-base-open/js-sdk";
import TipBanner from "../TipBanner";
const tips = [
  {
    type: "info",
    text: "单元格排序有改动,请重新选取起始、结束单元格",
  },
  {
    type: "info",
    text: "必须选取【起始单元格】",
  },
  {
    type: "info",
    text: "如果不选取【结束单元格】,则操作为【起始单元格】那列的【起始单元格】到表格末尾的数据",
  },
]
const Extract = forwardRef((props: any, ref: any) => {


  const [value, setValue] = useState<any>({
    start: null,
    end: null
  });

  useImperativeHandle(ref, () => ({
    ...value
  }))

  const handleSelect = async (type: any) => {
    const selection = await bitable.base.getSelection();
    console.log(selection)
    const { fieldId, recordId } = selection
    if (!fieldId || !recordId) {
      await bitable.ui.showToast({
        toastType: ToastType.warning,
        message: '请选择单元格'
      })
      return
    }
    const table = await bitable.base.getTableById(selection?.tableId!);
    const [status, res] = await fromatCell(table, selection, type === 'start'? value.end : value.start, type)
    if (status) {
      const update = {
        ...value,
        ...res,
      }
      setValue(update)
    }
  }
  const fromatCell = async (table: any, selection: any, diff: any, type: any) => {

  
    // const fieldMetaList = await table.getFieldMetaList();
    console.log(selection, type === 'start')
    const { fieldId, recordId, tableId: selTableId, viewId } = selection
    const view = await table.getViewById(viewId);
    const recordIdList = await view.getVisibleRecordIdList();
    const fieldMetaList = await view.getVisibleFieldIdList()
    console.log(fieldMetaList, recordIdList)
    const x = fieldMetaList.findIndex((id : any) => id === fieldId )
    const y = recordIdList.findIndex((id: any) => id === recordId )
    const cellValue = await table.getCellString(fieldId, recordId);
    let update: any = {}
    if ( x === -1 || y === -1) {
      await bitable.ui.showToast({
        toastType: ToastType.warning,
        message: '单元格选取异常',
      })
      return [false,];
    }
    if ( diff && diff.x && diff.y) {
      const { x: dx, y: dy, tableId: dTableId } = diff
      if (selTableId !== dTableId) {
        await bitable.ui.showToast({
          toastType: ToastType.warning,
          message: '操作不是同一个表格',
        })
        return [false]
      }
      if (type === 'start') {
        if (x > dx || y > dy) {
          await bitable.ui.showToast({
            toastType: ToastType.warning,
            message: '起始单元格不能超过结束单元格',
          })
          return [false]
        }
      } else {
        if (x < dx || y < dy) {
          await bitable.ui.showToast({
            toastType: ToastType.warning,
            message: '结束单元格不能小于起始单元格',
          })
          return [false]
        }
      }
    }
    update[type] = { ...selection, x, y, txt: cellValue}
    return [true, update]
  }

  
  const onTagClose = (type: any) => {
    const update: any = {}
    update[type] = null
    setValue({
      ...value,
      ...update,
    })
  }
  return <div>
    <TipBanner tips={tips}></TipBanner>
    <div className="block" style={{ whiteSpace: 'nowrap'}}>
      <Button onClick={() => handleSelect('start')}>起始单元格</Button>
      {
        value?.start?.x >= 0 && <Tag closable  style={{ maxWidth: 80, overflow:'hidden', marginLeft: 12,}} onClose={(value, e) => onTagClose('start')}>
        【{value?.start?.x},{value?.start?.y}】
      </Tag>
      }
      <span className="cell-span"> {value?.start?.txt || ''}</span>
    </div>
    <Divider dashed={true} />
    <div className="block " style={{ whiteSpace: 'nowrap'}}>
      <Button onClick={() => handleSelect('end')}>结束单元格</Button>
      {
        value?.end?.x >= 0 && <Tag closable style={{ maxWidth: 80, overflow:'hidden', marginLeft: 12,}} onClose={(value, e) => onTagClose('end')}>【{value?.end?.x},{value?.end?.y}】 </Tag>
      }
      <span className="cell-span"> {value?.end?.txt || ''}</span>
    </div>
    <Divider dashed={true} />
  </div>
})


export default Extract
