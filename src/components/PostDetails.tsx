import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Props {
  post: Post | null;
  isPostCommentsLoading: boolean;
  selectedPostComments: Comment[];
  hasPostCommentsError: boolean;
}

export const PostDetails = ({
  post,
  isPostCommentsLoading,
  selectedPostComments,
  hasPostCommentsError,
}: Props) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {post && (
          <>
            <div className="block">
              <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

              <p data-cy="PostBody">{post.body}</p>
            </div>

            <div className="block">
              {isPostCommentsLoading && <Loader />}

              {hasPostCommentsError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {!isPostCommentsLoading && selectedPostComments.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : null}

              {!isPostCommentsLoading && selectedPostComments.length > 0 ? (
                <>
                  <p className="title is-4">Comments:</p>

                  {selectedPostComments.map(comment => (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      <div className="message-header">
                        <a
                          href="mailto:misha@mate.academy"
                          data-cy="CommentAuthor"
                        >
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  ))}
                </>
              ) : null}

              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
              >
                Write a comment
              </button>
            </div>
          </>
        )}

        <NewCommentForm />
      </div>
    </div>
  );
};
