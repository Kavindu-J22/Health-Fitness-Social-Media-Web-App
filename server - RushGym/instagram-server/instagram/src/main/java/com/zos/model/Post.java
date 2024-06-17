package com.zos.model;
import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zos.dto.UserDto;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String caption;
	
	@Column(nullable = false)
	private String image;
	private String location;
	private LocalDateTime createdAt;
	
	@Embedded
	@AttributeOverride(name="id",column = @Column(name="user_id"))
	@AttributeOverride(name="email",column = @Column(name="user_email"))
	@AttributeOverride(name="username",column = @Column(name="user_username"))
	private UserDto user;
	
	@JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> comments = new ArrayList<>();
	
	@ElementCollection
	@Embedded
	@JoinTable(name = "likeByUsers", joinColumns = @JoinColumn(name="user_id"))
	private Set<UserDto> likedByUsers= new HashSet<>(); 
	
	public Post() {
		// TODO Auto-generated constructor stub
	}

	
	public Post(Integer id, String caption, String image, String location, LocalDateTime createdAt, UserDto user,
			List<Comments> comments, Set<UserDto> likedByUsers) {
		super();
		this.id = id;
		this.caption = caption;
		this.image = image;
		this.location = location;
		this.createdAt = createdAt;
		this.user = user;
		this.comments = comments;
		this.likedByUsers = likedByUsers;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	

	public String getCaption() {
		return caption;
	}







	public void setCaption(String caption) {
		this.caption = caption;
	}







	public String getLocation() {
		return location;
	}







	public void setLocation(String location) {
		this.location = location;
	}







	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	

	public List<Comments> getComments() {
		return comments;
	}

	public void setComments(List<Comments> comments) {
		this.comments = comments;
	}



	public UserDto getUser() {
		return user;
	}



	public void setUser(UserDto user) {
		this.user = user;
	}



	public Set<UserDto> getLikedByUsers() {
		return likedByUsers;
	}



	public void setLikedByUsers(Set<UserDto> likedByUsers) {
		this.likedByUsers = likedByUsers;
	}


	

	

	
	
	
}
