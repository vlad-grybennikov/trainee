import React, {Component} from 'react';

//class Post extends Component{
//    constructor(props){
//        super(props);
//        this.state = {
//            likes: props.likes
//        }
//    }
//    likeAdd = () => {
//        this.setState((prevState) => {
//            prevState.likes++;
//            return prevState;
//        })
//    }
//    render(){
//        return (
//        <div className=''>
//            <h1 style={{
//				fontSize: "36px"
//			}} className="post__header">{this.props.header}</h1>
//            <p className="post__content">{this.props.children}</p>
//            <div className="post__likes">Likes: {this.state.likes}</div>
//            <button onClick={this.likeAdd}>Like!</button>
//        </div>
//        )
//    }
//}

const Post = (props) => {
    console.log(props);
    return (
        <div className=''>
            <h1 style={{
				fontSize: "36px"
			}} className="post__header">{props.header}</h1>
            <p className="post__content">{props.children}</p>
            <div className="post__likes">Likes: {props.likes}</div>
            <button data-index={props.index} onClick={props.onLike}>Like!</button>
        </div>
    )
}
export default Post;