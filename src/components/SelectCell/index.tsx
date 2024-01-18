import { useState, useImperativeHandle, forwardRef } from "react"
import { Divider, Button } from '@douyinfe/semi-ui';
import { bitable, } from "@lark-base-open/js-sdk";
import TipBanner from "../TipBanner";
const tips = [{
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
		value
	}))

	const handleSelect = async (type: any) => {
		const selection = await bitable.base.getSelection();
		console.log(selection)
		const { fieldId, recordId, tableId, viewId } = selection
		if (!fieldId || !recordId) {
			await bitable.ui.showToast({
				toastType: 'warning',
				message: '请选择单元格'
			})
			return
		}
		const table = await bitable.base.getTableById(selection?.tableId!);
		const cellValue = await table.getCellString(fieldId, recordId);
		console.log('cellValue--', cellValue)
		if (type === 'start') {
			setValue({
				...value,
				start: {
					...selection,
					txt: cellValue,
				}
			})
		} else {
			setValue({
				...value,
				end: {
					...selection,
					txt: cellValue,
				}
			})
		}

	}
	return <div>
		<TipBanner tips={tips}></TipBanner>
		<div className="block">
			<Button onClick={() => handleSelect('start')}>起始单元格</Button>
			<span>{value?.start?.txt || ''}</span>
		</div>
		<Divider dashed={true} />
		<div className="block">
			<Button onClick={() => handleSelect('end')}>结束单元格</Button>
			<span>{value?.end?.txt || ''}</span>
		</div>
		<Divider dashed={true} />
	</div>
})


export default Extract
