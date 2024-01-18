import { memo } from "react"
import { Banner } from '@douyinfe/semi-ui';
const TipBanner = memo(({ tips }: any) => {
	return <>
		{
			tips.map(({ type, text }: any) => <Banner type={type} description={text} style={{ marginBottom: 12 }} />)
		}

	</>
})


export default TipBanner