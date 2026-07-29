import { useEffect, useRef, useState } from 'react';


const BG_IMAGE_1 = "/first.png";
const BG_IMAGE_2 = "/reveal.png";

const SPOTLIGHT_R = 260;

function RevealLayer({ image, cursorX, cursorY }: { image: string, cursorX: number, cursorY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskDataUrl, setMaskDataUrl] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (cursorX !== -999 && cursorY !== -999) {
      const gradient = ctx.createRadialGradient(
        cursorX, cursorY, 0,
        cursorX, cursorY, SPOTLIGHT_R
      );
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
      gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fill();
    }
    
    setMaskDataUrl(canvas.toDataURL());
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url('${image}')`,
          maskImage: maskDataUrl ? `url(${maskDataUrl})` : 'none',
          WebkitMaskImage: maskDataUrl ? `url(${maskDataUrl})` : 'none',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      />
    </>
  );
}

function App() {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateCursor = () => {
      if (mouse.current.x !== -999) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 pointer-events-none">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
            {/* Concept 05: The Zen Coupe */}
            <path d="M 7.2 20.4 C 8.4 20.4 11.28 19.68 11.28 16.8 L 11.28 13.44 C 7.2 13.44 2.88 11.52 2.88 7.2 C 2.88 6.48 3.36 6 4.32 6 L 19.68 6 C 20.64 6 21.12 6.48 21.12 7.2 C 21.12 11.52 16.8 13.44 12.72 13.44 L 12.72 16.8 C 12.72 19.68 15.6 20.4 16.8 20.4" />
            <circle cx="12" cy="9.6" r="0.8" fill="#ffffff" stroke="none" />
          </svg>
          <span className="text-white text-2xl font-playfair italic tracking-wider">Dionysus</span>
        </div>
      </nav>

      <section className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url('${BG_IMAGE_1}')` }}
        />

        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        <div className="absolute top-[14%] left-5 sm:left-10 md:left-14 flex flex-col items-start px-5 sm:px-0 pointer-events-none z-50 text-white leading-[0.95]">
          <h1 className="flex flex-col items-start">
            <span 
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal" 
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Unveil your
            </span>
            <span 
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal" 
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              true spirit
            </span>
          </h1>
          
          <div className="mt-6 sm:mt-10 max-w-[280px] sm:max-w-[340px] hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Embark on a magical journey of self-discovery to reveal a cocktail meticulously crafted for your unique personality.
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade pointer-events-auto" style={{ animationDelay: '0.85s' }}>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Answer a few questions and let our AI craft a personalized, beautifully animated recipe that perfectly matches your essence.
          </p>
          <button className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 cursor-pointer">
            Begin Your Journey
          </button>
        </div>
      </section>

    </div>
  );
}

export default App;
