import wave from "../../src/assets/images/wave.png";



export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black  h-[250px]">
      <div
        className="absolute bottom-0 left-0 w-full h-[100px] bg-repeat-x bg-[length:1000px_100px] animate-wave1 z-[1000]"
        style={{
          backgroundImage: `url(${wave})`,
        }}
      ></div>

      <div
        className="absolute bottom-[15px] left-0 w-full h-[100px] bg-repeat-x bg-[length:1000px_100px] animate-wave2 opacity-50 z-[999]"
        style={{
          backgroundImage: `url(${wave})`,
        }}
      ></div>

      <div
        className="absolute bottom-[10px] left-0 w-full h-[100px] bg-repeat-x bg-[length:1000px_100px] animate-wave1 opacity-20 z-[998]"
        style={{
          backgroundImage: `url(${wave})`,
        }}
      ></div>

      <div
        className="absolute bottom-[20px] left-0 w-full h-[100px] bg-repeat-x bg-[length:1000px_100px] animate-wave2 opacity-70 z-[997]"
        style={{
          backgroundImage: `url(${wave})`,
        }}
      ></div>

      {/* Footer content */}
      <div className="relative z-[2000] flex h-full items-center justify-center text-white">
        <p>© 2026 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
}