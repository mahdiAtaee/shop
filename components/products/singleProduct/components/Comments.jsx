/* eslint-disable react/prop-types */
import Image from 'next/image'
import React from 'react'

const Comments = ({comments}) => {
    return (
        <div
            className="tab-pane fade single-post"
            id="frontend"
            role="tabpanel"
            aria-labelledby="frontend-tab"
        >
            <div className="comments">
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id} className="comment ">
                            <article className="comment-body">
                                <footer className="comment-meta">
                                    <div className="comment-author">
                                        <Image src={comment.user.avatar} width={45} height={45}/>
                                        <b className="fn">
                                            <a href="#" rel="external nofollow" className="url">
                                                {`${comment.user.firstName} ${comment.user.lastName}`}
                                            </a>
                                        </b>
                                        <span className="says">گفته:</span>
                                    </div>
                                    <div className="comment-metadata">
                                        <a href="#">
                                            <time >{comment.createdAt}</time>
                                        </a>
                                    </div>
                                </footer>
                                <div className="comment-content">
                                    <p>
                                        {comment.body}
                                    </p>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
            <a href="javascript:;" className="btn btn-theme">
                یک بررسی اضافه کنید
            </a>
        </div>

    )
}

export default Comments