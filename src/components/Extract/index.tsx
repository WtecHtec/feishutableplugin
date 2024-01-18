import { useState, useRef } from "react"
import { RadioGroup, Radio, Divider, Button, TextArea } from '@douyinfe/semi-ui';
import SelectCell from '../SelectCell'
import Perview from "../Perview";
import { getFromatDatas, updateTableCell } from "../../util";

function extractChineseCharacters(str: any, regex: any) {
  const chineseCharacters = str.match(regex);
  return chineseCharacters ? chineseCharacters.join('') : '';
}

function filterChineseCharacters(str: any, regex: any) {
  return str.replace(regex, '');
}
const EXTR_OPT_REGEX_MAP: any = {
  zh: /[\u4E00-\u9FA5]/g,
  en: /[a-zA-Z]+/g,
  num: /\d+/g,
}

const FILTER_OPT_REGEX_MAP: any = {
  zh: /[\u4E00-\u9FA5]/g,
  en: /[a-zA-Z]+/g,
  num: /\d+/g,
  symbol: /[!-/:-@[-`{-~\s]+/g
}
export default function Extract(props: any) {
  const [optValue, setOptValue] = useState('zh');
  const [regValue, setRegValue] = useState('');
  const selectRef = useRef(null)
  const { optType = 'extr' } = props
  const [datas, setDatas] = useState<any>([])
  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setOptValue(e.target.value);
  };
  const handleExtract = async () => {

    const datas = await getFromatDatas(selectRef, (cellValue: any) => {
      return  optType === 'extr' 
        ? extractChineseCharacters(cellValue, FILTER_OPT_REGEX_MAP[optValue] || regValue || '')
        : filterChineseCharacters(cellValue, EXTR_OPT_REGEX_MAP[optValue] || regValue || '')
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
        {
          optType === 'extr' && <>
            <Radio value={'zh'}>中文</Radio>
            <Radio value={'en'}>英文</Radio>
            <Radio value={'num'}>数字</Radio>
            <Radio value={'reg'}>正则表达式</Radio>
          </>
        }

        {
          optType === 'filter' && <>
            <Radio value={'zh'}>中文</Radio>
            <Radio value={'en'}>英文</Radio>
            <Radio value={'num'}>数字</Radio>
            <Radio value={'symbol'}>符号</Radio>
            <Radio value={'reg'}>正则表达式</Radio>
          </>
        }

      </RadioGroup>
    </div>
    {
      optValue === 'reg' && <TextArea autosize rows={1} placeholder=" /\d+/g" value={regValue} onChange={(value) => {
        setRegValue(value)
      }}> </TextArea>
    }
    <Divider dashed={true} />
    <SelectCell ref={selectRef}></SelectCell>

    <div className="block">
      <Button onClick={handleExtract} className="mr-12">提取</Button>
      <Button onClick={handleSyncToTable}>同步到表格</Button>
    </div>
    <Divider dashed={true} />
    <Perview datas={datas}></Perview>
  </div>
}

