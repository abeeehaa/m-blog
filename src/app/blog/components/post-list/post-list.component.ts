import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../../shared/models/post';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-8">
      <h1 class="text-3xl font-bold mb-8">Blog Posts</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (post of posts; track post.id) {
          <article class="post-card">
            @if (post.imageUrl) {
              <img 
                [src]="post.imageUrl" 
                [alt]="post.title"
                class="w-full h-48 object-cover rounded-t-lg mb-4"
              >
            }
            <h2 class="text-xl font-semibold">{{ post.title }}</h2>
            
            <div class="post-meta">
              <span>By {{ post.author }}</span>
              <span class="mx-2">•</span>
              <span>{{ post.publishDate | date }}</span>
            </div>
            
            <p class="post-excerpt">{{ post.excerpt }}</p>
            
            <div class="post-footer">
              <div class="flex gap-2">
                @for (tag of post.tags; track tag) {
                  <span class="px-2 py-1 bg-gray-100 text-sm rounded-full">{{ tag }}</span>
                }
              </div>
              
              <a 
                [routerLink]="['post', post.id]"
                class="btn btn-accent"
              >
                Read More
              </a>
            </div>
          </article>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem 0;
    }
  `]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}