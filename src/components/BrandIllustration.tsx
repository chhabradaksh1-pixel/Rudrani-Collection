export function BrandIllustration() {
  return (
    <section className="bg-ivory py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="relative flex flex-col items-center">
          {/* Hand-drawn illustration */}
          <svg
            viewBox="0 0 800 340"
            className="w-full max-w-3xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Ground / horizon line — sketchy strokes */}
            <g stroke="#2C1810" strokeWidth="1.5" opacity="0.5">
              <path d="M0 220 Q50 218 120 220 Q200 222 280 219 Q360 217 440 220 Q520 223 600 219 Q680 217 760 220 L800 219" />
              <path d="M0 222 Q80 224 160 221 Q240 218 320 222 Q400 225 480 221 Q560 218 640 222 Q720 225 800 221" />
              {/* Scattered ground texture */}
              <path d="M60 225 Q70 228 85 226" />
              <path d="M140 227 Q155 230 170 226" />
              <path d="M250 224 Q265 228 280 225" />
              <path d="M350 228 Q360 231 375 227" />
              <path d="M450 225 Q470 229 490 226" />
              <path d="M550 227 Q565 230 580 226" />
              <path d="M650 224 Q670 228 690 225" />
              <path d="M100 230 Q115 233 130 229" />
              <path d="M300 231 Q320 234 340 230" />
              <path d="M500 230 Q520 233 540 229" />
              <path d="M700 229 Q715 232 730 228" />
            </g>

            {/* Woman figure — seated, working with fabric */}
            <g stroke="#2C1810" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Hair */}
              <path d="M420 68 Q410 55 405 48 Q400 40 408 32 Q418 24 430 28 Q442 24 452 32 Q460 40 455 48 Q450 55 440 68" fill="#2C1810" opacity="0.85" />
              <path d="M410 50 Q405 60 408 72 Q410 78 415 82" stroke="#2C1810" strokeWidth="1.4" />
              <path d="M450 50 Q455 60 452 72 Q450 78 445 82" stroke="#2C1810" strokeWidth="1.4" />
              {/* Hair bun detail */}
              <path d="M425 26 Q430 18 440 20 Q448 22 446 30" stroke="#2C1810" strokeWidth="1.2" fill="#2C1810" opacity="0.7" />

              {/* Face */}
              <ellipse cx="430" cy="65" rx="16" ry="20" fill="#FAF7F2" stroke="#2C1810" strokeWidth="1.5" />
              {/* Eyes — looking down */}
              <path d="M423 62 Q425 64 427 62" strokeWidth="1.2" />
              <path d="M433 62 Q435 64 437 62" strokeWidth="1.2" />
              {/* Nose */}
              <path d="M430 66 Q429 69 430 70" strokeWidth="1" />
              {/* Slight smile */}
              <path d="M426 73 Q430 76 434 73" strokeWidth="1" />

              {/* Neck */}
              <path d="M425 84 L425 94" strokeWidth="1.4" />
              <path d="M435 84 L435 94" strokeWidth="1.4" />
              {/* Necklace */}
              <path d="M422 90 Q430 96 438 90" strokeWidth="1" />
              <circle cx="430" cy="95" r="1.5" fill="#2C1810" />

              {/* Shoulders & upper body — leaning forward */}
              <path d="M425 94 Q405 100 385 108" strokeWidth="1.6" />
              <path d="M435 94 Q455 100 470 108" strokeWidth="1.6" />

              {/* Torso — kurti/blouse */}
              <path d="M385 108 Q390 130 395 155 Q400 170 405 180" strokeWidth="1.4" />
              <path d="M470 108 Q465 130 460 155 Q455 170 450 180" strokeWidth="1.4" />
              {/* Kurti neckline */}
              <path d="M410 98 Q420 106 425 110 Q430 113 435 110 Q440 106 450 98" strokeWidth="1.2" />
              {/* Kurti fold lines */}
              <path d="M400 125 Q410 128 420 125" strokeWidth="0.8" opacity="0.6" />
              <path d="M435 126 Q445 129 455 126" strokeWidth="0.8" opacity="0.6" />
              <path d="M398 145 Q408 148 418 145" strokeWidth="0.8" opacity="0.6" />

              {/* Left arm — reaching forward, working with fabric */}
              <path d="M385 108 Q370 120 355 138 Q345 150 340 160" strokeWidth="1.5" />
              {/* Left hand */}
              <path d="M340 160 Q338 165 335 168 Q337 170 340 168 Q342 172 345 168" strokeWidth="1.2" />

              {/* Right arm — holding fabric */}
              <path d="M470 108 Q480 125 485 140 Q488 150 485 158" strokeWidth="1.5" />
              {/* Right hand */}
              <path d="M485 158 Q488 163 490 165 Q487 167 485 165 Q483 168 480 165" strokeWidth="1.2" />

              {/* Fabric piece being worked on */}
              <g opacity="0.4" strokeWidth="1">
                <path d="M335 168 Q360 175 385 172 Q410 170 435 173 Q460 176 485 165" />
                <path d="M340 172 Q365 180 390 178 Q415 176 440 179 Q465 182 488 170" />
                <path d="M345 178 Q370 185 400 183 Q430 181 460 185 Q480 183 490 175" />
                {/* Fabric drape lines */}
                <path d="M360 175 L358 185" />
                <path d="M400 173 L398 184" />
                <path d="M440 176 L438 186" />
                <path d="M470 172 L468 183" />
              </g>

              {/* Seated legs — cross-legged */}
              <path d="M405 180 Q390 190 375 200 Q365 208 360 215 Q370 218 385 216" strokeWidth="1.5" />
              <path d="M450 180 Q465 190 480 200 Q490 208 495 215 Q485 218 470 216" strokeWidth="1.5" />
              {/* Crossed legs connection */}
              <path d="M385 216 Q410 210 430 212 Q450 214 470 216" strokeWidth="1.3" />

              {/* Dupatta / shawl draped over shoulder */}
              <path d="M455 100 Q475 110 490 130 Q500 145 505 165 Q508 180 505 200 Q502 210 498 218" strokeWidth="1.2" opacity="0.5" />
              <path d="M500 140 Q505 145 508 155" strokeWidth="0.8" opacity="0.4" />
              <path d="M502 170 Q507 175 510 185" strokeWidth="0.8" opacity="0.4" />

              {/* Small details — bangles */}
              <ellipse cx="342" cy="158" rx="4" ry="2.5" strokeWidth="0.8" />
              <ellipse cx="342" cy="155" rx="4" ry="2.5" strokeWidth="0.8" />
              <ellipse cx="484" cy="155" rx="4" ry="2.5" strokeWidth="0.8" />
              <ellipse cx="484" cy="152" rx="4" ry="2.5" strokeWidth="0.8" />
            </g>

            {/* Decorative elements — small rangoli-style dots around */}
            <g fill="#2C1810" opacity="0.2">
              <circle cx="300" cy="200" r="2" />
              <circle cx="310" cy="195" r="1.5" />
              <circle cx="295" cy="208" r="1" />
              <circle cx="560" cy="198" r="2" />
              <circle cx="550" cy="205" r="1.5" />
              <circle cx="565" cy="210" r="1" />
            </g>
          </svg>

          {/* Tagline */}
          <p className="mt-4 font-body text-lg md:text-2xl tracking-wider text-espresso/60 italic">
            * you know where to find it *
          </p>

          {/* Large wordmark */}
          <h2 className="font-wordmark text-[2.8rem] md:text-8xl lg:text-9xl font-black tracking-[0.08em] text-espresso uppercase mt-1">
            RUDRANI
          </h2>

          {/* Copyright line */}
          <p className="mt-3 text-xs text-warm-gray">
            Copyright &copy; Rudrani 2026
          </p>
        </div>
      </div>
    </section>
  );
}
