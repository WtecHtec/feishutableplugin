import { ReactElement, useEffect, useState, useRef } from "react"
import { RadioGroup, Radio, Divider, Button } from '@douyinfe/semi-ui';
import { bitable, TableMeta } from "@lark-base-open/js-sdk";
import SelectCell from '../SelectCell'
export default function Extract(props: any) {
	const [value, setValue] = useState('zh');
	const selectRef = useRef(null)
	const onChange = (e: any) => {
		console.log('radio checked', e.target.value);
		setValue(e.target.value);
	};
	const handleExtract = async () => {
		console.log(selectRef)
		const selection = await bitable.base.getSelection();
		console.log(selection)
		const { fieldId, recordId, tableId, viewId } = selection
		if (!fieldId || !recordId) {
			await bitable.ui.showToast({
				toastType: 'info',
				message: 'hello world'
			})
			return
		}
	}
	return <div>
		<div className="block">
			<RadioGroup onChange={onChange} value={value} aria-label="类型" name="type-radio-group">
				<Radio value={'zh'}>中文</Radio>
				<Radio value={'en'}>英文</Radio>
				<Radio value={'num'} >数字</Radio>
				<Radio value={'rep'}>正则表达式</Radio>
			</RadioGroup>
		</div>
		<Divider dashed={true} />
		<SelectCell ref={selectRef}></SelectCell>
		<Divider dashed={true} />
		<div className="block">
			<Button onClick={handleExtract}>提取</Button>
		</div>
	</div>
}

