package com.zos.services;

import java.util.List;

import com.zos.exception.CommentException;
import com.zos.exception.PostException;
import com.zos.exception.UserException;
import com.zos.model.Comments;

public interface CommentService {
	
	public Comments createComment(Comments comment,Integer postId,Integer userId) throws PostException, UserException;

	public Comments findCommentById(Integer commentId) throws CommentException;
	public Comments likeComment(Integer CommentId,Integer userId) throws UserException, CommentException;
	public Comments unlikeComment(Integer CommentId,Integer userId) throws UserException, CommentException;
	
	public String deleteCommentById(Integer commentId) throws CommentException;
	
	public String editComment(Comments comment, Integer commentId) throws CommentException;
	
	public List<Comments> findCommentByPostId(Integer postId)throws PostException;
}
