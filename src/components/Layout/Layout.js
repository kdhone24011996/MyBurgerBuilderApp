import React ,{Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Sidedrawer/Sidedrawer';
import Backdrop from '../Burger/UI/Backdrop/Backdrop';
import { connect } from 'react-redux';
import * as createActions from '../../store/actions/index'
import { withRouter } from 'react-router-dom';



class Layout extends Component{
state={
    showSidedrawer:false
}




toggleSidedrawerHandler =()=>{
    this.setState({...this.state,showSidedrawer:!this.showSidedrawer})
    //as it will be only called when sideDrawer has to open therefore i can write
    if(!this.state.showSidedrawer){
        this.props.onBackdropShow()
    }
    else{
        this.props.onBackdropClose()
    }
   

}


componentDidUpdate(){
    if(!this.props.backdropShow && this.state.showSidedrawer){
        this.setState({...this.state, showSidedrawer:false})
    }
}


    render(){
        return(
<Auxiliary>
<Backdrop />
        <Toolbar toggle ={this.toggleSidedrawerHandler}/>
        <Sidedrawer open ={this.state.showSidedrawer} close ={this.toggleSidedrawerHandler}/>
    <main className = {classes.Container}>
        {this.props.children}
    </main>
    </Auxiliary>
        )
    }
     
}

const mapStateToProps =(state)=>{
return{
    backdropShow : state.backdrop.backdropShow
}
}
 
 const mapDispatchToProps = (dispatch)=>{
    return{
       onBackdropShow: ()=>dispatch(createActions.backdropShow()),
       onBackdropClose: ()=>dispatch(createActions.backdropClose())
    }
   
 }


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Layout)) ;