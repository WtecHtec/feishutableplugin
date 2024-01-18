import { bitable, ToastType, } from "@lark-base-open/js-sdk"


export const findNthOccurrence = (str: any, word: any, n: any) => {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = str.indexOf(word, index + 1);
    if (index === -1) {
      break;
    }
  }
  return index;
}

export const getFromatDatas = async (selectRef: any, formatFunc: any) => {
  const { current: { start, end } }: any = selectRef
  if (!start) {
    await bitable.ui.showToast({
      toastType: ToastType.warning,
      message: '请选择【起始单元格】'
    })
    return
  }
  const { viewId, tableId, x, y } = start
  const table = await bitable.base.getTableById(tableId);
  const view = await table.getViewById(viewId);
  const recordIdList = await view.getVisibleRecordIdList();
  const fieldMetaList = await view.getVisibleFieldIdList()
  let ex = x
  let ey = fieldMetaList.length - 1
  if (end) {
    ex = end.x
    ey = end.y
  }
  const result = []
  for (let i = y; i <= ey; i++) {
    const row: any = []
    for (let j = x; j <= ex; j++) {
      let cellValue = await table.getCellString(fieldMetaList[j], recordIdList[i] as string);
      if (typeof formatFunc === 'function') {
        cellValue = formatFunc(cellValue)
      }
      row.push(cellValue)
    }
    result.push(row)
  }
  return result
}


export const updateTableCell = async (selectRef: any, datas: any) => {
  const { current: { start, end } }: any = selectRef
  const { viewId, tableId, x, y } = start
  const table = await bitable.base.getTableById(tableId);
  const view = await table.getViewById(viewId);
  const recordIdList = await view.getVisibleRecordIdList();
  const fieldMetaList = await view.getVisibleFieldIdList()
  let ex = x
  let ey = fieldMetaList.length - 1
  if (end) {
    ex = end.x
    ey = end.y
  }
  for (let i = y; i <= ey; i++) {
    for (let j = x; j <= ex; j++) {
      // let cellValue = await table.getCellString(fieldMetaList[j], recordIdList[i]!);
      const newText = datas[i - y][j - x]
      if (newText) {
        try {
          const textField = await table.getField(fieldMetaList[j])
          console.log(textField)
          const cell = await textField.getCell(recordIdList[i]!);
          await cell.setValue(newText)
        } catch (error) {
          console.error('无效数据,无法同步单元格', error)
        }
        
      }
    }
  }
}