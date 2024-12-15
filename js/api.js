const forumContainer = document.getElementById('forumContainer');
let pagination;



function renderPosts(posts) {
    forumContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement =
            createGroupDiv(post)

        post.contents.forEach(content => {
            let contentDiv = createTitleDiv(content);

            if (content.comments) {
                content.comments.forEach(comment => {
                    const commentDiv = createSubContentDiv(comment)
                    contentDiv.appendChild(commentDiv);
                })
            }

            postElement.appendChild(contentDiv);
        });

        forumContainer.appendChild(postElement);
    });
}

function createGroupDiv(post) {
    let postElement = document.createElement('div');
    let groupTitle = document.createElement('div');
    groupTitle.classList.add('dis-group');
    groupTitle.innerHTML = `<h1>${post.title}</h1>`;
    let titleButton = document.createElement('button');
    titleButton.classList.add('btn');
    titleButton.classList.add('btn-outline-secondary');
    titleButton.onclick = function () {
        contentAddButton(post.id)
    };
    titleButton.type = 'button';
    titleButton.innerText = 'Add Idea';
    groupTitle.appendChild(titleButton);
    postElement.appendChild(groupTitle);
    return postElement;
    // postElement.innerHTML = `<h2>${post.title}</h2> `;
}

function createTitleDiv(content) {
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('dis-title');

    let titleButton = document.createElement('a');
    titleButton.onclick = function () {
        commentButton(content.id)
    };
    // titleButton.type = 'button';
    titleButton.innerText = 'Comment';

    //pattern for the content div
    contentDiv.innerHTML = `
        <div class="d-flex justify-content-between div-title">

            <div class="text-break -wd">
                <h4>${content.content}</h4>
            </div>
            <div class="d-flex justify-content-end -bt">
                <div class="fit-content">
                    <button class="btn btn-outline-secondary /*btn btn-sm  form-text px-1 py-2*/ ">${titleButton.outerHTML}</button>
                </div>
            </div>
        </div>
    `;


    // contentDiv.appendChild(titleButton);
    return contentDiv;
}



function createSubContentDiv(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('dis-content');

    let imageElement = document.createElement('img');
    imageElement.classList.add('btn-avatar');
    imageElement.classList.add('fit-within');
    imageElement.onclick = function () {
        commentButton(comment.id, comment.id);
    };
    // imageElement.type = 'button';
    imageElement.src = `${comment.avatar}`;
    let dt = null;
    if(comment.postDate){
        dt = moment(comment.postDate).format("DD MMM, YYYY hh:mm");
    }
    commentDiv.innerHTML = `
                        <div class="cmt-user">${imageElement.outerHTML}</div>
                        <div style="width: 90%">
                            <div class="cmt-content">
                                ${comment.content}
                            </div>
                            <div class="d-flex justify-content-between cmt-detail">
                                <div class="d-flex justify-content-between icon">
                                    <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-chat-left-dots"></i></button>
                                    <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-star-fill"></i></button>
                                </div>
                                <div class="dt p-0"><p>posted: ${dt}</p></div>
                            </div>
                        </div>
                    `
    return commentDiv;
}



function updatePagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (paginationContainer) {
        paginationContainer.remove();
    }
    forumContainer.appendChild(pagination.renderPagination(loadData));
}

document.addEventListener('DOMContentLoaded', () => {
    pagination = new Pagination(10); // Assuming 10 total pages for now
    loadData();
});

function contentAddButton(id) {
    console.log("click: " + id);
}

function commentButton(id, toId = null) {
    console.log("click id:" + id + " toId:" + toId);
}

function loadData(page = 1) {
    axios.get(`/api/posts?page=${page}&rowsPerPage=5`)
        .then(response => {
            const data = response.data;
            renderPosts(data.posts);
            pagination.setTotalPages(data.totalPages);
            pagination.setCurrentPage(page);
            updatePagination();
        })
        .catch(() => {
            // Sample data for testing purposes
            const sampleData = {
                posts: [
                    {
                        id: 3, title: 'GITHUB.IO', //id=id, content=title content, likes=no idea yet, parentId=null id, toId=null id, type=1.suggest group 2.approve group
                        contents: [
                            {
                                id: 31,
                                content: 'Suggestion for github.io domain design',
                                likes: 10,
                                comments: [
                                    {
                                        id: 311,
                                        avatar: `https://ui-avatars.com/api/?name=SiYa&background=ffffff&color=6c757d`,
                                        postDate: 1465826400000,
                                        content: 'Lorem ipsum dolor sit amet. Sed corrupti molestiae qui provident voluptatum qui praesentium internos eum sint iusto nam consequatur consequatur non minima maiores. Aut blanditiis alias aut magni nesciunt ex quos doloribus. Ea dignissimos sunt est dolor nulla qui nisi nemo 33 dignissimos necessitatibus et rerum consequuntur a commodi similique. Qui esse ipsam qui inventore officiis non reiciendis accusantium ex quisquam modi eum esse velit aut dolorem neque.',
                                        likes: 20,
                                        toId: 330,
                                    },
                                    {
                                        id: 311,
                                        avatar: `https://www.shutterstock.com/image-photo/portrait-surprised-cat-scottish-straight-600nw-499196506.jpg`,
                                        postDate: 1465826400000,
                                        content: '<p>question</p><ol><li>point 1</li><li>point 2</li…<br></p><p>how to <strong>solve</strong> this</p>',
                                        likes: 20,
                                        toId: 330,
                                    },

                                ]
                            },
                            {
                                id: 33,
                                content: 'A line post',
                                likes: 10,
                                comments: [
                                    {
                                        id: 332,
                                        avatar: stringDelLater(),
                                        postDate: 1465826400000,
                                        content:
                                            'a line comment',
                                        likes: 20,
                                        toId: 330,
                                    },
                                    {
                                        id: 332,
                                        avatar: `https://ui-avatars.com/api/?name=SiYa&background=ffffff&color=6c757d`,
                                        postDate: 1465826400000,
                                        content:
                                            'a line comment',
                                        likes: 20,
                                        toId: 330,
                                    },
                                ]
                            },
                            {
                                id: 32,
                                content: 'Recording for next continuing day',
                                likes: 10,
                                comments: [
                                    {
                                        id: 332,
                                        avatar: `https://ui-avatars.com/api/?name=ABC&background=ffffff&color=6c757d`,
                                        content:
                                            '1. adjust button next <br>' +
                                            '2. think design, and may need to re-adjust spacing <br>',
                                        likes: 20,
                                        toId: 330,
                                    },
                                ]
                            },
                            {
                                id: 34,
                                content: '<a href="#!"><img class="img-fluid" src="assets/img/post-sample-image.jpg" alt="..." /></a>' + '<span class="caption text-muted">To go places and do things that have never been done before – that’s what living is all about.</span>',
                                likes: 10,
                            },
                            {
                                id: 35,
                                content: '<p>Placeholder text by<a href="http://spaceipsum.com/">Space Ipsum</a>&middot; Images by<a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a></p>',
                                likes: 10,
                            },
                        ]
                    },
                    {
                        id: 4,
                        title: 'Sample Post 2',
                        contents: [
                            {
                                id: 41,
                                content: "  1234567890123456789012345678901234567890\n1",
                                likes: 10,
                                comments: [
                                    {
                                        id: 332,
                                        avatar: `https://ui-avatars.com/api/?name=01&background=ffffff&color=6c757d`,
                                        postDate: 1234567890123,
                                        content:
                                            '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
                                        likes: 20,
                                        toId: 330,
                                    },
                                ]
                            },
                            {
                                id: 42,
                                content: 'content 2',
                                likes: 10,
                            },
                        ],
                    },
                ],
                totalPages: 10
            };

            renderPosts(sampleData.posts);
            pagination.setTotalPages(sampleData.totalPages);
            pagination.setCurrentPage(page);
            updatePagination();
            updateSquare();
        });
}
function stringDelLater() {
    return "data:image/jpeg;base64,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"
}