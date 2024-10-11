# react-toList
用react实现todolist



## 1、安装create-react-app
 - 执行命令npm install -g create-react-app

## 2、创建并运行项目
 - 执行命令 create-react-app demo 创建一个demo项目
 - 打开项目配置好环境 运行 npm start

## 3、实现增加删除功能的 toList
1.在 App.js中我们创建一个TodoList的类并导出 

``` javascript
   class TodoList extends Component {
    constructor (props) {
        super(props);
    }
​
    render () {}
}
​
export default TodoList;
```

2.在render() {}中加入 html代码形成页面 (注:render()里面必须要有return () 才能渲染页面 并且要用一个大div把内容起来)

``` javascript
    
class TodoList extends Component {
    constructor (props) {
        super(props);
    }
​
    render () {
       return (
           <div>
             <div className="dialog">
                  <div><input type="text" placeholder="请输入" /></div>
                  <div><input type="button" value="添加" /></div>
              </div>
​
              <ul>
                  <li>吃饭  <input type="button" value="删除"  style={{ marginTop:'5px',cursor:'pointer'}} className= 'hide'/></li>
                  <li>睡觉 <input type="button" value="删除"  style={{ marginTop:'5px',cursor:'pointer'}} className= 'hide'/></li>
                  <li>打豆豆 <input type="button" value="删除"  style={{ marginTop:'5px',cursor:'pointer'}} className= 'hide'/></li>
              </ul>
​
              <div className='hide'>删完了</div>
          </div>
       )
    }
}
​
export default TodoList;
```

3.绑定input输入框 声明一个变量并且创建handleGetValue()实现与input的值绑定 （react 声明变量要在 this.state里面声明，state相当于vue里面的data()）

``` javascript
      constructor (props) {
        super(props);
​
        this.state = {v
            inputValue:'', //输入的值
        }
   }
    //实现双向绑定
    handleGetValue(event) {
        this.setState({
            inputValue : event.target.value
        })
    }
​
 <div className="dialog">
     <div><input type="text" placeholder="请输入" value={this.state.inputValueonChange={this.handleGetValue.bind(this)}/>
     </div>     
</div>
```

4.循环列表，并创建list数组，将数据存入其中 

``` javascript
     
constructor (props) {
        super(props);
​
        this.state = {
            inputValue:'', //输入的值
            list: [{
                id: 0,
                name: '吃饭',
                status: 0 //是否点击
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
    }
​
​
html:
-----------------
    //jsx语法可以在 html里面写js代码但必须要用{}包起来
<ul>
    {
     this.state.list.map((item ,index)=>{
        <li key={index}>{ item.name }
             <input type="button" value="删除"  style={{ marginTop:'5px',cursor:'pointer'}} className={item.status ?  'show' :'hide'}/>
        </li> 
   }
</ul>   
```

5.创建checkItem()实现点击当前li，则当前li出现删除按钮,再次点击则按钮隐藏
``` javascript
    
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
​
        this.setState({
            list: obj,
        });
    }
​
html：
---------------
<li onClick={this.checkItem.bind(this,item)} key={index}>{ item.name }
    <input type="button" value="删除" style={{ marginTop:'5px',cursor:'pointer'}} className={item.status ?  'show' :'hide'}/>
</li>
```

6.创建deleteItem()实现点击删除按钮 删除该li

``` javascript
   //删除item
deleteItem(item)  {
    this.state.list.map((v,index) => {
        if(v.id === item.id) {
            this.state.list.splice(index,1)
        }
        // return this.state.list
    })
​
    this.setState({  //保存状态
        list: this.state.list,
    });
}
​
html:
--------------
<li onClick={this.checkItem.bind(this,item)} key={index}>{ item.name }
    <input type="button" value="删除"  onClick={this.deleteItem.bind(this,item)} style={{ marginTop:'5px',cursor:'pointer'}} className={item.status ?  'show' :'hide'}/>
</li>
```

7.创建addList() 实现点击添加li的方法

``` javascript
    
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
​
​
html：
---------------
 <div className="dialog">
                 <div><input type="text" placeholder="请输入" value={ this.state.inputValue } onChange={this.handleGetValue.bind(this)}/></div>
                 <div><input type="button" value="添加"  onClick={this.addList}/></div>
 </div>
```

完整代码：

``` javascript
    
import React, { Component } from 'react';
import Itemlist from './component/itemLsit';
import './App.css';
​
class TodoList extends Component {
    constructor (props) {
        super(props);
​
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
​
        this.addList = this.addList.bind(this);  //绑定this
    }
​
​
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
​
        this.setState({
            list: obj,
        });
​
    }
    //删除item
    deleteItem(item)  {
     this.state.list.map((v,index) => {
       if(v.id === item.id) {
           this.state.list.splice(index,1)
       }
       // return this.state.list
     })
​
      this.setState({  //保存状态
          list: this.state.list,
      });
​
    }
​
    render () {
      return (
          <div>
             <div className="dialog">
                 <div><input type="text" placeholder="请输入" value={ this.state.inputValue } onChange={this.handleGetValue.bind(this)}/></div>
                 <div><input type="button" value="添加"  onClick={this.addList}/></div>
             </div>
​
              <ul className={this.state.list.length === 0 ? 'toul1' :'toul'}>
                  {
                    this.state.list.map((item ,index)=>{
                        return (
                            <li onClick={this.checkItem.bind(this,item)} key={index}>{item.name}
                                <input type="button" value="删除" onClick={this.deleteItem.bind(this,item)} style={{ marginTop:'5px',cursor:'pointer'}}
                                className={item.status ?  'show' :'hide'}/>
                            </li>
                        )
                    })
                  }
              </ul>
              <div className={ this.state.list.length === 0? 'show noList':'hide'}>删完了</div>
          </div>
      )
    }
}
​
export default TodoList;
```

 