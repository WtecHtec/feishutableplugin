import { memo } from "react"
import { Divider } from '@douyinfe/semi-ui';
const Perview = memo(({ datas }: any) => {
  return <>
    <div style={{ width: '100%', height: 300, overflow: 'auto',    }}>
      { Array.isArray(datas) && datas.length > 0 && <div className="block" style={{ color: '#666', fontSize: 12}} >预览数据如下：</div> } 
      {
        Array.isArray(datas) && datas.map((items: any) => {
          return <div className="block" style={{ whiteSpace: 'nowrap'}}>
            { Array.isArray(items) && items.map((txt: any) => <span style={{ color: '#333', fontSize: 14}}>{txt || '--'} <Divider  layout="vertical" margin='12px' /></span>)}
            <Divider style={{ width: '100%'}}/>
          </div>
        })
      }
    </div>
  </>
})


export default Perview