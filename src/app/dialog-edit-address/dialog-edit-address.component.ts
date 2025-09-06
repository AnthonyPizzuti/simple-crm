import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
  selector: 'app-dialog-edit-address',
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
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent implements OnInit {
  user = new User();
  userId: string = '';
  loading = false;
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialogRef<DialogEditAddressComponent>) {}

  ngOnInit(): void {}

  async saveUser() {
    if (!this.userId) {
      console.error('User ID is required');
      return;
    }

    this.loading = true;
    try {
      const userDoc = doc(this.firestore, 'users', this.userId);
      await updateDoc(userDoc, this.user.toJSON());
      console.log('Address updated successfully');
      this.dialog.close();
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Error updating address. Please try again.');
    } finally {
      this.loading = false;
    }
  }
}
