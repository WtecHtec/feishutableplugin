import { useState, useRef } from "react"
import { RadioGroup, Radio, Divider, Button, InputNumber, TextArea } from '@douyinfe/semi-ui';
import SelectCell from '../SelectCell'
import Perview from "../Perview";
import { getFromatDatas, updateTableCell } from "../../util";




export default function Upperlower(props: any) {
  const [optValue, setOptValue] = useState('all-lower');
  const selectRef = useRef(null)


  const [datas, setDatas] = useState<any>([])
  const onChange = (e: any) => {
    setOptValue(e.target.value);
  };
  const handlePerView = async () => {
    const datas = await getFromatDatas(selectRef, (cellValue: any) => {
      switch (optValue) {
        case 'all-lower':
          return cellValue.toLowerCase();
        case 'all-upper':
          return cellValue.toUpperCase();
        case 'start-upper':
          return cellValue.replace(/\b\w/g, (char: any) => char.toUpperCase());
        case 'start-first-upper':
          return cellValue.charAt(0).toUpperCase() + cellValue.slice(1);
        case 'case-inversion':
          return cellValue.split('').map( (char: any) => {
            return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
          }).join('');
        default:
          return cellValue
      }
    })
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
        <Radio value={'all-lower'}>全部小写</Radio>
        <Radio value={'all-upper'}>全部大写</Radio>
        <Radio value={'start-upper'}>单词首字母大写</Radio>
        <Radio value={'start-first-upper'}>句首母大写</Radio>
        <Radio value={'case-inversion'}>大小写反转</Radio>
      </RadioGroup>
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

