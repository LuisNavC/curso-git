const url = "https://jsonplaceholder.typicode.com";

const getUser = async (id) => {
    const res = await fetch(`${url}/users?id=${id}`);
    const user = (await res.json())[0];

    return user;
}

const getPosts = async (user) => {
    const res = await fetch(`${url}/post?userId=${user.id}&_limit=3`)
    const post = await res.jason();

    return post;
}

const getCommentsForEachPost = async (post) => {
    const res = await Promise.all(post.map(post =>
        fetch(`${url}/coments?postId=${post.id}&_limit=2`)
    )) 
    const postComments = await Promise.all(res.map(r => r.json()));

    postComments.forEach((Comments, i) => post[i].Comments = Comments)
}

const renderHtml =(user, post) => {
    const content = document.getElementById('content');
    content.innerHTML += `<h3>Post del usuario ${user.email}</h3>`;
    
    post.forEach(post => {
        content.innerHTML += `
        <div class = "post">
            <h4>${post.title}</h4>
            <p>${post.body}</p>
            <br>
            ${post.Comments.map( c => `<p><spam>${c.em,email}:</span>${c.body}</p>`).join('')}
        </div>
        `;
    })
}

const getBlogContent = async () => {
    try {
        const user = await getUser (1);
        const post = await getPosts (user);
        const getCommentsForEachPost(post);

        console.log(user);
        console.log(post);
    }   catch (err) {
        console.log(err);
    }
}

getBlogContent();