{    
    //method to submit the form data for new post using ajax
    let createPost=function(){
        //getting form from home.ejs id
        let newPostForm=$('#new-post-form');
        //preventing default action of submit as we need to submit through ajax
        newPostForm.submit(function(e){
            e.preventDefault();
            //now submitting through ajax
            $.ajax({
                type:'post',
                url:'/posts/create',
                //converts post data into json like content becomes key and value is the one entered
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in dom
    let newPostDom=function(post){
        //copied from _post.ejs and removed unnecessary checks
        return $(`
                    <li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                        </small>

                        ${ post.content}
                        <br>
                        <small>
                        ${post.user.name$}
                        </small>
                    </p>
                    <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type Here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}" >
                            <input type="submit" value="Add Comment">
                        </form>

                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}"> 
                            </ul>
                        </div>
                    </div>
                </li>
        `)
    }

    createPost();
} 