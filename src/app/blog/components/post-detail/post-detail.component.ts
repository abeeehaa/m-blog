import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../../shared/models/post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      @if (post) {
        <article class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
          <div class="flex items-center text-gray-600 mb-8">
            <span class="mr-4">By {{ post.author }}</span>
            <span>{{ post.publishDate | date }}</span>
          </div>
          @if (post.imageUrl) {
            <img [src]="post.imageUrl" [alt]="post.title" class="w-full h-96 object-cover rounded-lg mb-8">
          }
          <div class="prose max-w-none">
            {{ post.content }}
          </div>
          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-4">Tags</h3>
            <div class="flex flex-wrap gap-2">
              @for (tag of post.tags; track tag) {
                <span class="bg-gray-200 px-3 py-1 rounded-full text-sm">{{ tag }}</span>
              }
            </div>
          </div>
        </article>
      } @else {
        <div class="text-center">
          <p class="text-xl">Post not found</p>
        </div>
      }
    </div>
  `,
  styles: []
})
export class PostDetailComponent implements OnInit {
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.blogService.getPostById(id).subscribe(post => {
        this.post = post;
      });
    });
  }
}
