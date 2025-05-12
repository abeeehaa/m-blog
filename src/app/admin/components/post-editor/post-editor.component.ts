import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../shared/models/post';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">{{ isEditing ? 'Edit Post' : 'Create New Post' }}</h2>
      <form (ngSubmit)="onSubmit()" #postForm="ngForm">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Title</label>
          <input 
            type="text" 
            [(ngModel)]="post.title" 
            name="title"
            class="w-full p-2 border rounded"
            required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Content</label>
          <textarea 
            [(ngModel)]="post.content" 
            name="content"
            class="w-full p-2 border rounded h-32"
            required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Excerpt</label>
          <textarea 
            [(ngModel)]="post.excerpt" 
            name="excerpt"
            class="w-full p-2 border rounded"
            required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Tags (comma-separated)</label>
          <input 
            type="text" 
            [(ngModel)]="tagInput" 
            name="tags"
            class="w-full p-2 border rounded"
            (blur)="updateTags()">
        </div>
        <div class="flex justify-end gap-4">
          <button 
            type="button"
            (click)="onCancel()"
            class="px-4 py-2 border rounded hover:bg-gray-100">
            Cancel
          </button>
          <button 
            type="submit"
            [disabled]="!postForm.form.valid"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {{ isEditing ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class PostEditorComponent implements OnInit {
  @Input() post: Partial<Post> = {
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    publishDate: new Date(),
    tags: []
  };
  @Input() isEditing = false;
  @Output() save = new EventEmitter<Partial<Post>>();
  @Output() cancel = new EventEmitter<void>();

  tagInput = '';

  ngOnInit(): void {
    this.tagInput = this.post.tags?.join(', ') || '';
  }

  onSubmit(): void {
    this.save.emit(this.post);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  updateTags(): void {
    this.post.tags = this.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
  }
} 