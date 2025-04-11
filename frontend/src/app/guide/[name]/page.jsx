// app/guides/[name]/page.jsx
"use client"
import { use } from 'react';
import GuideProfile from '@/app/components/GuideProfile';

export default function GuidePage(promiseParams) {
  const { name } = use(promiseParams.params);

  return <GuideProfile name={name} />;
}
