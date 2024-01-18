import { useState, useRef } from "react"
import { RadioGroup, Radio, Divider, Button, InputNumber, TextArea } from '@douyinfe/semi-ui';
import SelectCell from '../SelectCell'
import Perview from "../Perview";
import { getFromatDatas, updateTableCell } from "../../util";

function insertStringAt(originalStr: any, newStr: any, position: any, fill: any) {
  if (position < 0) {
    position = 0;
  }
  if (position > originalStr.length) {
    if (fill) {
      const spacesToAdd = position - originalStr.length;
      originalStr = `${originalStr}${ '_'.repeat(spacesToAdd)}`;
    } else {
      position = originalStr.length
    }
  }
  const firstPart = originalStr.slice(0, position);
  const secondPart = originalStr.slice(position);
  return firstPart + newStr + secondPart;
}
export default function Insert(props: any) {
  const [optValue, setOptValue] = useState('start');
  const [pointValue, setPointValue] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [fillValue, setFillValue]  = useState('1');
  const selectRef = useRef(null)

  const [datas, setDatas] = useState<any>([])
  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setOptValue(e.target.value);
  };
  const handlePerView = async () => {

    const datas = await getFromatDatas(selectRef, (cellValue: any) => {
      if (optValue === 'start') {
        return `${textValue}${cellValue}`
      } else if (optValue === 'end') {
        return `${cellValue}${textValue}`
      } else {
        return insertStringAt(cellValue, textValue, pointValue, fillValue == '1')
      }
    })
    console.log(datas)
    setDatas(datas)
  }

  const handleSyncToTable = async () => {
    if (Array.isArray(datas) && datas.length) {
      await updateTableCell(selectRef, datas)
    }
  }
  return <div>
    <div className="block">
      <RadioGroup onChange={onChange} value={optValue} aria-label="类型" name="type-radio-group">
        <Radio value={'start'}>开头</Radio>
        <Radio value={'end'}>末尾</Radio>
        <Radio value={'appoint'}>指定位置</Radio>
      </RadioGroup>
    </div>

    {
      optValue === 'appoint' && <>
        <div className="block">
          <InputNumber min={0} value={pointValue} onChange={(value) => {
            setPointValue(value as number)
          }} />
        </div>
        <div className="block">
          <label className="cell-label">超过是否需要补充(_):</label>
          <RadioGroup onChange={(e) => setFillValue(e.target.value) } value={fillValue} aria-label="类型" name="type-radio-group">
            <Radio value={'1'}>需要</Radio>
            <Radio value={'0'}>不需要</Radio>
          </RadioGroup>
        </div>
      </>
    }
    <div className="block">
      <label className="cell-label">插入文本</label>
      <TextArea autosize rows={1} placeholder="" value={textValue} onChange={(value) => {
        setTextValue(value)
      }}> </TextArea>
    </div>
    <Divider dashed={true} />
    <SelectCell ref={selectRef}></SelectCell>

    <div className="block">
      <Button onClick={handlePerView} className="mr-12">预览</Button>
      <Button onClick={handleSyncToTable}>同步到表格</Button>
    </div>
    <Divider dashed={true} />
    <Perview datas={datas}></Perview>
  </div>
}

