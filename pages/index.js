import { useEffect, useState } from 'react';

export default function Home() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  useEffect(()=>{ fetchLinks(); },[]);

  async function fetchLinks(){
    const r = await fetch('/api/links');
    const data = await r.json();
    setLinks(data);
  }

  async function createLink(e){
    e.preventDefault();
    setLoading(true);
    const r = await fetch('/api/links', {
      method:'POST',
      headers:{ 'content-type':'application/json' },
      body: JSON.stringify({ url, code })
    });
    if (r.status===201) {
      setUrl(''); setCode('');
      await fetchLinks();
    } else {
      const err = await r.json();
      alert(err.error || 'Error');
    }
    setLoading(false);
  }

  async function del(c){
    if(!confirm('Delete this link?')) return;
    await fetch('/api/links/'+c, { method:'DELETE' });
    fetchLinks();
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">TinyLink - Dashboard</h1>
        <form onSubmit={createLink} className="mb-6 space-y-2">
          <div><input required value={url} onChange={e=>setUrl(e.target.value)} placeholder="Long URL" className="w-full p-2 border"/></div>
          <div><input required value={code} onChange={e=>setCode(e.target.value)} placeholder="Custom code (6-8 alnum)" className="w-full p-2 border"/></div>
          <div><button disabled={loading} className="px-4 py-2 bg-blue-600 text-white">{loading?'...' : 'Create'}</button></div>
        </form>

        <table className="w-full border-collapse">
          <thead><tr><th>Code</th><th>Target URL</th><th>Clicks</th><th>Last Clicked</th><th>Actions</th></tr></thead>
          <tbody>
            {links.map(l=>(
              <tr key={l.code}><td>{l.code}</td>
                <td style={{maxWidth:300,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{l.url}</td>
                <td>{l.clicks}</td>
                <td>{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '-'}</td>
                <td>
                  <a href={base+'/'+l.code} target="_blank" rel="noreferrer">Open</a> {' '}
                  <button onClick={()=>del(l.code)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}