import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  isEditing = false;
  editedName = '';
  @Output() pressed = new EventEmitter();

  constructor(public userService: UserService) {}

  startEditing() {
    this.isEditing = true;
    this.editedName = this.userService.user!.name;
  }

  handleSave() {
    
      // Update the user object in the service
      this.userService.updateUser({ ...this.userService.user, name: this.editedName });
      this.isEditing = false;
    
  }
  

  handleLogout() {
    this.userService.logout();
  }

  handleDeleteGrade(semester: string) {
    this.userService.deleteGrade(semester);
  }

  toggleProfile() {
    this.pressed.emit()
  }
}
