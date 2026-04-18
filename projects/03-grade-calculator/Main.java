// ═══════════════════════════════════════════════════════
// Main.java — Student Grade Calculator
// Entry point: creates a menu loop for the user
// ═══════════════════════════════════════════════════════
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc      = new Scanner(System.in);
        GradeBook book  = new GradeBook();  // holds all students
        boolean running = true;

        System.out.println("╔══════════════════════════════════╗");
        System.out.println("║   Student Grade Calculator       ║");
        System.out.println("║   Ken Andrei A. Batac — BSCS     ║");
        System.out.println("╚══════════════════════════════════╝");

        while (running) {
            printMenu();
            System.out.print("Choose option: ");
            String choice = sc.nextLine().trim();

            switch (choice) {
                case "1":
                    addStudent(sc, book);
                    break;
                case "2":
                    addGrade(sc, book);
                    break;
                case "3":
                    viewStudent(sc, book);
                    break;
                case "4":
                    book.printAllStudents();
                    break;
                case "5":
                    running = false;
                    System.out.println("\nGoodbye!");
                    break;
                default:
                    System.out.println("  ✗ Invalid option. Try again.\n");
            }
        }

        sc.close();
    }

    // ── PRINT MENU ──
    private static void printMenu() {
        System.out.println("\n──────────────────────────────────");
        System.out.println("  1. Add Student");
        System.out.println("  2. Add Grade to Student");
        System.out.println("  3. View Student Report");
        System.out.println("  4. View All Students");
        System.out.println("  5. Exit");
        System.out.println("──────────────────────────────────");
    }

    // ── ADD STUDENT ──
    private static void addStudent(Scanner sc, GradeBook book) {
        System.out.print("Enter student name: ");
        String name = sc.nextLine().trim();

        if (name.isEmpty()) {
            System.out.println("  ✗ Name cannot be empty.");
            return;
        }

        System.out.print("Enter student ID: ");
        String id = sc.nextLine().trim();

        if (book.studentExists(id)) {
            System.out.println("  ✗ A student with ID '" + id + "' already exists.");
            return;
        }

        book.addStudent(new Student(id, name));
        System.out.println("  ✓ Student '" + name + "' added successfully.");
    }

    // ── ADD GRADE ──
    private static void addGrade(Scanner sc, GradeBook book) {
        System.out.print("Enter student ID: ");
        String id = sc.nextLine().trim();

        Student student = book.findStudent(id);
        if (student == null) {
            System.out.println("  ✗ Student not found.");
            return;
        }

        System.out.print("Enter subject name: ");
        String subject = sc.nextLine().trim();

        System.out.print("Enter grade (0 - 100): ");
        try {
            double grade = Double.parseDouble(sc.nextLine().trim());

            // Validate range
            if (grade < 0 || grade > 100) {
                System.out.println("  ✗ Grade must be between 0 and 100.");
                return;
            }

            student.addGrade(subject, grade);
            System.out.println("  ✓ Grade added: " + subject + " → " + grade);

        } catch (NumberFormatException e) {
            System.out.println("  ✗ Please enter a valid number.");
        }
    }

    // ── VIEW STUDENT ──
    private static void viewStudent(Scanner sc, GradeBook book) {
        System.out.print("Enter student ID: ");
        String id = sc.nextLine().trim();

        Student student = book.findStudent(id);
        if (student == null) {
            System.out.println("  ✗ Student not found.");
            return;
        }

        student.printReport();
    }
}
