import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule]
})
export class App {
  departments = ['Development', 'Marketing', 'Design'];
  members = [
    { id: 1, name: 'Esraa', age: 24, department: 'Development', available: true },
    { id: 2, name: 'Ahmed', age: 28, department: 'Marketing', available: false },
    { id: 3, name: 'Mariam', age: 26, department: 'Design', available: true },
  ];
  selectedDepartment = 'All Departments';
  viewMode = 'cards';
  newMember = {
    name: '',
    age: 0,
    department: 'Development',
    available: true,
  };
  nextId = 4;

  get filteredMembers() {
    if (this.selectedDepartment === 'All Departments') {
      return this.members;
    }

    return this.members.filter(
      (member) => member.department === this.selectedDepartment
    );
  }

  addMember(): void {
    if (this.newMember.name.trim() === '' || this.newMember.age <= 0) {
      return;
    }

    this.members.push({
      id: this.nextId,
      name: this.newMember.name,
      age: this.newMember.age,
      department: this.newMember.department,
      available: this.newMember.available,
    });
    this.nextId++;
    this.newMember = {
      name: '',
      age: 0,
      department: 'Development',
      available: true,
    };
  }

  toggleAvailability(id: number): void {
    this.members = this.members.map((member) =>
      member.id === id ? { ...member, available: !member.available } : member
    );
  }
}
