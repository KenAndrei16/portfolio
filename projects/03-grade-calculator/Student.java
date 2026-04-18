// ═══════════════════════════════════════════════════════
// Student.java — Represents a single student
// Stores their ID, name, and a map of subject → grade
// Uses OOP: encapsulation, methods, LinkedHashMap
// ═══════════════════════════════════════════════════════
import java.util.LinkedHashMap;
import java.util.Map;

public class Student {

    // ── FIELDS (private — accessed via getters/setters) ──
    private String id;
    private String name;

    // LinkedHashMap preserves insertion order of subjects
    private LinkedHashMap<String, Double> grades;

    // ── CONSTRUCTOR ──
    public Student(String id, String name) {
        this.id     = id;
        this.name   = name;
        this.grades = new LinkedHashMap<>();
    }

    // ── GETTERS ──
    public String getId()   { return id; }
    public String getName() { return name; }

    // ── ADD GRADE ──
    public void addGrade(String subject, double grade) {
        grades.put(subject, grade);
    }

    // ── COMPUTE AVERAGE ──
    // Returns 0.0 if no grades have been added yet
    public double getAverage() {
        if (grades.isEmpty()) return 0.0;

        double total = 0;
        for (double g : grades.values()) {
            total += g;
        }
        return total / grades.size();
    }

    // ── GET LETTER GRADE ──
    // Converts numeric average to standard letter grade
    public String getLetterGrade() {
        double avg = getAverage();
        if (avg >= 90) return "A";
        if (avg >= 80) return "B";
        if (avg >= 70) return "C";
        if (avg >= 60) return "D";
        return "F";
    }

    // ── GET REMARKS ──
    public String getRemarks() {
        double avg = getAverage();
        if (avg >= 90) return "Excellent";
        if (avg >= 80) return "Good";
        if (avg >= 70) return "Average";
        if (avg >= 60) return "Passing";
        return "Failed";
    }

    // ── PRINT REPORT ──
    // Prints a formatted grade report to the console
    public void printReport() {
        System.out.println("\n┌─────────────────────────────────┐");
        System.out.printf ("│  Student: %-22s │%n", name);
        System.out.printf ("│  ID:      %-22s │%n", id);
        System.out.println("├─────────────────────────────────┤");

        if (grades.isEmpty()) {
            System.out.println("│  No grades recorded yet.        │");
        } else {
            System.out.printf("│  %-20s  %6s  │%n", "Subject", "Grade");
            System.out.println("│  ──────────────────  ──────  │");

            for (Map.Entry<String, Double> entry : grades.entrySet()) {
                System.out.printf("│  %-20s  %5.1f   │%n",
                    entry.getKey(), entry.getValue());
            }

            System.out.println("├─────────────────────────────────┤");
            System.out.printf ("│  Average:  %-8.2f               │%n", getAverage());
            System.out.printf ("│  Grade:    %-2s  (%s)             │%n",
                getLetterGrade(), getRemarks());
        }

        System.out.println("└─────────────────────────────────┘");
    }

    // ── TO STRING ──
    // Used when printing all students (one-liner summary)
    @Override
    public String toString() {
        return String.format("  [%s] %-20s | Avg: %5.1f | %s (%s)",
            id, name, getAverage(), getLetterGrade(), getRemarks());
    }
}
