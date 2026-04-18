═══════════════════════════════════════════════════
  Student Grade Calculator — Java Console App
  Ken Andrei A. Batac | BSCS | Saint Louis University
═══════════════════════════════════════════════════

FILES:
  Main.java       — Entry point, menu loop, user input
  Student.java    — Student class (OOP: fields, methods)
  GradeBook.java  — Manages list of students (ArrayList)

HOW TO COMPILE AND RUN:
  1. Make sure Java is installed (JDK 8 or higher)
  2. Open a terminal in this folder
  3. Compile all Java files:
       javac *.java
  4. Run the program:
       java Main

SAMPLE SESSION:
  ─────────────────────────────
  1. Choose option 1 → Add Student
     Name: Juan Dela Cruz
     ID:   2022-01234

  2. Choose option 2 → Add Grade
     ID: 2022-01234
     Subject: Data Structures → 88
     Subject: OOP             → 92
     Subject: Web Dev         → 95

  3. Choose option 3 → View Report
     ID: 2022-01234

  Output:
  ┌────────────────────────────────┐
  │  Student: Juan Dela Cruz       │
  │  ID:      2022-01234           │
  ├────────────────────────────────┤
  │  Data Structures     88.0      │
  │  OOP                 92.0      │
  │  Web Dev             95.0      │
  ├────────────────────────────────┤
  │  Average:  91.67               │
  │  Grade:    A  (Excellent)      │
  └────────────────────────────────┘

GRADING SCALE:
  90 – 100 → A (Excellent)
  80 –  89 → B (Good)
  70 –  79 → C (Average)
  60 –  69 → D (Passing)
   0 –  59 → F (Failed)
═══════════════════════════════════════════════════
