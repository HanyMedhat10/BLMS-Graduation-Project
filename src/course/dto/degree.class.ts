export class DegreeClass {
  title: string;
  degree: number;
  totalDegrees: number;
  student: number;

  constructor(
    title: string,
    degree: number,
    totalDegrees: number,
    student: number,
  ) {
    this.title = title;
    this.degree = degree;
    this.totalDegrees = totalDegrees;
    this.student = student;
  }
}
