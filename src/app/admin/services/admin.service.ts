import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../shared/models/post';
import { BlogService } from '../../blog/services/blog.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private blogService: BlogService) {}

  getAllPosts(): Observable<Post[]> {
    return this.blogService.getPosts();
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.blogService.createPost(post);
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post | undefined> {
    return this.blogService.updatePost(id, post);
  }

  deletePost(id: number): Observable<boolean> {
    return this.blogService.deletePost(id);
  }
} 