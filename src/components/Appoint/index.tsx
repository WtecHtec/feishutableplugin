import { useState, useImperativeHandle, forwardRef } from "react"
import { Input, RadioGroup, Radio, InputNumber } from '@douyinfe/semi-ui';


const Appoint = forwardRef((props: any, ref: any) => {
  const [data, setData] = useState({
    start: {
      type: 'spot',
      point: 1,
      txt: '',
      wpoint: 1,
      include: '1',
    },
    end: {
      type: 'spot',
      point: 1,
      txt: '',
      wpoint: 1,
      include: '1'
    },
  })

  useImperativeHandle(ref, () => ({
    ...data
  }))

  const onChange = (value: any, type: any, filed: any) => {
    const update: any = { ...data }
    update[type][filed] = value
    setData(update)
  }
  return <div>
    <div className="block">
      <label className="cell-label">起始位置:</label>
      <div className="block">
        <label className="cell-label">是否包含当前位置:</label>
        <RadioGroup style={{ marginTop: 12 }} onChange={(e) => onChange(e.target.value, 'start', 'include')} value={data.start.include} aria-label="类型" name="type-radio-group">
          <Radio value={'1'}> 包含</Radio>
          <Radio value={'0'}>不包含 </Radio>
        </RadioGroup>
      </div>
      <RadioGroup style={{ marginTop: 12 }} onChange={(e) => onChange(e.target.value, 'start', 'type')} value={data.start.type} aria-label="类型" name="type-radio-group">
        <Radio value={'spot'}>指定位置： <InputNumber min={0} value={data.start.point} onChange={(value) => onChange(value, 'start', 'point')}></InputNumber></Radio>
        <Radio value={'which'}>第  <InputNumber min={0} value={data.start.wpoint} onChange={(value) => onChange(value, 'start', 'wpoint')}></InputNumber> <div style={{ flexShrink: 0 }}>  个字符:  </div><Input value={data.start.txt} onChange={(value) => onChange(value, 'start', 'txt')}></Input></Radio>
      </RadioGroup>
    </div>

    <div className="block">
      <label className="cell-label">结束位置:</label>
      <div className="block">
        <label className="cell-label">是否包含当前位置:</label>
        <RadioGroup style={{ marginTop: 12 }} onChange={(e) => onChange(e.target.value, 'end', 'include')} value={data.end.include} aria-label="类型" name="type-radio-group">
          <Radio value={'1'}> 包含</Radio>
          <Radio value={'0'}>不包含 </Radio>
        </RadioGroup>
      </div>
      <RadioGroup style={{ marginTop: 12 }} onChange={(e) => onChange(e.target.value, 'end', 'type')} value={data.end.type} aria-label="类型" name="type-radio-group">
        <Radio value={'spot'}>指定位置： <InputNumber min={0} value={data.end.point} onChange={(value) => onChange(value, 'end', 'point')}></InputNumber></Radio>
        <Radio value={'which'}>第  <InputNumber min={0} value={data.end.wpoint} onChange={(value) => onChange(value, 'end', 'wpoint')}></InputNumber> <div style={{ flexShrink: 0 }}>  个字符:  </div><Input value={data.end.txt} onChange={(value) => onChange(value, 'end', 'txt')}></Input></Radio>
      </RadioGroup>
    </div>
  </div>
})


export default Appoint
