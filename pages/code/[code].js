import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StatPage(){
  const r = useRouter();
  const { code } = r.query;
  const [link, setLink] = useState(null);

  useEffect(()=>{
    if(!code) return;
    fetch('/api/links/'+code).then(res=>res.json()).then(setLink);
  },[code]);

  if(!link) return <div>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <h1>Stats for {link.code}</h1>
      <p>URL: {link.url}</p>
      <p>Clicks: {link.clicks}</p>
      <p>Last clicked: {link.lastClicked ? new Date(link.lastClicked).toString() : '-'}</p>
    </div>
  );
}