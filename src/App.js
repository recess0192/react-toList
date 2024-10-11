import React, { Component } from 'react';
// import ListItem from './component/listItem';
// import Dialog from './component/task';
import Itemlist from './component/itemLsit';
import './App.css';

class TodoList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            inputValue:'', //输入的值
            list: [{
                id: 0,
                name: '吃饭',
                status: 0
            }, {
                id: 1,
                name: '睡觉',
                status: 0
            }, {
                id: 2,
                name: '打豆豆',
                status : 0
            }],
            finished: 0
        };

        this.addList = this.addList.bind(this);  //绑定this
    }


    //将input的值存入 state
    handleGetValue(event) {
        this.setState({
            inputValue : event.target.value
        })
    }
    //添加list
    addList() {
        const id = this.state.list.length;
        console.log(id);
        const itemList = {
            id: id,
            name:this.state.inputValue,
            status: 0
        }
        this.state.list.push(itemList)
        this.setState({
            list:this.state.list
        })
    }
    //点击item方法 出现 删除按钮
    checkItem(item) {
        const obj = [];
        this.state.list.map(v=>{
            if(v.id === item.id) {
                v.status === 1 ? v.status = 0 : v.status = 1;
            }
            obj.push(v);
            return obj;
        });

        this.setState({
            list: obj,
        });

    }
    //删除item
    deleteItem(item)  {
     this.state.list.map((v,index) => {
       if(v.id === item.id) {
           this.state.list.splice(index,1)
       }
       // return this.state.list
     })

      this.setState({  //保存状态
          list: this.state.list,
      });

    }

    render () {
      return (
          <div>
             <div className="dialog">
                 <div><input type="text" placeholder="请输入" value={ this.state.inputValue } onChange={this.handleGetValue.bind(this)}/></div>
                 <div><input type="button" value="添加"  onClick={this.addList}/></div>
             </div>

              <ul className={this.state.list.length === 0 ? 'toul1' :'toul'}>
                  {
                    this.state.list.map((item ,index)=>{
                        return (
                           <Itemlist
                                item={item}
                                checkItem = {this.checkItem.bind(this)}
                                key={index}
                                deleteItem = {this.deleteItem.bind(this)}
                            />
                            /*<li onClick={this.checkItem.bind(this,item)} key={index}>{ item.name }
                                <input type="button" value="删除" onClick={this.deleteItem.bind(this,item)} style={{ marginTop:'5px',cursor:'pointer'}}
                                className={item.status ?  'show' :'hide'}/>
                            </li>*/
                        )
                    })
                  }
              </ul>

              <div className={ this.state.list.length === 0? 'show noList':'hide'}>删完了</div>
          </div>
      )
    }
}

export default TodoList;