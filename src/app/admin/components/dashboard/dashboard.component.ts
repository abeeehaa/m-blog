import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Post } from '../../../shared/models/post';
import { PostEditorComponent } from '../post-editor/post-editor.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PostEditorComponent],
  template: `
    <div class="container py-8">
      <!-- Success Message -->
      @if (successMessage) {
        <div class="alert alert-success">
          {{ successMessage }}
        </div>
      }

      <!-- Error Message -->
      @if (errorMessage) {
        <div class="alert alert-error">
          {{ errorMessage }}
        </div>
      }

      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Admin Dashboard</h1>
        <button 
          (click)="showNewPostForm = true"
          class="btn btn-accent">
          New Post
        </button>
      </div>

      <!-- Post Editor -->
      @if (showNewPostForm || editingPost) {
        <div class="card mb-8">
          <app-post-editor
            [post]="editingPost || newPost"
            [isEditing]="!!editingPost"
            (save)="onSavePost($event)"
            (cancel)="onCancelEdit()">
          </app-post-editor>
        </div>
      }

      <!-- Posts List -->
      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (post of posts; track post.id) {
              <tr>
                <td>{{ post.title }}</td>
                <td>{{ post.author }}</td>
                <td>{{ post.publishDate | date }}</td>
                <td>
                  <button 
                    (click)="editPost(post)"
                    class="btn btn-primary mr-2">
                    Edit
                  </button>
                  <button 
                    (click)="confirmDelete(post)"
                    [disabled]="isDeleting === post.id"
                    class="btn btn-accent">
                    {{ isDeleting === post.id ? 'Deleting...' : 'Delete' }}
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Delete Confirmation Modal -->
      @if (postToDelete) {
        <div class="modal-overlay">
          <div class="modal-content">
            <h3 class="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p class="mb-6">Are you sure you want to delete the post "{{ postToDelete.title }}"? This action cannot be undone.</p>
            <div class="flex justify-end space-x-4">
              <button 
                (click)="cancelDelete()"
                class="btn">
                Cancel
              </button>
              <button 
                (click)="deletePost(postToDelete.id)"
                [disabled]="isDeleting === postToDelete.id"
                class="btn btn-accent">
                {{ isDeleting === postToDelete.id ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  showNewPostForm = false;
  editingPost: Post | null = null;
  postToDelete: Post | null = null;
  isDeleting: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  newPost: Omit<Post, 'id'> = {
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    publishDate: new Date(),
    tags: []
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.adminService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  onSavePost(post: Partial<Post>): void {
    if (this.editingPost) {
      this.adminService.updatePost(this.editingPost.id, post).subscribe(updatedPost => {
        if (updatedPost) {
          const index = this.posts.findIndex(p => p.id === updatedPost.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
          this.showSuccess('Post updated successfully');
        }
        this.onCancelEdit();
      });
    } else {
      this.adminService.createPost(post as Omit<Post, 'id'>).subscribe(() => {
        this.loadPosts();
        this.showSuccess('Post created successfully');
        this.onCancelEdit();
      });
    }
  }

  editPost(post: Post): void {
    this.editingPost = { ...post };
    this.showNewPostForm = true;
  }

  confirmDelete(post: Post): void {
    this.postToDelete = post;
  }

  cancelDelete(): void {
    this.postToDelete = null;
    this.isDeleting = null;
  }

  deletePost(id: number): void {
    this.isDeleting = id;
    this.adminService.deletePost(id).subscribe({
      next: (success) => {
        if (success) {
          this.posts = this.posts.filter(post => post.id !== id);
          this.showSuccess('Post deleted successfully');
        } else {
          this.showError('Failed to delete post');
        }
        this.cancelDelete();
      },
      error: () => {
        this.showError('An error occurred while deleting the post');
        this.cancelDelete();
      }
    });
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  onCancelEdit(): void {
    this.showNewPostForm = false;
    this.editingPost = null;
    this.newPost = {
      title: '',
      content: '',
      excerpt: '',
      author: 'Admin',
      publishDate: new Date(),
      tags: []
    };
  }
}