import { useState,useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { PreviewCanvas } from '@/components/dashboard/PreviewCanvas';
import { Button } from '@/components/ui/button';
import { uploadImage } from '@/services/api';
import { toast } from 'sonner';
import { Loader2, Download } from 'lucide-react';

const BACKEND = 'http://localhost:5000';

const Dashboard = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const [numberOfStrings,setNumberOfStrings] = useState(2500);
  const [numberOfNails,setNumberOfNailes] = useState(300);

  const [connections, setConnections] = useState<[number, number][]>([]);
  const handleImageSelect = (file: File, preview: string) => {
    setImageFile(file);
    setUploadedPreview(preview);
    setResultImage(null);
  };
   const fetchConnections = async () => {
    try {
      const res = await fetch(`${BACKEND}/dwjson`, {
        credentials: 'include',
      });

      if (!res.ok) {
        toast.error('Could not fetch JSON');
        return;
      }

      const data: [number, number][] = await res.json();
      setConnections(data);
      console.log(data.length)
      setExist(true);

    } catch {
      toast.error('Server error fetching JSON');
    }
  };
  useEffect(() => {
    if (resultImage) fetchConnections();
  }, [resultImage]);
  const handleProcess = async () => {
    if (!imageFile) {
      toast.error('Upload image first');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload
      const up = await uploadImage(imageFile,numberOfStrings,numberOfNails);
      if (!up.success) {
        toast.error('Upload failed');
        return;
      }

      // 2️⃣ Process (REAL)
      const res = await fetch(`${BACKEND}/api/process`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setResultImage(`${BACKEND}${data.imageUrl}`);
      setExist(true);
      toast.success('String art generated');

    } catch {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-24 px-6 max-w-6xl mx-auto space-y-8">
        <ImageUpload
          onImageSelect={handleImageSelect}
          previewUrl={uploadedPreview}
          onClear={() => {
            setUploadedPreview(null);
            setResultImage(null);
            setImageFile(null);
          }}
          numberOfStrings={numberOfStrings}
          setNumberOfStrings={setNumberOfStrings}
          numberOfNailes={numberOfNails}
          setNumberOfNailes={setNumberOfNailes}
        />
        
        <PreviewCanvas
          exist = {exist}
          isProcessing={loading}
          connections={connections}
          totalPoints={numberOfNails}
        />
        
        <div className="space-y-3 max-w-sm">
          <Button onClick={handleProcess} disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
            Process Image
          </Button>

          {resultImage && (
            <>
              <Button variant="glass" onClick={() => window.open(`${BACKEND}/dwimage`)}>
                <Download className="mr-2" /> Download Image
              </Button>

              <Button variant="glass" onClick={() => window.open(`${BACKEND}/dwreport`)}>
                <Download className="mr-2" /> Download Report
              </Button>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
