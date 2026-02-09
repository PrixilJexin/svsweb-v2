import { supabase } from '@/lib/supabase';

// Force Next.js to fetch fresh data every time
export const revalidate = 0;

export default async function Gallery({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap the params promise
  const { id } = await params;

  // 2. Fetch both the images and the custom title from Supabase
  const [imagesResponse, settingsResponse] = await Promise.all([
    supabase
      .from('images')
      .select('*')
      .eq('gallery_id', parseInt(id))
      .order('id', { ascending: false }),
    supabase
      .from('settings')
      .select('*')
      .eq('id', `gallery_${id}_title`)
      .single()
  ]);

  const images = imagesResponse.data;
  const titleData = settingsResponse.data;
  const error = imagesResponse.error;

  // 3. Fallback title if nothing is found in Supabase
  const displayTitle = titleData?.content || `Gallery ${id}`;

  if (error) return <div className="p-10 text-white">Error loading images.</div>;

  return (
    <main className="p-10 min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Dynamic Title Display */}
        <h1 className="text-4xl md:text-5xl font-black mb-10 border-b border-gray-800 pb-6 tracking-tighter uppercase text-blue-500">
          {displayTitle}
        </h1>

        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map((img) => (
              <div key={img.id} className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl group">
                <img 
                  src={img.url} 
                  alt={displayTitle} 
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-gray-800 rounded-3xl">
            <p className="text-2xl font-bold text-gray-600 uppercase tracking-widest">Gallery Empty</p>
            <p className="mt-2 text-sm text-gray-700">Add photos via the Admin Control Panel.</p>
          </div>
        )}
      </div>
    </main>
  );
}