import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  user = new User();
  userId: string = '';
  birthDate!: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialogRef<DialogEditUserComponent>) {}

  ngOnInit(): void {}

  async saveUser() {
    if (!this.userId) {
      console.error('User ID is required');
      return;
    }

    this.loading = true;
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }

    try {
      const userDoc = doc(this.firestore, 'users', this.userId);
      await updateDoc(userDoc, this.user.toJSON());
      console.log('User updated successfully');
      this.dialog.close();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user. Please try again.');
    } finally {
      this.loading = false;
    }
    console.log('Saving user:', this.user);
    this.dialog.close();
  }
}
