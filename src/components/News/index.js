import React, {Component} from 'react';
import Post from "./Post";



class News extends Component{
    constructor(props){
        super(props);
        // this.props = props;
        this.state = {
            name: "",
            age: "",
            posts: [{
                header: "Post 1",
                content: "Post 1",
                likes: 100
            }, {
                header: "Post 2",
                content: "Post 2",
                likes: 200
            }, {
                header: "Post 3",
                content: "Post 3",
                likes: 300
            }],
            timer: true,
            minutes: 13,
            seconds: 38
        };

        //setState(object|func, ?func){
        //    if (object) {
        //        this.state = Object.assign(this.state, object);
        //        render()
        //            .then(? func)
        //    } else if (func) {
        //        let copiedState = Object.assign({}, this.state);
        //        this.state = func(copiedState);
        //    }
        //    render().then(?func)
        //};

        //setInterval(() => {
        //   this.setState((prevState) => {
        //       prevState.posts[0].likes++;
        //       return prevState;
        //   })
        //}, 2000);
    }
    addPost = () => {
        console.log("Click");
        let newState = Object.assign({}, this.state);
        newState.posts.push({
            header: "Post 4",
            content: "Post 4",
            likes: 400
        });
        this.setState(newState);
    }

    actionLike(index, e){
        this.setState((prevState) => {
            prevState.posts[index].likes++;
            return prevState;
        });
    }






    render(){

        return (

            <div className="post-list">


                <div>
                    Заголовок
                    <input onChange={this.changeInput}
                           type="text"
                           value={this.state.name} />
                    <p>
                        Контент:
                        <textarea  cols="30" rows="10"></textarea>
                    </p>
                    <button onClick={this.addPost}>
                        Add New Post
                    </button>
                </div>
                {this.state.posts.map((post, index) => {
                    return <Post header={post.header}
                                 key={index}
                                 index={index}
                                 likes={post.likes}
                                 onLike={this.actionLike.bind(this, index)}
                    >
                        {post.content}
                    </Post>
                })}





            </div>
        )
    }
}

export default News;