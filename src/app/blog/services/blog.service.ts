import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../shared/models/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private mockPosts: Post[] = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      content: 'Angular is a powerful framework for building web applications...',
      excerpt: 'Learn the basics of Angular and start building your first application.',
      author: 'John Doe',
      publishDate: new Date('2024-03-15'),
      tags: ['Angular', 'Web Development', 'JavaScript'],
      imageUrl: 'assets/images/angular.jpg'
    },
    {
      id: 2,
      title: 'Understanding TypeScript',
      content: 'TypeScript adds static typing to JavaScript...',
      excerpt: 'A comprehensive guide to TypeScript features and best practices.',
      author: 'Jane Smith',
      publishDate: new Date('2024-03-14'),
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      imageUrl: 'assets/images/typescript.jpg'
    }
  ];

  constructor() { }

  getPosts(): Observable<Post[]> {
    return of(this.mockPosts);
  }

  getPostById(id: number): Observable<Post | undefined> {
    return of(this.mockPosts.find(post => post.id === id));
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    const newPost = {
      ...post,
      id: this.mockPosts.length + 1
    };
    this.mockPosts.push(newPost);
    return of(newPost);
  }

  updatePost(id: number, post: Partial<Post>): Observable<Post | undefined> {
    const index = this.mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPosts[index] = { ...this.mockPosts[index], ...post };
      return of(this.mockPosts[index]);
    }
    return of(undefined);
  }

  deletePost(id: number): Observable<boolean> {
    const index = this.mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPosts.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
