import React ,{Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Sidedrawer/Sidedrawer';


class Layout extends Component{
state={
    showSidedrawer:false
}

SidedrawerCloseHandler = ()=>{
    this.setState({showSidedrawer:false})
}

toggleSidedrawerHandler =()=>{
    this.setState({showSidedrawer:!this.showSidedrawer})
}
    render(){
        return(
<Auxiliary>
        <Toolbar toggle ={this.toggleSidedrawerHandler}/>
        <Sidedrawer open ={this.state.showSidedrawer} close ={this.SidedrawerCloseHandler}/>
    <main className = {classes.Container}>
        {this.props.children}
    </main>
    </Auxiliary>
        )
    }
    
    
}


export default Layout;