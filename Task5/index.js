// Base Class: Person
class Person {
    #id;
    #email;

    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        if (!value) {
            throw new Error("ID cannot be empty");
        }
        this.#id = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        if (!value || !value.includes("@")) {
            throw new Error("Invalid email address");
        }
        this.#email = value;
    }

    describeRole() {
        return "I am a member of the school.";
    }
}

// Subclass: Principal
class Principal extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
        console.log("Principal added member: " + member.name);
    }

    removeMember(memberId) {
        this.members = this.members.filter(m => m.id !== memberId);
        console.log("Principal removed member with ID: " + memberId);
    }

    listMembers() {
        console.log("\n--- School Members List ---");
        this.members.forEach(m => console.log("- " + m.name + " (" + m.describeRole() + ")"));
    }

    describeRole() {
        return "Principal (Manages the school)";
    }
}

// Subclass: Teacher
class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {
        this.grades.push({ studentName, grade });
        console.log("Teacher " + this.name + " graded " + studentName + ": " + grade + " in " + this.subject);
    }

    listGrades() {
        console.log("\n--- Grades by " + this.name + " (" + this.subject + ") ---");
        this.grades.forEach(g => console.log("- " + g.studentName + ": " + g.grade));
    }

    describeRole() {
        return "Teacher of " + this.subject;
    }
}

// Subclass: Student
class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.enrolledSubjects = [];
    }

    enroll(subject) {
        this.enrolledSubjects.push(subject);
        console.log("Student " + this.name + " enrolled in " + subject);
    }

    listSubjects() {
        console.log("\n--- Enrolled Subjects for " + this.name + " ---");
        this.enrolledSubjects.forEach(s => console.log("- " + s));
    }

    describeRole() {
        return "Student";
    }
}

// Simulation
console.log("=== School Management System Simulation ===");

const principal = new Principal("Dr. Ahmed", "ahmed@school.edu", "P01");
const teacher1 = new Teacher("Ms. Esraa", "esraa@school.edu", "T01", "JavaScript");
const student1 = new Student("Ali", "ali@student.edu", "S01");
const student2 = new Student("Sara", "sara@student.edu", "S02");

principal.addMember(teacher1);
principal.addMember(student1);
principal.addMember(student2);

student1.enroll("JavaScript");
student1.enroll("HTML/CSS");

teacher1.gradeStudent("Ali", 95);

principal.listMembers();
teacher1.listGrades();
student1.listSubjects();
