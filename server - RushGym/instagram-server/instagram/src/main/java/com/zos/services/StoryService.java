package com.zos.services;

import java.util.List;

import com.zos.exception.StoryException;
import com.zos.exception.UserException;
import com.zos.model.Story;

public interface StoryService {

	public Story createStory(Story story,Integer userId) throws UserException;
	
	public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException;
	
	
}
