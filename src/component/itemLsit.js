import React , {Component} from 'react';


class ItemList extends  Component {
    constructor(prop) {
        super(prop)

         this.clickItem = this.clickItem.bind(this);
         this.deleteItem = this.deleteItem.bind(this);
    }
    clickItem() {
        console.log(this.props);
        console.log(this.props.checkItem(this.props.item));
    }
    deleteItem() {
        this.props.deleteItem(this.props.item)
    }
    render() {
        const item = this.props.item;
        return (
            <li key={item.id} onClick={ this.clickItem }>
                { item.name }
                <input type="button" value="删除" onClick={ this.deleteItem } style={{ marginTop:'5px',cursor:'pointer'}}
                       className={item.status ?  'show' :'hide'}/>
            </li>
        )
    }
}

export default ItemList;