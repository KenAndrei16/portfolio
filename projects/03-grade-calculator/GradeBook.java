// ═══════════════════════════════════════════════════════
// GradeBook.java — Manages a collection of Students
// Acts as a simple in-memory "database" of students
// Demonstrates: ArrayList, iteration, search logic
// ═══════════════════════════════════════════════════════
import java.util.ArrayList;

public class GradeBook {

    // ── LIST OF ALL STUDENTS ──
    private ArrayList<Student> students;

    // ── CONSTRUCTOR ──
    public GradeBook() {
        this.students = new ArrayList<>();
    }

    // ── ADD STUDENT ──
    public void addStudent(Student student) {
        students.add(student);
    }

    // ── FIND STUDENT BY ID ──
    // Returns the Student object, or null if not found
    public Student findStudent(String id) {
        for (Student s : students) {
            if (s.getId().equalsIgnoreCase(id)) {
                return s;
            }
        }
        return null; // not found
    }

    // ── CHECK IF STUDENT EXISTS ──
    public boolean studentExists(String id) {
        return findStudent(id) != null;
    }

    // ── PRINT ALL STUDENTS ──
    public void printAllStudents() {
        if (students.isEmpty()) {
            System.out.println("\n  No students added yet.");
            return;
        }

        System.out.println("\n  All Students (" + students.size() + " total):");
        System.out.println("  ─────────────────────────────────────────────");

        for (Student s : students) {
            System.out.println(s); // calls Student.toString()
        }

        // Show class average if there are students with grades
        double classTotal = 0;
        int counted = 0;
        for (Student s : students) {
            if (s.getAverage() > 0) {
                classTotal += s.getAverage();
                counted++;
            }
        }

        if (counted > 0) {
            System.out.println("  ─────────────────────────────────────────────");
            System.out.printf ("  Class Average: %.2f%n", classTotal / counted);
        }
    }
}
