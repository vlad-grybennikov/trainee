import React, {Component} from 'react';
import Post from "./Post";
import Timer from "./Timer";
import Select from "./Select";
import Training from './training/Training'



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


    changeAge = (e) => {
        let value = parseInt(e.target.value, 10);
        this.setState({
            age: !isNaN(value) ? value : ''
        });
    }
    changeName = (e) => {
        let value = e.target.value;
        this.setState({
            name: value
        });
    }

    renderTimer = () => {
        if(this.state.timer){
            return <Timer
                        seconds={this.state.seconds}
                        minutes={this.state.minutes}
                    />
        } else {
            return null;
        }
    }

    render(){
        return (

            <div className="post-list">
                <Training></Training>
                {/*<div>
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
                {this.renderTimer()}
                */}


                <Select className="asd" placeholder="Choose Option" selectedIndex={1}>
                    <Select.Option value="option-1">
                        <b>1</b>
                        Option 1
                    </Select.Option>
                    <Select.Option>
                        Option 2
                    </Select.Option>
                    <Select.Option>
                        Option 3
                    </Select.Option>
                </Select>
            </div>
        )
    }
}

export default News;