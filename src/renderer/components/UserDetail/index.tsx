import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';
import { CurrentUser } from '@/types';
import {Button,Input} from 'antd'

const {TextArea} = Input

function mapStateToProps(state) {
  return {
    currentUser: state.global.currentUser,
  };
}

type Props = {
  currentUser?: CurrentUser
}

@connect(mapStateToProps)
export default class extends React.Component<Props> {

  state = {
    isEditMode:false
  }

  turnOffEditMode = ()=>{
    this.setState({isEditMode:false})
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    if (!this.props.currentUser) {
      return <div/>;
    }

    const { avatar, userName, account, email, remark ,companies } = this.props.currentUser;

    let remarkArea = null

    if (this.state.isEditMode){
      remarkArea = (<div className={sty.remark}>
        <TextArea autosize={false} placeholder={'请输入备注'} defaultValue={remark} />
        <div className={sty.btn}>
          <Button onClick={this.turnOffEditMode}>取消</Button>
          <Button onClick={this.turnOffEditMode} type={'primary'}>保存</Button>
        </div>
      </div>)
    }else {
      remarkArea = (<div className={sty.remark}>
        <div className={sty.remark}>{remark}</div>
        <Button onClick={()=>{this.setState({isEditMode:true})}} className={sty.editRemark}>{remark?'修改备注':'添加备注'}</Button>
      </div>)
    }

    return <div className={sty.userDetail}>
      <img src={avatar} className={sty.avatar}/>
      <div className={sty.userName}>{userName}</div>
      <div className={sty.others}>
        <div className={sty.row}>
          <div className={sty.label}>帐号</div> <div className={sty.content}>{account}</div>
        </div>
        <div className={sty.row}>
          <div className={sty.label}>邮箱</div> <div className={sty.content}>{email}</div>
        </div>
        <div className={sty.row}>
          <div className={sty.label}>企业</div>
          <div className={sty.content}>
            {companies&&companies.map((company)=><div >{company}</div>)}
          </div>
        </div>
      </div>
      {remarkArea}
    </div>;
  }
}
