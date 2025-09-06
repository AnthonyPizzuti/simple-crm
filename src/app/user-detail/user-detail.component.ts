import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  user$: Observable<any> | undefined;
  user: any = null;
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = userId;
      const userDoc = doc(this.firestore, 'users', userId);
      this.user$ = docData(userDoc);
      console.log('GOT IT', userId);
      this.user$.subscribe((userData) => {
        this.user = userData;
        console.log('User data:', userData);
      });
    }
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId!;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId!;
  }
}
