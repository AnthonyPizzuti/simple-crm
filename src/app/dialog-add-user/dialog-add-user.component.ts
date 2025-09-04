import { Component, OnInit } from '@angular/core';
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
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dialog-add-user',
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
    MatCardModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading = false;

  constructor(public dialog: MatDialogRef<DialogAddUserComponent>) {}

  ngOnInit(): void {}

  async saveUser() {
    if (!this.birthDate) {
      console.error('Birth date is required');
      return;
    }
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    try {
      const usersCollection = collection(this.firestore, 'users');
      const userData = this.user.toJSON();
      console.log('Saving user data:', userData);
      const result = await addDoc(usersCollection, userData);
      this.loading = false;
      console.log('Adding user finished', result);
      this.dialog.close();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error saving user. Please check your connection and try again.');
    }
  }
}
