import { useState, useRef } from "react"
import { RadioGroup, Radio, Divider, Button, InputNumber, TextArea } from '@douyinfe/semi-ui';
import SelectCell from '../SelectCell'
import Perview from "../Perview";
import { getFromatDatas, updateTableCell, findNthOccurrence } from "../../util";

import Appoint from "../Appoint";


function deleteCharsFromEnd(str: any, count: any) {
  if (count < 0) {
    count = 0;
  }
  return str.slice(-count);
}

function deleteCharsFromStart(str: any, count: any) {
  if (count < 0) {
    count = 0;
  }
  return str.slice(0, count);
}



function deleteCharsFromAppoint(str: any, point: any) {
  const { start, end, } = point
  let startIndex = start.point
  let endIndex = end.point
  if (start.type === 'which') {
    startIndex = findNthOccurrence(str, start.txt, start.wpoint)
    if (startIndex === -1) return str
  }
  if (end.type === 'which') {
    endIndex = findNthOccurrence(str, end.txt, end.wpoint)
    if (endIndex === -1) return str
  }
  if (startIndex > endIndex) return str
  return  str.slice(startIndex + (start.include === '1' ? 0 : 1), endIndex + (end.include === '1' ? 1 : 0))
}

export default function Cutout(props: any) {
  const [optValue, setOptValue] = useState('start');
  const [pointValue, setPointValue] = useState(0);

  const selectRef = useRef(null)
  const appointRef = useRef(null)

  const [datas, setDatas] = useState<any>([])
  const onChange = (e: any) => {
    setOptValue(e.target.value);
  };
  const handlePerView = async () => {
    console.log(appointRef)
    const datas = await getFromatDatas(selectRef, (cellValue: any) => {
      if (optValue === 'start') {
        return deleteCharsFromStart(cellValue, pointValue)
      } else if (optValue === 'end') {
        return deleteCharsFromEnd(cellValue, pointValue)
      } else {
        return deleteCharsFromAppoint(cellValue, appointRef.current)
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
      optValue === 'appoint' && <Appoint ref={appointRef}></Appoint>
    }
    {
      optValue !== 'appoint' && <div className="block">
        <label className="cell-label">截取字数:</label>
        <InputNumber min={0} value={pointValue} onChange={(value) => {
          setPointValue(value as number)
        }} />
      </div>
    }
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

