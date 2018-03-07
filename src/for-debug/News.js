import React, {Component} from 'react';
import Post from './Post.js';

class News extends Component {
    state = {
        posts: [{
            header: 'Post1',
            content: 'post1',
            likes: 100
        }, {
            header: 'Post2',
            content: 'post2',
            likes: 200
        }, {
            header: 'Post3',
            content: 'post3',
            likes: 300
        }]
    };

    addPost(){
        let newState = Object.assign({}, this.state);
        newState.posts.push({
            header: 'Post4',
            content: 'post4',
            likes: 400
        });
        this.setState( newState);
    }

    addLike = (key) => {
        //let newState = Object.assign({}, this.state);
        //newState.posts[key].likes++;
        //this.setState(newState);

        this.setState((prevState) => {
            prevState.posts[key].likes++;
            return prevState;
        })
    };

    render(){
        return (
            <div className='post-list'>
                {this.state.posts.map( (post, index) => {
                    return <Post key={index} header={post.header} likes={post.likes} clickHandler={()=>{this.addLike(index)}}>{post.content}</Post>
                })}
                <button onClick={this.addPost.bind(this)}>
                    Add New Post
                </button>
            </div>
        )
    }
}

export default News;