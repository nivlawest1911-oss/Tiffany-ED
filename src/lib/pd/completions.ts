import prisma from "@/lib/prisma";

export type PDCompletionData = {
  userId: string;
  email: string;
  alsdeId?: string;
  teacherNumber?: string;
  schoolName?: string;
  moduleId: string;
  title: string;
  courseCode: string;
  clockHours: number;
  completedAt: Date;
  verificationCode: string;
  artifactUrl?: string;
  standards?: any;
};

export async function createCompletion(data: PDCompletionData) {
  return (prisma as any).pdCompletion.create({
    data,
  });
}

export async function getCompletionsByUser(userId: string) {
  return (prisma as any).pdCompletion.findMany({
    where: { userId },
    orderBy: { completedAt: 'desc' },
  });
}
