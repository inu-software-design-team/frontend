'use client';

import { useEffect, useState } from 'react';

import StudentInfo from '../components/studentinfo';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setStudentId(resolvedParams.id);
    }
    fetchParams();
  }, [params]);

  if (!studentId) {
    return null;
  }

  return <StudentInfo id={studentId} />;
}
