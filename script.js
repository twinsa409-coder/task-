// ============================================
// 1. هيكلة بيانات الطالب (Class & Constructor)
// ============================================
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;                   // رقم الجلوس
    this.name = name;               // الاسم
    this.grades = grades;           // مصفوفة درجات 3 مواد
    this.attendance = attendance;   // نسبة الحضور
  }

  // ============================================
  // 2. دوال التحليل الأكاديمي (Methods)
  // ============================================

  // دالة حساب المتوسط باستخدام reduce
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // دالة التقدير (تستقبل المتوسط)
  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  // دالة النتيجة النهائية (شرطان باستخدام &&)
  getFinalResult() {
    const average = this.calculateAverage();
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// ============================================
// 3. نظام تشغيل الجامعة (Objects Array)
// ============================================
const studentsList = [
  new Student(101, "أحمد محمود", [95, 88, 92], 90),   // متوسط 91.67 → A
  new Student(102, "سارة علي",   [72, 65, 78], 85),   // متوسط 71.67 → C
  new Student(103, "محمد حسن",   [45, 40, 48], 80),   // متوسط 44.33 → متعثر
  new Student(104, "منى خالد",   [42, 47, 44], 70)    // متوسط 44.33 → متعثرة
];

// ============================================
// 5-أ. تقرير لكل طالب في المصفوفة الرئيسية
// ============================================
console.log("========== تقرير الطلاب ==========");
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  const gradeLetter = student.getGrade(average);
  const result = student.getFinalResult();

  console.log(
    `الاسم: ${student.name} | المتوسط: ${average.toFixed(2)} | التقدير: ${gradeLetter} | النتيجة: ${result}`
  );
});

// ============================================
// 4. لجنة الرأفة (Array Methods)
// ============================================

// الاستخراج: filter لاستخراج الطلاب بمتوسط من 40 إلى 49
const strugglingStudents = studentsList.filter((student) => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg <= 49;
});

// المعالجة: map لإضافة 5 درجات رأفة لمتوسط كل طالب متعثر
const mercyResults = strugglingStudents.map((student) => {
  const oldAverage = student.calculateAverage();
  return {
    id: student.id,
    name: student.name,
    oldAverage: oldAverage,
    newAverage: oldAverage + 5
  };
});

// التحليل: reduce لجمع المتوسطات الجديدة
const totalNewAverages = mercyResults.reduce(
  (sum, item) => sum + item.newAverage,
  0
);

// متوسط الرأفة مع "درع الحماية" ضد القسمة على صفر
let mercyAverage;
if (mercyResults.length === 0) {
  mercyAverage = 0; // درع الحماية: لا يوجد متعثرون
} else {
  mercyAverage = totalNewAverages / mercyResults.length;
}

// ============================================
// 5-ب و 5-ج. مخرجات لجنة الرأفة
// ============================================
console.log("\n========== الطلاب المتعثرون (شملتهم الرأفة) ==========");
console.log(mercyResults);

console.log("\n========== متوسط الطلاب المتعثرين بعد الرأفة ==========");
console.log(`المتوسط العام بعد التعديل: ${mercyAverage.toFixed(2)}`);